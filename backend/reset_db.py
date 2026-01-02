from app.database import engine, Base
from app.models.user import User
from app.models.company import Company
from app.models.offer import Offer
from app.models.application import Application

def reset_db():
    print("🗑️ Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("✅ Tables dropped.")
    print("🏗️ Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created.")

if __name__ == "__main__":
    reset_db()
