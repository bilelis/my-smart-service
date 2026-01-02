from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from ..database import Base

class ApplicationStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    stagiaire_id = Column(Integer, ForeignKey("users.id"))
    offer_id = Column(Integer, ForeignKey("offers.id"))
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.PENDING)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())

    stagiaire = relationship("User", backref="applications")
    offer = relationship("Offer", back_populates="applications")
