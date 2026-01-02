from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from ..models.application import ApplicationStatus
from .offer import Offer
from .user import User

class ApplicationBase(BaseModel):
    offer_id: int

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationUpdate(BaseModel):
    status: ApplicationStatus

class Application(ApplicationBase):
    id: int
    stagiaire_id: int
    status: ApplicationStatus
    applied_at: datetime
    
    offer: Optional[Offer] = None
    stagiaire: Optional[User] = None

    class Config:
        from_attributes = True
