from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database import engine, database, metadata
from routes import auth, conversations, captcha

load_dotenv()
metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://junction2024-sitra-frontend.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Include routers with /api/ prefix
app.include_router(auth.router, prefix="/api")
app.include_router(conversations.router, prefix="/api")
app.include_router(captcha.router, prefix="/api")

