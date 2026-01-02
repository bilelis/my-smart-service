from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
import shutil
import os
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database import get_db
from ..core import security
from ..core.config import settings
from ..schemas.user import UserCreate, Token, User
from ..models.user import User as UserModel
from ..models.company import Company as CompanyModel
from ..deps import get_current_user

router = APIRouter()

@router.post("/register", response_model=User)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists.",
        )
    
    hashed_password = security.get_password_hash(user_in.password)
    db_user = UserModel(
        email=user_in.email,
        password=hashed_password,
        name=user_in.name,
        role=user_in.role,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # If role is company, create blank company profile
    if db_user.role == "company":
        company = CompanyModel(user_id=db_user.id, name=db_user.name)
        db.add(company)
        db.commit()
        
    return db_user

@router.post("/login", response_model=Token)
def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(UserModel).filter(UserModel.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=User)
def read_user_me(current_user: UserModel = Depends(get_current_user)):
    return current_user

@router.post("/upload-cv")
async def upload_cv(
    file: UploadFile = File(...),
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not file.filename.lower().endswith(('.pdf', '.doc', '.docx')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOC are allowed.")
    
    file_path = f"uploads/cv_{current_user.id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Update user record
    current_user.cv_url = f"/uploads/cv_{current_user.id}_{file.filename}"
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    
    return {"cv_url": current_user.cv_url}
