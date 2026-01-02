from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, Base
import os
from .routes import auth, offers, applications, admin
from .core.config import settings

# Initialize database tables on startup
# In a production environment, you would typically use Alembic for migrations
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Tunisia Internship Management Platform",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Mount static files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# CORS Middleware configuration
# Allows communication between the React frontend and the FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers with descriptive tags for documentation
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(offers.router, prefix="/offers", tags=["Internship Offers"])
app.include_router(applications.router, prefix="/applications", tags=["Internship Applications"])
app.include_router(admin.router, prefix="/admin", tags=["Administrative Control"])

@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint to verify the API is alive.
    """
    return {"message": "Tunisie Internship Platform API is operational", "docs": "/docs"}
