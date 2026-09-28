# AgriN - Regenerative Agricultural Intelligence

AgriN is an interoperable digital agriculture intelligence platform that provides small and marginal farmers with localized, AI-powered agricultural guidance using weather, satellite, soil, crop-health and climate data.

This project was built for the Track 4 — AgriN & Regenerative Agricultural Intelligence hackathon challenge, demonstrating BRICS Cooperation.

## Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Lucide React, Recharts, Leaflet
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL (with PostGIS)
- **Deployment:** Docker, Docker Compose

## Prerequisites
- Node.js (v18+)
- Python (v3.11+)
- Docker and Docker Compose

## Quick Start (Docker)

1. Clone the repository.
2. Copy `.env.example` to `.env` and fill in your API keys (optional, fallback data is used in demo mode).
3. Run the complete stack:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API Docs: http://localhost:8000/docs

## Local Development (Without Docker)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
fastapi dev main.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features
- **AI Agro-Advisory:** Generates personalized recommendations based on farm data.
- **Crop Disease Diagnosis:** AI-powered image analysis for crop health.
- **Satellite & Soil Intelligence:** Visualizations of key agricultural metrics.
- **BRICS Cooperation Network:** Shared digital architecture demonstration.
- **Demo Mode:** Fully functional prototype using realistic simulated data.

## Demo Flow
Enable "DEMO MODE" in the UI to experience the complete functionality without requiring active external API subscriptions.
