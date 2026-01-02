from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    title = Column(String, index=True)
    description = Column(Text)
    category = Column(String)  # Added category for filtering
    duration = Column(String)
    location = Column(String) # Added location
    price = Column(String)    # Added stipend/price
    features = Column(JSON, nullable=True) # Added features
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    company = relationship("Company", back_populates="offers")
    applications = relationship("Application", back_populates="offer", cascade="all, delete-orphan")
