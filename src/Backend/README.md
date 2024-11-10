## How to run

Create a virtual environment:
```python3 -m venv venv```

Activate the virtual environment:
```source venv/bin/activate```

Install the dependencies:
```pip install -r requirements.txt```

Run the server:
```fastapi dev main.py```

###  .env file inside of src/Backend should look like:
```
DATABASE_URL=mysql+asyncmy://username:password@url:port/database
SITE_SECRET={recaptcha_site_secret}
OPENAI_API_KEY={openai_api_key}
JWT_SECRET={jwt_secret}
```
