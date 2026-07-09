from pydantic import BaseModel


class InteractionCreate(BaseModel):
    doctorName: str
    hospital: str
    specialization: str
    interactionType: str
    products: str
    followUpDate: str
    notes: str


class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True