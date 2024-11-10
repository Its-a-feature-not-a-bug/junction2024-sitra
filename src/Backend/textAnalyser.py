from openai import OpenAI
import os
from dotenv import load_dotenv
import json
from database import database
from models import messages

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def update_message_scores(message_id: int, analysis_json: any):
    anger = analysis_json["anger"]
    emotional_intensity = analysis_json["emotional_intensity"]
    bias = analysis_json["bias"]
    reason = analysis_json["reason"]
    print(anger, emotional_intensity, bias, reason)
    query = (
        messages.update()
        .where(messages.c.id == message_id)
        .values(
            anger_score=anger,
            emotional_intensity_score=emotional_intensity,
            bias_score=bias,
            score_reason=reason,
        )
    )

    await database.execute(query)


async def analyze_text(text: str, message_id: int):
    prompt = (
        f"Analyze the following text and provide a score for the level of anger, emotional intensity, and bias. "
        f"Rate each on a scale from 0 to 100, with 100 being extremely high. "
        f"Provide summary reasoning, but keep it one or two sentences. Here is the text:\n\n"
        f"'{text}'\n\n"
        "Response Format:\n"
        '{ "anger": 0-100, "emotional_intensity": 0-100, "bias": 0-100, "reason": "reasoning (use single quatas in reasoning)" }\n'
    )

    print(prompt)

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Specify the engine
        messages=[
            {"role": "system", "content": prompt},
        ],

    )

    analysis = response.choices[0].message.content
    print(analysis)

    analysis_json = json.loads(analysis)
    print(analysis_json)
    await update_message_scores(message_id, analysis_json)


