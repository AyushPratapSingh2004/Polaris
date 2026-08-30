import os
import json
import requests
from dotenv import load_dotenv


# Load API key
load_dotenv("key.env")

API_KEY = os.getenv("API_KEY")

if not API_KEY:
    raise Exception("API_KEY was not found in key.env")


# OpenRouter settings
URL = "https://openrouter.ai/api/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}


SYSTEM_PROMPT = """
You are a learner profiling AI.

Analyze the learner's message and create a learner profile.

IMPORTANT:

Return ONLY a valid JSON object.

Do NOT use Markdown.
Do NOT use ```json.
Do NOT use ``` at all.
Do NOT add explanations before or after the JSON.

Use exactly these fields:

{
    "goal": "",
    "level": "",
    "skills": [],
    "interests": []
}

Rules:

- goal = what the learner wants to achieve
- level = beginner, intermediate, or advanced
- skills = skills the learner already knows
- interests = topics the learner is interested in

Return ONLY the JSON object.
"""


def create_profile(user_input):

    data = {
        "model": "openrouter/free",

        "messages": [
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": user_input
            }
        ]
    }


    response = requests.post(
        URL,
        headers=HEADERS,
        json=data
    )


    if response.status_code != 200:
        raise Exception(
            f"OpenRouter API Error: {response.text}"
        )


    result = response.json()

    ai_answer = result["choices"][0]["message"]["content"].strip()


    # Remove Markdown code blocks if AI accidentally returns them

    if ai_answer.startswith("```json"):
        ai_answer = ai_answer[7:]

    elif ai_answer.startswith("```"):
        ai_answer = ai_answer[3:]


    if ai_answer.endswith("```"):
        ai_answer = ai_answer[:-3]


    ai_answer = ai_answer.strip()


    try:
        profile = json.loads(ai_answer)

    except json.JSONDecodeError:
        raise Exception(
            f"AI did not return valid JSON:\n{ai_answer}"
        )


    return profile