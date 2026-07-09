from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from services.groq_service import generate_summary
from database.database import engine, get_db
from models.interaction import Interaction
from schemas.interaction import InteractionCreate
from langgraph.workflow import graph
Interaction.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI-First CRM API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",   # <-- ADD THIS
        "http://localhost:5176",
        "http://localhost:5178",

        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",   # <-- ADD THIS
        "http://127.0.0.1:5176",
        "http://127.0.0.1:5178",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to AI-First CRM Backend"
    }


@app.post("/interaction")
def save_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):

    new_interaction = Interaction(
        doctorName=interaction.doctorName,
        hospital=interaction.hospital,
        specialization=interaction.specialization,
        interactionType=interaction.interactionType,
        products=interaction.products,
        followUpDate=interaction.followUpDate,
        notes=interaction.notes,
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return {
        "status": "success",
        "message": "Interaction Saved Successfully",
        "id": new_interaction.id
    }


@app.get("/interactions")
def get_interactions(db: Session = Depends(get_db)):
    interactions = db.query(Interaction).all()
    return interactions
@app.post("/ai-summary")
def ai_summary(interaction: InteractionCreate):

    text = f"""
    Doctor: {interaction.doctorName}
    Hospital: {interaction.hospital}
    Specialization: {interaction.specialization}
    Interaction Type: {interaction.interactionType}
    Products: {interaction.products}
    Follow Up: {interaction.followUpDate}
    Notes: {interaction.notes}
    """

    summary = generate_summary(text)

    return {
        "summary": summary
    }
@app.post("/ai-agent")
def ai_agent(interaction: InteractionCreate):

    text = f"""
    Doctor: {interaction.doctorName}
    Hospital: {interaction.hospital}
    Specialization: {interaction.specialization}
    Interaction Type: {interaction.interactionType}
    Products: {interaction.products}
    Follow Up: {interaction.followUpDate}
    Notes: {interaction.notes}
    """

    result = graph.invoke({
        "text": text,
        "summary": "",
        "email": "",
        "followup": "",
        "action": "",
    })

    return result
@app.delete("/interaction/{interaction_id}")
def delete_interaction(interaction_id: int, db: Session = Depends(get_db)):
    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not interaction:
        return {"message": "Interaction not found"}

    db.delete(interaction)
    db.commit()

    return {
        "status": "success",
        "message": "Interaction deleted successfully",
    }
@app.put("/interaction/{interaction_id}")
def update_interaction(
    interaction_id: int,
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not existing:
        return {"message": "Interaction not found"}

    existing.doctorName = interaction.doctorName
    existing.hospital = interaction.hospital
    existing.specialization = interaction.specialization
    existing.interactionType = interaction.interactionType
    existing.products = interaction.products
    existing.followUpDate = interaction.followUpDate
    existing.notes = interaction.notes

    db.commit()
    db.refresh(existing)

    return {
        "status": "success",
        "message": "Interaction updated successfully",
    }