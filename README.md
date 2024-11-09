# Junction 2024 Sitra Project

## Setup Instructions

### Backend Setup

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
pip install -r src/Backend/requirements.txt
```

4. Run the backend server:
```bash
fastapi dev src/Backend/main.py
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

## Tech Stack
- Frontend: React + TypeScript + Vite
- Backend: FastAPI + Python
