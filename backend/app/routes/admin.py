from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.user import User
from ..schemas.offer import Offer
from ..schemas.application import Application
from ..schemas.company import Company
from ..models.user import User as UserModel
from ..models.offer import Offer as OfferModel
from ..models.application import Application as ApplicationModel
from ..models.company import Company as CompanyModel
from ..deps import get_current_admin

router = APIRouter()

@router.get("/users", response_model=List[User])
def list_users(db: Session = Depends(get_db), admin: UserModel = Depends(get_current_admin)):
    return db.query(UserModel).all()

@router.get("/companies", response_model=List[Company])
def list_companies(db: Session = Depends(get_db), admin: UserModel = Depends(get_current_admin)):
    return db.query(CompanyModel).all()

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), admin: UserModel = Depends(get_current_admin)):
    return {
        "users": db.query(UserModel).count(),
        "companies": db.query(CompanyModel).count(),
        "offers": db.query(OfferModel).count(),
        "applications": db.query(ApplicationModel).count()
    }

@router.delete("/users/{id}")
def delete_user(id: int, db: Session = Depends(get_db), admin: UserModel = Depends(get_current_admin)):
    user = db.query(UserModel).filter(UserModel.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own admin account")
        
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

@router.get("/applications", response_model=List[Application])
def list_applications(db: Session = Depends(get_db), admin: UserModel = Depends(get_current_admin)):
    return db.query(ApplicationModel).all()
