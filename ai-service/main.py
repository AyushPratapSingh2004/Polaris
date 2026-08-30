from fastapi import FastAPI
from pydantic import BaseModel

from profiler import create_profile
from recommender import recommend_skills


# Create FastAPI application
app = FastAPI()


# ---------------------------------------
# Request format
# ---------------------------------------

class LearnerRequest(BaseModel):

    message: str

class RecommendationRequest(BaseModel):
    goal: str
    currentSkills: list[str] = []
    learningSkills: list[str] = []
    completedSkills: list[str] = []


# ---------------------------------------
# Home / test route
# ---------------------------------------

@app.get("/")
def home():

    return {
        "message": "AI Learning Path Service is running"
    }


# ---------------------------------------
# Generate learning path
# ---------------------------------------

@app.post("/generate-path")
def generate_path(request: LearnerRequest):

    # 1. Send user's message to LLM
    profile = create_profile(
        request.message
    )


    # 2. Use recommendation engine
    recommendation = recommend_skills(

        profile["goal"],

        profile["skills"],

        profile.get("completed_skills", [])

    )


    # 3. Return everything as JSON
    return {

        "profile": profile,

        "recommendation": recommendation

    }

@app.post("/recommend")
def generate_recommendation(request: RecommendationRequest):

    recommendation = recommend_skills(
        request.goal,
        request.currentSkills,
        request.completedSkills
    )

    return recommendation