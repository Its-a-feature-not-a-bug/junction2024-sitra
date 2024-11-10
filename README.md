# Junction 2024 Sitra Project

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd src/Backend
```

1. Create a virtual environment:
```bash
python3 -m venv venv
```

2. Activate the virtual environment:
```bash
source venv/bin/activate
```

3. Install the backend dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
fastapi dev main.py
```

### .env file inside of src/Backend should look like:
```
DATABASE_URL=mysql+asyncmy://username:password@url:port/database
SITE_SECRET={recaptcha_site_secret}
OPENAI_API_KEY={openai_api_key}
JWT_SECRET={jwt_secret}
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd src/Frontend
```

2. Install the frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### .env file inside of src/Frontend should look like:
```
VITE_API_URL=http://localhost:8000
VITE_RECAPTCHA_SITE_KEY={recaptcha_site_key}
```

## Tech Stack
- Frontend: React + TypeScript + Vite
- Backend: FastAPI + Python
- Database: MySQL
