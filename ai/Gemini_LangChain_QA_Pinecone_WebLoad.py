#!/usr/bin/env python
import os
import getpass

os.environ["GOOGLE_API_KEY"] = getpass.getpass("Gemini API Key:")


os.environ["PINECONE_API_KEY"] = getpass.getpass("Pinecone API Key:")

from langchain import hub
from langchain import PromptTemplate
from langchain.docstore.document import Document
from langchain.document_loaders import WebBaseLoader
from langchain.schema import StrOutputParser
from langchain.schema.prompt_template import format_document
from langchain.schema.runnable import RunnablePassthrough
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_pinecone import Pinecone
from langchain_community.document_loaders import PyPDFLoader


from pinecone import Pinecone as pc
from pinecone import PodSpec


loader = PyPDFLoader(
    "./Computer Security Principles and Practice, 4th.pdf",
)
docs = loader.load()


print(docs[10])

from langchain_google_genai import GoogleGenerativeAIEmbeddings

gemini_embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")

pine_client = pc(api_key=os.getenv("PINECONE_API_KEY"))  # API key from app.pinecone.io
index_name = "langchain-demo"

print("Test")
print(pine_client.list_indexes().names())

if index_name not in pine_client.list_indexes().names():
    # Create a new index.
    print("Creating index")
    pine_client.create_index(
        name=index_name,
        metric="cosine",  # Using cosine similarity as the distance metric
        dimension=768,  # Dimensionality for Gemini embedding model
        spec=PodSpec(
            environment="gcp-starter",  # Environment: gcp-starter (free tier)
            pod_type="starter",  # Pod type: starter (starter pod for free tier)
            pods=1,  # Number of pods: 1
        ),
    )
    print(pine_client.describe_index(index_name))

print("outside loop")

vectorstore = Pinecone.from_documents(
    docs,
    gemini_embeddings,  # Embedding model to generate embeddings from docs
    index_name=index_name,  # The index you've already created in Pinecone
)


retriever = vectorstore.as_retriever()
print(len(retriever.get_relevant_documents("MMLU")))

from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-8b", temperature=0.7, top_p=0.85)

# Prompt template to query Gemini
system_prompt = """You are an assistant for question-answering tasks.
Use the following context to answer the question.
If you don't know the answer, just say that you don't know.
Use five sentences maximum and keep the answer concise.

Question: {question}
Context: {context}
Answer:"""

from langchain.prompts import ChatPromptTemplate
from langchain.chains import create_stuff_documents_chain
from langchain.chains import load_qa_chain

system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise."
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)


from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.prompts import ChatPromptTemplate

contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
)

contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)
history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_q_prompt
)


# In[ ]:


from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)


question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)


from typing import Sequence

from langchain_core.messages import BaseMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, StateGraph
from langgraph.graph.message import add_messages
from typing_extensions import Annotated, TypedDict
from langchain_core.messages import AIMessage, HumanMessage


class State(TypedDict):
    input: str
    chat_history: Annotated[Sequence[BaseMessage], add_messages]
    context: str
    answer: str


def call_model(state: State):
    response = rag_chain.invoke(state)
    return {
        "chat_history": [
            HumanMessage(state["input"]),
            AIMessage(response["answer"]),
        ],
        "context": response["context"],
        "answer": response["answer"],
    }


workflow = StateGraph(state_schema=State)
workflow.add_edge(START, "model")
workflow.add_node("model", call_model)

memory = MemorySaver()
app = workflow.compile(checkpointer=memory)


config = {"configurable": {"thread_id": "abc123"}}


while True:
    user_input = input("Enter your question or type 'qa' to exit: ")

    if user_input.lower() == "qa":
        print("Exiting the program.")
        break
    else:
        # Invoke the rag_chain with the user's question
        result = app.invoke(
            {"input": user_input},
            config=config,
        )
        # Print the answer, replacing newline characters
        print(result["answer"])


chat_history = app.get_state(config).values["chat_history"]
for message in chat_history:
    message.pretty_print()


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | llm_prompt
    | llm
    | StrOutputParser()
)

rag_chain.invoke("explain Fail-safe in details").replace("\n", "")

while True:
    user_input = input("Enter your question or write qa to exit: ")
    if user_input == "qa":
        break
    else:
        print(rag_chain.invoke(user_input).replace("\n", ""))

rag_chain.invoke("""explain the figure in details""").replace("\n", "")


print(
    "Fail-safe default is a security principle where systems default to denying access unless explicit permission is granted. This means that in case of errors or malfunctions, the system will likely err on the side of caution by restricting access, rather than mistakenly granting it. This approach minimizes security breaches as unauthorized access is less likely to occur. Conversely, a system that defaults to allowing access could inadvertently expose sensitive data if its access control mechanisms fail. File systems typically employ fail-safe defaults, as do most client-server protected services. "
)
