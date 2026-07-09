from langgraph.graph import StateGraph, END
from typing import TypedDict

from services.groq_service import (
    generate_summary,
    generate_email,
    followup_suggestion,
    next_best_action,
)


class CRMState(TypedDict):
    text: str
    summary: str
    email: str
    followup: str
    action: str


def summary_node(state):
    state["summary"] = generate_summary(state["text"])
    return state


def email_node(state):
    state["email"] = generate_email(state["text"])
    return state


def followup_node(state):
    state["followup"] = followup_suggestion(state["text"])
    return state


def action_node(state):
    state["action"] = next_best_action(state["text"])
    return state


builder = StateGraph(CRMState)

builder.add_node("summary", summary_node)
builder.add_node("email", email_node)
builder.add_node("followup", followup_node)
builder.add_node("action", action_node)

builder.set_entry_point("summary")

builder.add_edge("summary", "email")
builder.add_edge("email", "followup")
builder.add_edge("followup", "action")
builder.add_edge("action", END)

graph = builder.compile()