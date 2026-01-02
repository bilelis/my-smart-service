from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from ..models.user import UserRole

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: UserRole = UserRole.STAGIAIRE

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    role: Optional[UserRole] = None

class User(UserBase):
    id: int
    cv_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User
