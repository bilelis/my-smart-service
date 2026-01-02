@echo off
TITLE Tunisie Internship Platform - Launcher
SETLOCAL

echo.
echo    ========================================================
echo       TUNISIE INTERNSHIP PLATFORM - PREMIUM CONTROL CENTER
echo    ========================================================
echo.

:: 1. Start Database
echo [1/3] 📦 Starting PostgreSQL Database (Docker)...
docker-compose up -d db
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERROR: Docker failed to start the database. 
    echo Please make sure Docker Desktop is running.
    pause
    exit /b %ERRORLEVEL%
)

:: Wait for DB to be ready
echo ⏳ Waiting for database to initialize (5s)...
timeout /t 5 >nul

:: 2. Start Backend
echo [2/3] 🛠️ Starting FastAPI Backend...
start cmd /k "TITLE Backend API && echo 🚀 Starting Backend... && cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

:: 3. Start Frontend
echo [3/3] 🌐 Starting React Frontend...
start cmd /k "TITLE Frontend UI && echo 🚀 Starting Frontend on Port 3003... && set PORT=3003 && npm start"

echo.
echo    ========================================================
echo       ✅ SYSTEMS INITIALIZED SUCCESSFULLY
echo    ========================================================
echo.
echo    - Backend running at: http://localhost:8000
echo    - API Docs available at: http://localhost:8000/docs
echo    - Frontend loading at your default browser...
echo.
echo    Keep this window open or press any key to exit this launcher.
pause >nul
