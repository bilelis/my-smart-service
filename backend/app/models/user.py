from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func
import enum
from ..database import Base

class UserRole(str, enum.Enum):
    """
    Defines the available user roles within the platform.
    - STAGIAIRE: Student looking for internships.
    - COMPANY: Representative posting internship offers.
    - ADMIN: Platform administrator with high-level oversight.
    """
    STAGIAIRE = "stagiaire"
    COMPANY = "company"
    ADMIN = "admin"

class User(Base):
    """
    Primary User model stored in the 'users' table.
    Contains core authentication and identity information.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False) # Stores the bcrypt hashed password
    role = Column(Enum(UserRole), default=UserRole.STAGIAIRE)
    cv_url = Column(String, nullable=True) # Path to uploaded CV
    created_at = Column(DateTime(timezone=True), server_default=func.now())
