from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    name = Column(String, index=True)
    description = Column(Text)
    website = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="company_profile")
    offers = relationship("Offer", back_populates="company", cascade="all, delete-orphan")
