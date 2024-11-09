import requests
from typing import Union
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import JWTError, jwt
from datetime import datetime, timedelta
import uuid
from database import engine, database, metadata
from models import conversations
import os
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()
metadata.create_all(bind=engine)
app = FastAPI()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the specified origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/")
def read_root():
    return {"Hello": "World"}


class LoginRequest(BaseModel):
    nickname: str

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta if expires_delta else datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/login/anonymous")
async def anonymous_login(request: LoginRequest):
    user_id = str(uuid.uuid4())  # Generate a unique user ID
    access_token = create_access_token({"sub": user_id, "nickname": request.nickname})
    return {"access_token": access_token, "token_type": "bearer"}

# Simple authentication dependency for secured endpoints
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login/anonymous")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        nickname: str = payload.get("nickname")
        if user_id is None or nickname is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    return {"user_id": user_id, "nickname": nickname}


@app.get("/protected-route")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello, user {current_user['user_id']}"}

@app.get("/conversations")
async def get_conversations():
    query = conversations.select()
    return await database.fetch_all(query)

class ConversationCreate(BaseModel):
    name: str

@app.post("/conversations") # send name in body
async def create_conversation(conversation: ConversationCreate, current_user: dict = Depends(get_current_user)):
  query = conversations.insert().values(name=conversation.name, creator_id=current_user["user_id"], creator_nickname=current_user["nickname"] )
  return await database.execute(query)


SITE_SECRET = os.getenv("SITE_SECRET")


class CaptchaResponse(BaseModel):
    captchaValue: str

def verify_recaptcha(captcha_value: str) -> bool:
    url = 'https://www.google.com/recaptcha/api/siteverify'
    data = {
        'secret': SITE_SECRET,
        'response': captcha_value
    }

    response = requests.post(url, data=data)
    result = response.json()
    
    return result.get('success', False)

@app.post("/verify")
async def verify(request: CaptchaResponse):
    captcha_value = request.captchaValue
    
    
    is_valid = verify_recaptcha(captcha_value)
    
    if is_valid:
        return {"success": True, "message": "reCAPTCHA validation succeeded!"}
    else:
        raise HTTPException(status_code=400, detail="reCAPTCHA validation failed")

