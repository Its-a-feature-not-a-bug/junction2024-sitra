from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from database import database
from models import conversations, messages
import asyncio
from textAnalyser import analyze_text
from routes.auth import get_current_user

router = APIRouter()

class ConversationCreate(BaseModel):
    title: str
    description: str

class MessageCreate(BaseModel):
    content: str

@router.get("/conversations", tags=["conversations"])
async def get_conversations():
    query = conversations.select().order_by(conversations.c.id.desc())
    return await database.fetch_all(query)

@router.post("/conversations", tags=["conversations"])
async def create_conversation(conversation: ConversationCreate, current_user: dict = Depends(get_current_user)):
    title = conversation.title.strip()
    description = conversation.description.strip()

    if not title:
        raise HTTPException(status_code=400, detail="Title is required")
    # if title length is greater than 255 characters
    if len(title) > 255:
        raise HTTPException(status_code=400, detail="Title is too long")
    # if description length is greater than 500 characters
    if len(description) > 500:
        raise HTTPException(status_code=400, detail="Description is too long")

    query = conversations.insert().values(
        title=title,
        description=description,
        creator_id=current_user["user_id"],
        creator_nickname=current_user["nickname"]
    )
    return await database.execute(query)

@router.get("/conversations/{conversation_id}", tags=["conversations"])
async def get_conversation(conversation_id: int):
    query = conversations.select().where(conversations.c.id == conversation_id)
    conversation_exists = await database.fetch_all(query)

    if not conversation_exists:
        raise HTTPException(status_code=404, detail="Conversation not found")

    query = messages.select().where(messages.c.conversation_id == conversation_id)
    return await database.fetch_all(query)

@router.post("/conversations/{conversation_id}", tags=["conversations"])
async def send_message_to_conversation(
    conversation_id: int,
    message: MessageCreate,
    current_user: dict = Depends(get_current_user)
):
    query = conversations.select().where(conversations.c.id == conversation_id)
    conversation = await database.fetch_one(query)

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    query = messages.insert().values(
        conversation_id=conversation_id,
        user_id=current_user["user_id"],
        user_nickname=current_user["nickname"],
        content=message.content,
    )
    message_id = await database.execute(query)
    asyncio.create_task(analyze_text(message.content, message_id))
    return {"id": message_id}
