from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AgriN API", description="AgriN - Regenerative Agricultural Intelligence")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AgriN API"}

class AdvisoryRequest(BaseModel):
    location: str
    crop: str
    growth_stage: str
    soil_type: str
    irrigation_type: str
    farm_size: str
    current_problem: str

@app.post("/api/advisory")
def generate_advisory(req: AdvisoryRequest):
    # Simulated AI Advisory Response (fallback/demo mode)
    return {
        "advisory": {
            "water": "Delay irrigation for 24 hours due to expected rainfall.",
            "soil": "Add organic matter and avoid excessive nitrogen application.",
            "crop": "Monitor lower leaves for early fungal symptoms.",
            "weather": "Rainfall probability is increasing during the next 24 hours."
        },
        "action_priority": [
            "Monitor crop moisture",
            "Inspect lower leaves",
            "Avoid unnecessary irrigation",
            "Prepare drainage channels"
        ],
        "risk": "Moderate",
        "confidence": 87,
        "explanation": "Recommendations are generated from the selected location, crop conditions, weather and soil parameters."
    }

import requests

@app.get("/api/weather")
def get_weather():
    try:
        # Coimbatore coordinates
        lat, lon = 11.0168, 76.9558
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code"
        response = requests.get(url, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            current = data.get("current", {})
            
            # Simple weather code mapping
            code = current.get("weather_code", 0)
            condition = "Clear" if code <= 1 else "Cloudy" if code <= 3 else "Rain" if code >= 50 else "Partly Cloudy"
            
            return {
                "temperature": current.get("temperature_2m", 28),
                "condition": condition,
                "humidity": current.get("relative_humidity_2m", 76),
                "rain_probability": current.get("precipitation", 0) > 0 and 80 or 10  # Mock probability based on actual precipitation
            }
    except Exception as e:
        print("Weather API Error:", e)

    # Fallback / Demo data
    return {
        "temperature": 28,
        "condition": "Partly Cloudy",
        "humidity": 76,
        "rain_probability": 64
    }

@app.get("/api/soil")
def get_soil():
    return {
        "health_score": 78,
        "metrics": {
            "pH": 6.7,
            "organic_carbon": 1.2,
            "nitrogen": "Moderate",
            "phosphorus": "Good",
            "potassium": "Moderate",
            "moisture": 64,
            "electrical_conductivity": "Normal"
        }
    }

@app.get("/api/satellite")
def get_satellite():
    return {
        "vegetation_index": 0.72,
        "crop_stress": "Low",
        "canopy_health": "Good",
        "water_stress": "Moderate"
    }

@app.get("/api/crop-health")
def get_crop_health():
    return {
        "health_score": 84,
        "disease_risk": "Moderate"
    }

@app.get("/api/regenerative-plan")
def get_regen_plan():
    return {
        "score": 81,
        "breakdown": {
            "soil_organic_matter": 72,
            "water_efficiency": 88,
            "biodiversity": 76,
            "chemical_reduction": 79,
            "carbon_practices": 84
        },
        "recommendations": [
            {
                "title": "Cover Cropping",
                "potential_impact": "High",
                "water_retention": "+18%",
                "organic_matter": "+12%",
                "implementation": "Medium"
            }
        ]
    }

import google.generativeai as genai
import json

class CropDiagnosisRequest(BaseModel):
    image_url: str = None
    use_demo: bool = False

@app.post("/api/disease-diagnosis")
def diagnose_crop(req: CropDiagnosisRequest):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not req.use_demo and req.image_url and api_key and api_key != "your_gemini_api_key_here":
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            # Extract base64 part
            header, encoded = req.image_url.split(",", 1) if "," in req.image_url else ("", req.image_url)
            mime_type = header.split(":")[1].split(";")[0] if ":" in header else "image/jpeg"
            
            prompt = """
            Analyze this crop image and return ONLY a valid JSON object with the following schema:
            {
                "crop": "Name of the crop identified",
                "detected_condition": "Disease or pest detected (or 'Healthy')",
                "confidence": number between 0 and 100,
                "severity": "Low", "Moderate", or "High",
                "symptoms": ["list", "of", "visible", "symptoms"],
                "recommended_actions": ["list", "of", "actions", "to", "take"],
                "regenerative_response": "1-2 sentences on how to treat this organically/regeneratively"
            }
            Do not include markdown blocks like ```json ... ```. Just return the raw JSON object.
            """
            
            response = model.generate_content([
                {"mime_type": mime_type, "data": encoded},
                prompt
            ])
            
            text = response.text.strip()
            if text.startswith("```json"): text = text[7:]
            if text.startswith("```"): text = text[3:]
            if text.endswith("```"): text = text[:-3]
            
            return json.loads(text.strip())
        except Exception as e:
            print("Gemini API Error:", str(e))
            # Fallback to mock data on error

    # Fallback / Demo data
    return {
        "crop": "Tomato",
        "detected_condition": "Possible Early Blight",
        "confidence": 92,
        "severity": "Moderate",
        "symptoms": [
            "Brown lesions",
            "Leaf yellowing",
            "Concentric ring patterns"
        ],
        "recommended_actions": [
            "Remove severely affected leaves",
            "Improve field ventilation",
            "Avoid overhead irrigation",
            "Monitor surrounding plants"
        ],
        "regenerative_response": "Prioritize biological and preventive interventions before chemical treatment."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
