from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.offer import Offer, OfferCreate, OfferUpdate
from ..models.offer import Offer as OfferModel
from ..models.company import Company as CompanyModel
from ..models.user import User as UserModel
from ..deps import get_current_user, get_current_company

router = APIRouter()

@router.get("/", response_model=List[Offer])
def get_offers(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None
):
    query = db.query(OfferModel)
    if category:
        query = query.filter(OfferModel.category == category)
    return query.offset(skip).limit(limit).all()

@router.get("/company", response_model=List[Offer])
def get_company_offers(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_company)
):
    company = db.query(CompanyModel).filter(CompanyModel.user_id == current_user.id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company profile not found")
    return db.query(OfferModel).filter(OfferModel.company_id == company.id).all()

@router.get("/{id}", response_model=Offer)
def get_offer_by_id(id: int, db: Session = Depends(get_db)):
    offer = db.query(OfferModel).filter(OfferModel.id == id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    return offer

@router.post("/", response_model=Offer)
def create_offer(
    offer_in: OfferCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_company)
):
    company = db.query(CompanyModel).filter(CompanyModel.user_id == current_user.id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company profile not found")
        
    db_offer = OfferModel(
        **offer_in.dict(),
        company_id=company.id
    )
    db.add(db_offer)
    db.commit()
    db.refresh(db_offer)
    return db_offer

@router.put("/{id}", response_model=Offer)
def update_offer(
    id: int,
    offer_in: OfferUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_company)
):
    offer = db.query(OfferModel).filter(OfferModel.id == id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    # Check ownership
    company = db.query(CompanyModel).filter(CompanyModel.user_id == current_user.id).first()
    if offer.company_id != company.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to update this offer")
        
    for field, value in offer_in.dict(exclude_unset=True).items():
        setattr(offer, field, value)
        
    db.commit()
    db.refresh(offer)
    return offer

@router.delete("/{id}")
def delete_offer(
    id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_company)
):
    offer = db.query(OfferModel).filter(OfferModel.id == id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
        
    company = db.query(CompanyModel).filter(CompanyModel.user_id == current_user.id).first()
    if offer.company_id != company.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to delete this offer")
        
    db.delete(offer)
    db.commit()
    return {"message": "Offer deleted successfully"}
