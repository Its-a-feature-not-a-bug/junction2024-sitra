from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests

router = APIRouter()
SITE_SECRET = os.getenv("SITE_SECRET")

class CaptchaResponse(BaseModel):
    captchaValue: str

def verify_recaptcha(captcha_value: str) -> bool:
    url = 'https://www.google.com/recaptcha/api/siteverify'
    data = {'secret': SITE_SECRET, 'response': captcha_value}
    response = requests.post(url, data=data)
    result = response.json()
    return result.get('success', False)

@router.post("/verify", tags=["captcha"])
async def verify(request: CaptchaResponse):
    captcha_value = request.captchaValue
    is_valid = verify_recaptcha(captcha_value)
    if is_valid:
        return {"success": True, "message": "reCAPTCHA validation succeeded!"}
    else:
        raise HTTPException(status_code=400, detail="reCAPTCHA validation failed")
