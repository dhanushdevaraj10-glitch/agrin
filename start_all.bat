@echo off
echo Starting AgriN Backend...
start cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload"

echo Starting AgriN Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting.
echo Frontend will be at http://localhost:5173
echo Backend API at http://localhost:8000/docs
