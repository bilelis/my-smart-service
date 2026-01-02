# 🚀 Tunisie Internship Management Platform - Control Center

Welcome to the **Tunisie Internship Management Platform**, a premium digital ecosystem engineered for the next generation of Tunisian excellence. This platform connects the country's most ambitious academic talent with top-tier tech leaders and innovative startups through a high-performance "Control Center" experience.

---

## ⚡ Quick Start (Simplified Launcher)

The easiest way to initialize the entire ecosystem (Database, Backend, and Frontend) is to use the integrated Windows launcher:

1.  **Open your terminal** in the root directory (`my-smart-service`).
2.  Run the following command:
    ```powershell
    .\start.bat
    ```
    *This will automatically launch the Docker database, the FastAPI backend, and the React frontend in separate windows.*

---

## 🏗️ Manual Initialization Flow

If you prefer to start components individually, follow this sequence:

### 1. Persistent Storage (Docker)
Initialize the PostgreSQL infrastructure:
```powershell
docker-compose up -d db
```
*The database is mapped to port `5433` for local development.*

### 2. Logic Layer (FastAPI)
Initialize the database schema, seed mock data, and launch the API:
```powershell
cd backend
python -m reset_db           # Dropping & recreating schema
python -m app.init_db        # Seeding high-quality mock data
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
*Explore the registry API documentation at [http://localhost:8000/docs](http://localhost:8000/docs).*

### 3. Presentation Layer (React)
Launch the premium web interface on the designated port:
```powershell
# From the root directory (my-smart-service)
set PORT=3003
npm start
```
*The UI will stabilize at [http://localhost:3003](http://localhost:3003).*

---

## 🔑 Security Clearances (Authentication)

Access the three distinct specialized interfaces using the following credentials (Password: `password`):

| Target Protocol | Identifier (Email) | Core Functionality |
| :--- | :--- | :--- |
| **🎓 Student Hub** | `student@test.tn` | Trajectory tracking, CV Registry, Opportunity Discovery |
| **🏢 Enterprise Hub** | `company@test.tn` | Pipeline Management (Accept/Deny), Protocol Publishing |
| **🛡️ Global Registry** | `admin@test.tn` | System Analytics, Personnel Oversight, Security Logs |

---

## ✨ Premium Architectural Features

- **Trajectory Hub**: Students can monitor their application progression in a clean, glassmorphism-inspired "Trajectory" dashboard.
- **Enterprise Recruitment Pipeline**: High-contrast, dark-mode recruitment interface for companies to manage talent pipelines efficiently.
- **Glassmorphism UI/UX**: State-of-the-art design language utilizing **Framer Motion** for smooth transitions and **Tailwind CSS** for a premium "Glass" feel.
- **Dynamic Search Infrastructure**: Advanced real-time filtering for opportunities based on category, location, and metadata.
- **CORS Configurable Protocols**: Enterprise-ready security settings to allow cross-origin requests from multiple development endpoints.

---

## 🛠️ The Tech Stack

- **Frontend Core**: React 19, Lucide Icons, Framer Motion, Axios.
- **Backend Architecture**: FastAPI (Asynchronous Python), Pydantic V2, SQLAlchemy 2.0.
- **Infrastructure**: PostgreSQL 15, Docker & Docker Compose.
- **Design System**: Custom Tailwind implementation with premium typography (Outfit & Inter).

---
*Engineered with precision for the future of Tunisian Tech Talent.*
