from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models.user import User, UserRole
from .models.company import Company
from .models.offer import Offer
from .models.application import Application
from .core.security import get_password_hash

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if admin exists
    admin = db.query(User).filter(User.email == "admin@test.tn").first()
    if not admin:
        admin = User(
            email="admin@test.tn",
            name="Platform Admin",
            password=get_password_hash("password"),
            role=UserRole.ADMIN
        )
        db.add(admin)
        db.commit()
    
    # Check if company exists
    company_user = db.query(User).filter(User.email == "company@test.tn").first()
    if not company_user:
        company_user = User(
            email="company@test.tn",
            name="TechSolutions Tunisia",
            password=get_password_hash("password"),
            role=UserRole.COMPANY
        )
        db.add(company_user)
        db.commit()
        db.refresh(company_user)
        
        company_profile = Company(
            user_id=company_user.id,
            name="TechSolutions Tunisia",
            description="Leading software development company based in Tunis.",
            website="www.techsolutions.tn"
        )
        db.add(company_profile)
        db.commit()
        db.refresh(company_profile)
        
        # Add some offers
        offer1 = Offer(
            company_id=company_profile.id,
            title="Full-Stack Developer Intern",
            description="Looking for motivated interns to work on React & FastAPI projects.",
            category="Software Engineering",
            duration="4-6 Months",
            location="Tunis, Lac 2",
            price="Paid (400 DT/month)"
        )
        offer2 = Offer(
            company_id=company_profile.id,
            title="UI/UX Designer Intern",
            description="Help us design beautiful interfaces for our mobile applications.",
            category="UI/UX Design",
            duration="3-4 Months",
            location="Remote / Tunis",
            price="Paid (300 DT/month)"
        )
        db.add(offer1)
        db.add(offer2)
        db.commit()

    # Check if student exists
    student_user = db.query(User).filter(User.email == "student@test.tn").first()
    if not student_user:
        student_user = User(
            email="student@test.tn",
            name="Bilel Ayari",
            password=get_password_hash("password"),
            role=UserRole.STAGIAIRE
        )
        db.add(student_user)
        db.commit()

    db.close()
    print("Database initialized with mock data!")

if __name__ == "__main__":
    init_db()
