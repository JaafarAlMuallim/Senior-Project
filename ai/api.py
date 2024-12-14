from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai
from typing import List, Optional
from pydantic import ValidationError
import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.vectorstores import Pinecone
from langchain.document_loaders import PyPDFLoader
from langchain.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.messages import AIMessage, HumanMessage
from pinecone import Pinecone as pc, PodSpec

app = FastAPI()

# Load environment variables
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")  # For embeddings
FINE_TUNE_API_KEY = os.getenv("FINE_TUNE_API_KEY")  # For fine-tuned model
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")


def create_genai_instance(api_key: str):
    instance = google.generativeai
    instance.configure(api_key=api_key)
    return instance


config = {"configurable": {"thread_id": "abc123"}}
# Create separate Gemini configurations
genai_ft = create_genai_instance(FINE_TUNE_API_KEY)  # For fine-tuned model
genai_embed = create_genai_instance(GOOGLE_API_KEY)  # For embeddings


# Pydantic models for request/response
class ChatMessage(BaseModel):
    role: str
    content: str


class Question(BaseModel):
    text: str
    chat_history: Optional[List[ChatMessage]] = []


class Answer(BaseModel):
    answer: str


class MCQRequest(BaseModel):
    text: str


class MCQResponse(BaseModel):
    questions: str


# Initialize components
def init_embeddings():
    return GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")


def init_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-1.5-flash-8b", temperature=0.7, top_p=0.85
    )


def init_pinecone(index_name: str = "langchain-demo"):
    pine_client = pc(api_key=PINECONE_API_KEY)

    if index_name not in pine_client.list_indexes().names():
        pine_client.create_index(
            name=index_name,
            metric="cosine",
            dimension=768,
            spec=PodSpec(
                environment="gcp-starter",
                pod_type="starter",
                pods=1,
            ),
        )
    return pine_client


def load_documents(pdf_path: str):
    loader = PyPDFLoader(pdf_path)
    return loader.load()


def setup_vectorstore(docs, embeddings, index_name: str):
    return Pinecone.from_documents(docs, embeddings, index_name=index_name)


def create_rag_chain(retriever, llm):
    system_prompt = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer "
        "the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the "
        "answer concise."
        "\n\n"
        "{context}"
    )

    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                (
                    "Given a chat history and the latest user question "
                    "which might reference context in the chat history, "
                    "formulate a standalone question which can be understood "
                    "without the chat history. Do NOT answer the question, "
                    "just reformulate it if needed and otherwise return it as is."
                ),
            ),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    history_aware_retriever = create_history_aware_retriever(
        llm, retriever, contextualize_q_prompt
    )

    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
    return create_retrieval_chain(history_aware_retriever, question_answer_chain)


# Global variables to store initialized components
embeddings = None
llm = None
rag_chain = None


@app.on_event("startup")
async def startup_event():
    global embeddings, llm, rag_chain

    # Initialize components
    embeddings = init_embeddings()
    print("Embeddings initialized")
    llm = init_llm()
    print("LLM initialized")

    # Initialize Pinecone
    pine_client = init_pinecone()

    # Load and process documents
    docs = load_documents("./Computer Security Principles and Practice.pdf")
    print("Documents loaded")

    # Setup vectorstore and retriever
    vectorstore = setup_vectorstore(docs, embeddings, "langchain-demo")
    print("Vectorstore setup")
    retriever = vectorstore.as_retriever()
    print("Retriever setup")

    # Create RAG chain
    rag_chain = create_rag_chain(retriever, llm)
    print("RAG chain created")


@app.post("/ask", response_model=Answer)
async def ask_question(question: Question):
    try:
        if not rag_chain:
            raise HTTPException(status_code=500, detail="RAG system not initialized")
        # Convert chat history to the expected format
        formatted_history = []
        print(question.chat_history)
        print(question.text)
        if question.chat_history:
            for msg in question.chat_history:
                if msg.role == "user":
                    formatted_history.append(HumanMessage(content=msg.content))
                elif msg.role == "assistant":
                    formatted_history.append(AIMessage(content=msg.content))

        # Process the question
        result = rag_chain.invoke(
            {"input": question.text, "chat_history": formatted_history}, config=config
        )
        print(result)
        return Answer(answer=result["answer"])
    except ValidationError as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))


def generate_mcq_questions():
    """Generate MCQ questions using Gemini model."""
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai_ft.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )
    response = model.generate_content(
        [
            ## DELETED CONTENT OF FINE_TUNING
            'Generate MCQ questions from the following and write the answers in JSON format in the following format :{     "question": "1. Convert –374°F into Kelvin.",     "options": [       "A) 47 K",       "B) 97 K",       "C) 65 K",       "D) 83 K",       "E) 165 K"     ],     "answer": "A) 47 K"   }, Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n Chemistry\\n Fourth Edition\\n Julia Burdge\\n Lecture PowerPoints\\n Chapter 5\\n Thermochemistry \\nCHAPTER\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5 Thermochemistry \\n2\\n 5.1Energy and Energy Changes\\n 5.2 Introduction to Thermodynamics\\n 5.3Enthalpy\\n 5.4Calorimetry\\n 5.5Hess’s Law\\n 5.6 Standard Enthalpies of Formation\\nTopics\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.1 Energy and Energy Changes\\n 3\\n Forms of Energy\\n Energy Changes in Chemical Reactions\\n Units of Energy\\n5.1\\n Energy and Energy Changes\\n Forms of Energy\\n Kinetic energy:\\n M= mass, u=velocity\\n the energy that results \\nfrom motion\\n Energy\\n defined as the \\ncapacity to do \\nwork or transfer \\nheat\\n Potential energy:\\n Thermal energy:\\n energy associated with the random motion of \\natoms and molecules.\\n monitor changes in thermal energy by \\nmeasuring temperature changes. \\nElectrostatic energy:\\n is potential energy that \\nresults from the interaction of \\ncharged particles. \\nenergy possessed by an \\nobject by virtue of its \\nposition.\\n Chemical energy:\\n energy stored within the structural units \\n(molecules or polyatomic ions) of chemical \\nsubstances, depends on the arrangment of \\natoms.\\n 4\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.1 Energy and Energy Changes\\n 5\\n Kinetic and potential energy are interconvertible\\n law of conservation of energy: When energy of one form disappears, the same \\namount of energy must appear in another form or forms. \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.1 Energy and Energy Changes\\n Energy Changes in Chemical Reactions\\n 6\\n The system is defined as the specific part of the universe that \\nis of interest to us. \\nThe rest of the universe outside the system constitutes the \\nsurroundings. \\n5.1\\n Energy and Energy Changes\\n Energy Changes in Chemical Reactions\\n Heat is the transfer of thermal energy between two bodies that are at different \\ntemperatures. \\n7\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.1 Energy and Energy Changes\\n Units of Energy\\n 8\\n The SI unit of energy is the joule (J). It is the amount of kinetic \\nenergy possessed by a 2-kg mass moving at a speed of 1 m/s.  \\nThe joule can also be defined as the amount of energy \\nexerted when a force of 1 newton (N) is applied over a \\ndistance of 1 meter. \\nSAMPLE PROBLEM\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.1\\n 9\\n (a) Calculate the kinetic energy of a helium atom moving at a \\nspeed of 125 m/s. \\nSolution\\n Conversion factor:\\nSAMPLE PROBLEM\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.1\\n 10\\n (b) How much greater is the magnitude of electrostatic attraction between an electron \\nand a nucleus containing three protons versus that between an electron and a nucleus \\ncontaining one proton? (Assume that the distance between the nucleus and the \\nelectron is the same in each case.) \\nThe electrostatic potential energy between charges of +3 and –1 is three times that \\nbetween charges of +1 and –1. \\nSolution\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.1 Energy and Energy Changes\\n Units of Energy\\n 11\\n Another unit used to express energy is the calorie (cal). \\nTopics\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.2 Introduction to Thermodynamics\\n 12\\n States and State Functions\\n The First Law of Thermodynamics\\n Work and Heat\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.2 Introduction to Thermodynamics\\n States and State Functions\\n 13\\n Thermodynamics: which is the scientific study of the interconversion of heat and other \\nkinds of energy. Part of it is thermochemistry.\\n Types of systems:\\n 1- An open system can exchange mass and energy with its surroundings. \\n2- A closed system allows the transfer of energy but not mass. \\n3- An isolated system does not exchange either mass or energy with its surroundings. \\n5.2\\n Introduction to Thermodynamics\\n States and State Functions\\n In thermodynamics, we study changes in the state of a system, which is \\ndefined by the values of all relevant macroscopic properties, such as \\ncomposition, energy, temperature, pressure, and volume. \\nEnergy, pressure, volume, and temperature are said to be state \\nfunctions—properties that are determined by the state of the system, \\nregardless of how that condition was achieved.\\n state functions:- Energy.- Pressure.- Volume.- Temperature.\\n 14\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.2 Introduction to Thermodynamics\\n The First Law of Thermodynamics\\n 15\\n The first law of thermodynamics, which is based on the law \\nof conservation of energy, states that energy can be \\nconverted from one form to another but cannot be created or \\ndestroyed. \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.2 Introduction to Thermodynamics\\n The First Law of Thermodynamics\\n 16\\n The change in internal energy of a system, ΔU, is given by \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.2 Introduction to Thermodynamics\\n Work and Heat\\n 17\\n Energy is defined as the capacity to do work or transfer heat.\\n When a system releases or absorbs heat, its internal energy \\nchanges. \\nLikewise, when a system does work on its surroundings, or \\nwhen the surroundings do work on the system, the system’s \\ninternal energy also changes. \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.2 Introduction to Thermodynamics\\n Work and Heat\\n 18\\n Energy is defined as the capacity to do work or transfer heat.\\n The overall change in the system’s internal energy is given by \\nwhere q is heat (released or absorbed by the system).\\n w is work (done on the system or done by the system). \\nNeither q nor w is a state function. Each depends on the path between the initial and \\nfinal states of the system. Their sum, ΔU, does not depend on the path between initial \\nand final states because U is a state function. \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.2 Introduction to Thermodynamics\\n Work and Heat\\n 19\\nSAMPLE PROBLEM\\n 5.2\\n Calculate the overall change in internal energy, ΔU, (in joules) \\nfor a system that absorbs 188 J of heat and does 141 J of work \\non its surroundings. \\nSetup\\n The system absorbs heat, so q is positive. The system does \\nwork on the surroundings, so w is negative. \\nSolution\\n 20\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nTopics\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.3 Enthalpy\\n 21\\n Reactions Carried Out at Constant Volume or at Constant \\nPressure\\n Enthalpy and Enthalpy Changes\\n Thermochemical Equations\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.3 Enthalpy\\n Reactions Carried Out at Constant Volume or at Constant \\nPressure\\n 22\\n5.3\\n Enthalpy\\n Reactions Carried Out at Constant Volume or at Constant \\nPressure\\n 23\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.3 Enthalpy\\n 24\\n Reactions Carried Out at Constant Volume or at Constant \\nPressure\\n For a system that can do only PV work:\\n If volume is constant: If pressure is constant:\\n5.3\\n Enthalpy\\n Enthalpy and Enthalpy Changes\\n There is a thermodynamic function of a system called enthalpy (H), which is defined as \\nH is a state function. \\nFor any process, the change in enthalpy is given by \\nAt constant pressure:\\n 25\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n5.3\\n Enthalpy\\n Enthalpy and Enthalpy Changes\\n Because most laboratory reactions are constant-pressure \\nprocesses, the heat exchanged between the system and \\nsurroundings is equal to the change in enthalpy for the \\nprocess. \\nFor any reaction, we define the change in enthalpy, called the \\nenthalpy of reaction (ΔH), as the difference between the \\nenthalpies of the products and the enthalpies of the \\nreactants: \\n26\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.3 Enthalpy\\n Thermochemical Equations\\n 27\\n Thermochemical equations are chemical equations that show \\nthe enthalpy changes as well as the mass relationships. \\nThe ΔH value of –890.4 kJ/mol can be expressed in any of the \\nfollowing ways: \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.3 Enthalpy\\n 28\\n Thermochemical Equations:\\n The following guidelines are helpful in interpreting, writing, and manipulating \\nthermochemical equations: \\n1. Always specify the physical states of all reactants and products, because they help \\ndetermine the actual enthalpy changes. \\n[In the equation for the combustion of methane, for example, changing the liquid \\nwater product to water vapor changes the value of ΔH.]\\n 2. If we multiply both sides of a thermochemical equation by a factor n, then ΔH \\nmust also change by the same factor. \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.3 Enthalpy\\n Thermochemical Equations\\n 29\\n 3. When we reverse a chemical equation, we change the \\nroles of reactants and products. Consequently, the \\nmagnitude of ΔH for the equation remains the same, but \\nits sign changes. \\nSAMPLE PROBLEM\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.3\\n 30\\n Given the thermochemical equation for photosynthesis, \\ncalculate the solar energy required to produce 75.0 g of C6\\n H12\\n O6\\n . \\nSetup\\n The molar mass of C6\\n H12\\n O6\\n is 180.2 g/mol, so 75.0 g of C6\\n H12\\n O6\\n is\\n Solution\\n Therefore, 1.17 × 103 kJ of energy in the form of sunlight is consumed in \\nthe production of 75.0 g of C6\\n H12\\n O6\\n . \\nTopics\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.4 Calorimetry\\n 31\\n Specific Heat and Heat Capacity\\n Constant-Pressure Calorimetry\\n Constant-Volume Calorimetry\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.4 Calorimetry\\n Specific Heat and Heat Capacity\\n 32\\n The specific heat (s) of a substance is the amount of heat \\nrequired to raise the temperature of 1 g of the substance by \\n1°C. \\nThe heat capacity (C) is the amount of heat required to raise \\nthe temperature of an object by 1°C. \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.4 Calorimetry\\n Specific Heat and Heat Capacity\\n 33\\n For example, we can use the specific heat of water, \\n4.184 J/(g ⋅ °C), to determine the heat capacity of a kilogram \\nof water: \\nNote that specific heat has the units J/(g ⋅ °C) and heat \\ncapacity has the units J/°C. \\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.4 Calorimetry\\n Specific Heat and Heat Capacity\\n 34\\n For a substance with specific heat s and mass m:\\n For an object with heat capacity C:\\nSAMPLE PROBLEM\\n 5.4\\n Calculate the amount of heat (in kJ) required to heat 255 g of \\nwater from 25.2°C to 90.5°C. \\nStrategy\\n Use q = smΔT to calculate q. \\nSetup\\n m = 255 g, s = 4.184 J/g · °C, ΔT = 90.5°C – 25.2°C = 65.3°C\\n Solution\\n 35\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.4 Calorimetry\\n Constant-Pressure Calorimetry\\n 36\\nSAMPLE PROBLEM\\n 5.5\\n A metal pellet with a mass of 100.0 g, originally at 88.4°C, is dropped into 125 g of \\nwater originally at 25.1°C. The final temperature of both the pellet and the water is \\n31.3°C.  \\nCalculate the heat capacity C (in J/°C) of the pellet. \\nStrategy\\n Use q = smΔT to determine the heat absorbed by the water; then use q = CΔT to \\ndetermine the heat capacity of the metal pellet. \\nSetup\\n • mwater\\n = 125 g\\n • swater\\n = 4.184 J/g · \\n• °ΔTwater\\n = 31.3°C – 25.1°C = 6.2°C\\n The heat absorbed by the water must be \\nreleased by the pellet: \\n• qwater\\n = –qpellet\\n \\n• mpellet\\n = 100.0 g\\n • ΔTpellet\\n = 31.3°C – 88.4°C = -57.1°C\\n Solution\\n 37\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.4 Calorimetry\\n Constant-Pressure Calorimetry\\n 38\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.4 Calorimetry\\n Constant-Volume Calorimetry\\n 39\\n Because no heat enters or leaves the system \\nduring the process, the heat change of the \\nsystem overall (qsystem\\n ) is zero and we can write\\nSAMPLE PROBLEM\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.6\\n 40\\n A Famous Amos bite-sized chocolate chip cookie weighing 7.25 g is burned in a bomb \\ncalorimeter to determine its energy content. The heat capacity of the calorimeter is \\n39.97 kJ/°C. During the combustion, the temperature of the water in the calorimeter \\nincreases by 3.90°C. \\nCalculate the energy content (in kJ/g) of the cookie. \\nStrategy\\n Use qrxn\\n = –Ccal\\n ΔT to calculate the heat released by the combustion of the cookie. \\nDivide the heat released by the mass of the cookie to determine its energy content per \\ngram. \\nSetup\\n Solution\\n5.5\\n Hess’s Law\\n Topics\\n Hess’s Law\\n 41\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.5 Hess’s Law\\n Hess’s Law\\n 42\\n Because enthalpy is a state function, the change in enthalpy \\nthat occurs when reactants are converted to products in a \\nreaction is the same whether the reaction takes place in one \\nstep or in a series of steps. \\nThis observation is called Hess’s law.\\nSAMPLE PROBLEM\\n 5.7\\n Given the following thermochemical equations, \\ndetermine the enthalpy change for the reaction\\n 43\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nSAMPLE PROBLEM\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.7\\n 44\\n Strategy\\n Arrange the given thermochemical equations so that they sum to the desired equation. \\nMake the corresponding changes to the enthalpy changes, and add them to get the \\ndesired enthalpy change. \\nSolution\\n5.6\\n Standard Enthalpies of Formation\\n Topics\\n Standard Enthalpies of Formation\\n 45\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n5.6\\n Standard Enthalpies of Formation\\n Standard Enthalpies of Formation\\n Chemists have agreed on an arbitrary reference point for \\nenthalpy. \\nThe “sea level” reference point for all enthalpy expressions is \\ncalled the \\nstandard enthalpy of formation (ΔH° f\\n ): which is defined as \\nthe heat change that results when 1 mole of a compound is \\nformed from its constituent elements in their standard \\nstates. \\n46\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\nCopyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.6 Standard Enthalpies of Formation\\n Standard Enthalpies of Formation\\n 47\\n The importance of the standard enthalpies of formation is \\nthat once we know their values, we can readily calculate the \\nstandard enthalpy of reaction (ΔH°rxn\\n ), defined as the \\nenthalpy of a reaction carried out under standard conditions. \\nSAMPLE PROBLEM\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.8\\n 48\\n Using data from Appendix 2, calculate ΔH°rxn\\n for \\nSetup\\n The ΔH° f\\n values for Ag+(aq), Cl–(aq), and AgCl(s) are 1105.9, \\n2167.2, and 2127.0 kJ/mol, respectively. \\nSolution\\nSAMPLE PROBLEM\\n Copyright © McGraw-Hill Education. All rights reserved. No reproduction or distribution without the prior written consent of McGraw-Hill Education.\\n 5.9\\n 49\\n Given the following information, calculate the standard \\nenthalpy of formation of acetylene (C2\\n H2\\n ) from its constituent \\nelements: \\nSolution',
            "output: ",
        ]
    )

    return response.text


@app.post("/generate-mcq", response_model=MCQResponse)
async def create_mcq(request: MCQRequest):
    try:
        questions = generate_mcq_questions()
        return MCQResponse(questions=questions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
