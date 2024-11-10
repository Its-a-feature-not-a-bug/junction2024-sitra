from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database import engine, database, metadata
from routes import auth, conversations, captcha

load_dotenv()
metadata.create_all(bind=engine)

app = FastAPI()

# Define allowed origins
origins = [
    "http://localhost:5173",
    "https://junction2024-sitra-frontend.onrender.com",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
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
