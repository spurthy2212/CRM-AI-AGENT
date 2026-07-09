from sqlalchemy import Column, Integer, String
from database.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    doctorName = Column(String)
    hospital = Column(String)
    specialization = Column(String)
    interactionType = Column(String)
    products = Column(String)
    followUpDate = Column(String)
    notes = Column(String)