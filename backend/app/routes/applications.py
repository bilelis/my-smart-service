from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.application import Application, ApplicationCreate, ApplicationUpdate
from ..models.application import Application as ApplicationModel, ApplicationStatus
from ..models.offer import Offer as OfferModel
from ..models.company import Company as CompanyModel
from ..models.user import User as UserModel
from ..deps import get_current_user, get_current_company

router = APIRouter()

@router.get("/my-applications", response_model=List[Application])
def get_user_applications(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    return db.query(ApplicationModel).filter(ApplicationModel.stagiaire_id == current_user.id).all()

@router.get("/company", response_model=List[Application])
def get_company_applications(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_company)
):
    company = db.query(CompanyModel).filter(CompanyModel.user_id == current_user.id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company profile not found")
        
    return db.query(ApplicationModel)\
        .join(OfferModel)\
        .filter(OfferModel.company_id == company.id).all()

@router.post("/", response_model=Application)
def apply_to_offer(
    application_in: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    # Check if offer exists
    offer = db.query(OfferModel).filter(OfferModel.id == application_in.offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
        
    # Check if already applied
    existing = db.query(ApplicationModel).filter(
        ApplicationModel.stagiaire_id == current_user.id,
        ApplicationModel.offer_id == application_in.offer_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You have already applied for this offer")
        
    db_application = ApplicationModel(
        stagiaire_id=current_user.id,
        offer_id=application_in.offer_id,
        status=ApplicationStatus.PENDING
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

@router.patch("/{id}", response_model=Application)
def update_application_status(
    id: int,
    application_in: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_company)
):
    application = db.query(ApplicationModel).filter(ApplicationModel.id == id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
        
    # Check if user is the company owner of the offer
    offer = db.query(OfferModel).filter(OfferModel.id == application.offer_id).first()
    company = db.query(CompanyModel).filter(CompanyModel.user_id == current_user.id).first()
    
    if offer.company_id != company.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to update this application")
        
    application.status = application_in.status
    db.commit()
    db.refresh(application)
    return application
