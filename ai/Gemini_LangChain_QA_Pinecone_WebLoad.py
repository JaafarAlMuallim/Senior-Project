#!/usr/bin/env python
# coding: utf-8

# ##### Copyright 2024 Google LLC.

# In[ ]:


#@title Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


# # Question Answering using Gemini, LangChain, and Pinecone

# <table class="tfo-notebook-buttons" align="left">
#   <td>
#     <a target="_blank" href="https://colab.research.google.com/github/google/generative-ai-docs/blob/main/examples/gemini/python/langchain/Gemini_LangChain_QA_Pinecone_WebLoad.ipynb"><img src="https://www.tensorflow.org/images/colab_logo_32px.png" />Run in Google Colab</a>
#   </td>
#   <td>
#     <a target="_blank" href="https://github.com/google/generative-ai-docs/blob/main/examples/gemini/python/langchain/Gemini_LangChain_QA_Pinecone_WebLoad.ipynb"><img src="https://www.tensorflow.org/images/GitHub-Mark-32px.png" />View source on GitHub</a>
#   </td>
# </table>
# 

# ## Overview
# 
# [Gemini](https://ai.google.dev/models/gemini) is a family of generative AI models that lets developers generate content and solve problems. These models are designed and trained to handle both text and images as input.
# 
# [LangChain](https://www.langchain.com/) is a data framework designed to make integration of Large Language Models (LLM) like Gemini easier for applications.
# 
# [Pinecone](https://www.pinecone.io/) is a cloud-first vector database that allows users to search across billions of embeddings with ultra-low query latency.
# 
# In this notebook, you'll learn how to create an application that answers questions using data from a website with the help of Gemini, LangChain, and Pinecone.

# ## Setup
# 
# First, you must install the packages and set the necessary environment variables.
# 
# ### Installation
# 
# Install `LangChain`'s python library.

# In[ ]:


get_ipython().system('pip install --quiet langchain')


# Install LangChain's integration package for Gemini, `langchain-google-genai`.

# In[ ]:


get_ipython().system('pip install --quiet langchain-google-genai')


# Install LangChain's integration package for the new version of Pinecone, `langchain-pinecone`.

# In[ ]:


get_ipython().system('pip install --quiet langchain-pinecone')


# Install Pinecone's python client SDK, `pinecone-client`

# In[ ]:


get_ipython().system('pip install --quiet pinecone-client')


# ### Grab a Gemini API Key
# 
# To use Gemini you need an *API key*. You can create an API key with one click in [Google AI Studio](https://makersuite.google.com/).
# After creating the API key, you can either set an environment variable named `GOOGLE_API_KEY` to your API Key or pass the API key as an argument when using the `ChatGoogleGenerativeAI` class to access Google's `gemini-1.5-flash` or `gemini-1.5-pro` models or the `GoogleGenerativeAIEmbeddings` class to access Google's Generative AI embedding model using `LangChain`.
# 
# In this tutorial, you will set the environment variable `GOOGLE_API_KEY` to configure Gemini to use your API key.

# In[ ]:


# Run this cell and paste the API key in the prompt
import os
import getpass

os.environ['GOOGLE_API_KEY'] = getpass.getpass('Gemini API Key:')


# ### Setup Pinecone
# 
# To use Pinecone in your application, you must have an API key. To create an API key you have to set up a Pinecone account. Visit [Pinecone's app page](https://app.pinecone.io/), and Sign up/Log in to your account. Then navigate to the "API Keys" section and copy your API key.
# 
# For more detailed instructions on getting the API key, you can read Pinecone's [Quickstart documentation](https://docs.pinecone.io/docs/quickstart#2-get-your-api-key).
# 
# Set the environment variable `PINECONE_API_KEY` to configure Pinecone to use your API key.
# 

# In[ ]:


os.environ['PINECONE_API_KEY'] = getpass.getpass('Pinecone API Key:')


# ## Basic steps
# LLMs are trained offline on a large corpus of public data. Hence they cannot answer questions based on custom or private data accurately without additional context.
# 
# If you want to make use of LLMs to answer questions based on private data, you have to provide the relevant documents as context alongside your prompt. This approach is called Retrieval Augmented Generation (RAG).
# 
# You will use this approach to create a question-answering assistant using the Gemini text model integrated through LangChain. The assistant is expected to answer questions about Gemini model. To make this possible you will add more context to the assistant using data from a website.
# 
# In this tutorial, you'll implement the two main components in an RAG-based architecture:
# 
# 1. Retriever
# 
#     Based on the user's query, the retriever retrieves relevant snippets that add context from the document. In this tutorial, the document is the website data.
#     The relevant snippets are passed as context to the next stage - "Generator".
# 
# 2. Generator
# 
#     The relevant snippets from the website data are passed to the LLM along with the user's query to generate accurate answers.
# 
# You'll learn more about these stages in the upcoming sections while implementing the application.

# In[ ]:


get_ipython().system('pip install -U langchain-community')


# In[ ]:


get_ipython().system('pip install -qU langchain_community pypdf')


# ## Import the required libraries

# In[ ]:


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


# ## Retriever
# 
# In this stage, you will perform the following steps:
# 
# 1. Read and parse the website data using LangChain.
# 
# 2. Create embeddings of the website data.
# 
#     Embeddings are numerical representations (vectors) of text. Hence, text with similar meaning will have similar embedding vectors. You'll make use of Gemini's embedding model to create the embedding vectors of the website data.
# 
# 3. Store the embeddings in Pinecone's vector store.
#     
#     Pinecone is a vector database. The Pinecone vector store helps in the efficient retrieval of similar vectors. Thus, for adding context to the prompt for the LLM, relevant embeddings of the text matching the user's question can be retrieved easily using Pinecone.
# 
# 4. Create a Retriever from the Pinecone vector store.
# 
#     The retriever will be used to pass relevant website embeddings to the LLM along with user queries.

# ### Read and parse the website data
# 
# LangChain provides a wide variety of document loaders. To read the website data as a document, you will use the `WebBaseLoader` from LangChain.
# 
# To know more about how to read and parse input data from different sources using the document loaders of LangChain, read LangChain's [document loaders guide](https://python.langchain.com/docs/integrations/document_loaders).

# In[ ]:


loader = PyPDFLoader(
    "./Computer Security Principles and Practice, 4th.pdf",
)
docs = loader.load()


# In[ ]:


print(docs[10])


# If you only want to select a specific portion of the website data to add context to the prompt, you can use regex, text slicing, or text splitting.
# 
# In this example, you'll use Python's `split()` function to extract the required portion of the text. The extracted text should be converted back to LangChain's `Document` format.

# In[ ]:


# # Extract the text from the website data document
# text_content = docs[0].page_content
# # The text content between the substrings "code, audio, image and video." to
# # "Cloud TPU v5p" is relevant for this tutorial. You can use Python's `split()`
# # to select the required content.
# text_content_1 = text_content.split("code, audio, image and video.",1)[1]
# final_text = text_content_1.split("Cloud TPU v5p",1)[0]

# # Convert the text to LangChain's `Document` format
# docs =  [Document(page_content=final_text, metadata={"source": "local"})]


# ### Initialize Gemini's embedding model
# 
# To create the embeddings from the website data, you'll use Gemini's embedding model, **embedding-001** which supports creating text embeddings.
# 
# To use this embedding model, you have to import `GoogleGenerativeAIEmbeddings` from LangChain. To know more about the embedding model, read Google AI's [language documentation](https://ai.google.dev/models/gemini).

# In[ ]:


from langchain_google_genai import GoogleGenerativeAIEmbeddings

# If there is no environment variable set for the API key, you can pass the API
# key to the parameter `google_api_key` of the `GoogleGenerativeAIEmbeddings`
# function: `google_api_key = "key"`.

gemini_embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")


# ### Store the data using Pinecone
# 
# 
# To create a Pinecone vector database, first, you have to initialize your Pinecone client connection using the API key you set previously.
# 
# In Pinecone, vector embeddings have to be stored in indexes. An index represents the vector data's top-level organizational unit. The vectors in any index must have the same dimensionality and distance metric for calculating similarity. You can read more about indexes in [Pinecone's Indexes documentation](https://docs.pinecone.io/docs/indexes).
# 
# First, you'll create an index using Pinecone's `create_index` function. Pinecone allows you to create two types of indexes, Serverless indexes and Pod-based indexes. Pinecone's free starter plan lets you create only one project and one pod-based starter index with sufficient resources to support 100,000 vectors. For this tutorial, you have to create a pod-based starter index. To know more about different indexes and how they can be created, read Pinecone's [create indexes guide](https://docs.pinecone.io/docs/new-api#creating-indexes).
# 
# 
# Next, you'll insert the documents you extracted earlier from the website data into the newly created index using LangChain's `Pinecone.from_documents`. Under the hood, this function creates embeddings from the documents created by the document loader of LangChain using any specified embedding model and inserts them into the specified index in a Pinecone vector database.  
# 
# You have to specify the `docs` you created from the website data using LangChain's `WebBasedLoader` and the `gemini_embeddings` as the embedding model when invoking the `from_documents` function to create the vector database from the website data.

# In[ ]:





# In[ ]:


# Initialize Pinecone client
pine_client = pc(api_key=os.getenv("PINECONE_API_KEY"))  # API key from app.pinecone.io
index_name = "langchain-demo"

print("Test")
print(pine_client.list_indexes().names())

# First, check if the index already exists. If it doesn't, create a new one.
if index_name not in pine_client.list_indexes().names():
    # Create a new index.
    print("Creating index")
    pine_client.create_index(
        name=index_name,
        metric="cosine",  # Using cosine similarity as the distance metric
        dimension=768,    # Dimensionality for Gemini embedding model
        spec=PodSpec(
            environment="gcp-starter",  # Environment: gcp-starter (free tier)
            pod_type="starter",          # Pod type: starter (starter pod for free tier)
            pods=1                       # Number of pods: 1
        )
    )
    print(pine_client.describe_index(index_name))

print("outside loop")

# Assuming 'docs' is defined and holds your documents
vectorstore = Pinecone.from_documents(
    docs,
    gemini_embeddings,  # Embedding model to generate embeddings from docs
    index_name=index_name  # The index you've already created in Pinecone
)


# ### Create a retriever using Pinecone
# 
# You'll now create a retriever that can retrieve website data embeddings from the newly created Pinecone vector store. This retriever can be later used to pass embeddings that provide more context to the LLM for answering user's queries.
# 
# Invoke the `as_retriever` function of the vector store you initialized in the last step, to create a retriever.

# In[ ]:


retriever = vectorstore.as_retriever()
# Check if the retriever is working by trying to fetch the relevant docs related
# to the word 'MMLU'(Massive Multitask Language Understanding). If the length is
# greater than zero, it means that the retriever is functioning well.
print(len(retriever.get_relevant_documents("MMLU")))


# In[ ]:





# ## Generator
# 
# The Generator prompts the LLM for an answer when the user asks a question. The retriever you created in the previous stage from the Pinecone vector store will be used to pass relevant embeddings from the website data to the LLM to provide more context to the user's query.
# 
# You'll perform the following steps in this stage:
# 
# 1. Chain together the following:
#     * A prompt for extracting the relevant embeddings using the retriever.
#     * A prompt for answering any question using LangChain.
#     * An LLM model from Gemini for prompting.
#     
# 2. Run the created chain with a question as input to prompt the model for an answer.
# 

# ### Initialize Gemini
# 
# You must import `ChatGoogleGenerativeAI` from LangChain to initialize your model.
#  In this example, you will use **gemini-pro**, as it supports text summarization. To know more about the text model, read Google AI's [language documentation](https://ai.google.dev/models/gemini).
# 
# You can configure the model parameters such as ***temperature*** or ***top_p***,  by passing the appropriate values when initializing the `ChatGoogleGenerativeAI` LLM.  To learn more about the parameters and their uses, read Google AI's [concepts guide](https://ai.google.dev/docs/concepts#model_parameters).

# In[ ]:


get_ipython().system('pip install langchain')


# In[ ]:


pip install --upgrade langchain


# In[ ]:


from langchain_google_genai import ChatGoogleGenerativeAI

# If there is no environment variable set for the API key, you can pass the API
# key to the parameter `google_api_key` of the `ChatGoogleGenerativeAI`
# function: `google_api_key="key"`.

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-8b",
                  temperature=0.7, top_p=0.85)


# ### Create prompt templates
# 
# You'll use LangChain's [PromptTemplate](https://python.langchain.com/docs/modules/model_io/prompts/prompt_templates/) to generate prompts to the LLM for answering questions.
# 
# In the `llm_prompt`, the variable `question` will be replaced later by the input question, and the variable `context` will be replaced by the relevant text from the website retrieved from the Pinecone vector store.

# In[ ]:


# Prompt template to query Gemini
system_prompt = """You are an assistant for question-answering tasks.
Use the following context to answer the question.
If you don't know the answer, just say that you don't know.
Use five sentences maximum and keep the answer concise.

Question: {question}
Context: {context}
Answer:"""

# llm_prompt = PromptTemplate.from_template(llm_prompt_template)

# print(llm_prompt)


# In[ ]:


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


# In[ ]:


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


# In[ ]:


from typing import Sequence

from langchain_core.messages import BaseMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, StateGraph
from langgraph.graph.message import add_messages
from typing_extensions import Annotated, TypedDict
from langchain_core.messages import AIMessage, HumanMessage


# We define a dict representing the state of the application.
# This state has the same input and output keys as `rag_chain`.
class State(TypedDict):
    input: str
    chat_history: Annotated[Sequence[BaseMessage], add_messages]
    context: str
    answer: str


# We then define a simple node that runs the `rag_chain`.
# The `return` values of the node update the graph state, so here we just
# update the chat history with the input message and response.
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


# Our graph consists only of one node:
workflow = StateGraph(state_schema=State)
workflow.add_edge(START, "model")
workflow.add_node("model", call_model)

# Finally, we compile the graph with a checkpointer object.
# This persists the state, in this case in memory.
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)


# In[ ]:


config = {"configurable": {"thread_id": "abc123"}}

# result = app.invoke(
#     {"input": "explain Fail-safe in details"},
#     config=config,
# )
# print(result["answer"])

while True:
    user_input = input("Enter your question or type 'qa' to exit: ")
    
    if user_input.lower() == "qa":
        print("Exiting the program.")
        break
    else:
        # Invoke the rag_chain with the user's question
        result = app.invoke({"input": user_input},
                              config=config, )
        # Print the answer, replacing newline characters
        print(result["answer"])


# In[ ]:


chat_history = app.get_state(config).values["chat_history"]
for message in chat_history:
    message.pretty_print()


# ### Create a stuff documents chain
# 
# LangChain provides [Chains](https://python.langchain.com/docs/modules/chains/) for chaining together LLMs with each other or other components for complex applications. You will create a **stuff documents chain** for this application. A stuff documents chain lets you combine all the relevant documents, insert them into the prompt, and pass that prompt to the LLM.
# 
# You can create a stuff documents chain using the [LangChain Expression Language (LCEL)](https://python.langchain.com/docs/expression_language).
# 
# To learn more about different types of document chains, read LangChain's [chains guide](https://python.langchain.com/docs/modules/chains/document/).
# 
# The stuff documents chain for this application retrieves the relevant website data and passes it as the context to an LLM prompt along with the input question.

# In[ ]:


# Combine data from documents to readable string format.
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Create stuff documents chain using LCEL.
# This is called a chain because you are chaining
# together different elements with the LLM.
# In the following example, to create a stuff chain,
# you will combine content, prompt, LLM model, and
# output parser together like a chain using LCEL.
#
# The chain implements the following pipeline:
# 1. Extract data from documents and save to the variable `context`.
# 2. Use the `RunnablePassthrough` option to provide question during invoke.
# 3. The `context` and `question` are then passed to the prompt and
#    input variables in the prompt are populated.
# 4. The prompt is then passed to the LLM (`gemini-pro`).
# 5. Output from the LLM is passed through an output parser
#    to structure the model response.
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | llm_prompt
    | llm
    | StrOutputParser()
)


# ### Prompt the model
# 
# You can now query the LLM by passing any question to the `invoke()` function of the stuff documents chain you created previously.

# In[ ]:


rag_chain.invoke("explain Fail-safe in details").replace("\n","")


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:


while True:
    user_input = input("Enter your question or write qa to exit: ")
    if user_input == "qa":
        break
    else:
        print(rag_chain.invoke(user_input).replace("\n",""))


# In[ ]:


rag_chain.invoke("""explain the figure in details""").replace("\n","")


# In[ ]:


print('Fail-safe default is a security principle where systems default to denying access unless explicit permission is granted. This means that in case of errors or malfunctions, the system will likely err on the side of caution by restricting access, rather than mistakenly granting it. This approach minimizes security breaches as unauthorized access is less likely to occur. Conversely, a system that defaults to allowing access could inadvertently expose sensitive data if its access control mechanisms fail. File systems typically employ fail-safe defaults, as do most client-server protected services. ')


# In[ ]:


# model = genai.GenerativeModel('gemini-pro')


# In[ ]:


# response = model.generate_content("explain Fail-safe default in details")
# print(response.text)


# In[ ]:





# In[ ]:





# In[ ]:




