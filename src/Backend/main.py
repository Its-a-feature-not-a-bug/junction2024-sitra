from typing import Union

from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import JWTError, jwt
from datetime import datetime, timedelta
import uuid

app = FastAPI()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

 

origins = [
    "http://localhost:5173",
    "hhttps://junction2024-sitra-backend.onrender.com",  # Your frontend Render URL
 ]
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the specified origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

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
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    return {"user_id": user_id}


@app.get("/protected-route")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello, user {current_user['user_id']}"}
