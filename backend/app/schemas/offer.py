from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class OfferBase(BaseModel):
    title: str
    description: str
    category: str
    duration: str
    location: str
    price: str
    features: Optional[List[str]] = []

class OfferCreate(OfferBase):
    pass

class OfferUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    price: Optional[str] = None

class Offer(OfferBase):
    id: int
    company_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class OfferWithCompany(Offer):
    company_name: Optional[str] = None
    
    class Config:
        from_attributes = True
