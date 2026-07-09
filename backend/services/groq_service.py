import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
)


def ask_groq(prompt: str):
    response = llm.invoke(prompt)
    return response.content


def generate_summary(text: str):
    prompt = f"""
Summarize this CRM interaction in 3-5 bullet points.

{text}
"""
    return ask_groq(prompt)


def generate_email(text: str):
    prompt = f"""
Write a professional follow-up email based on this CRM interaction.

{text}
"""
    return ask_groq(prompt)


def followup_suggestion(text: str):
    prompt = f"""
Suggest the best follow-up action after this interaction.

{text}
"""
    return ask_groq(prompt)


def next_best_action(text: str):
    prompt = f"""
Suggest the next best sales action.

{text}
"""
    return ask_groq(prompt)