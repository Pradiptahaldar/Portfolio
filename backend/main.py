from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import resend
import os

load_dotenv()
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
if not RESEND_API_KEY:
    raise RuntimeError("RESEND_API_KEY is not configured.")

resend.api_key = RESEND_API_KEY

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ContactMessage(BaseModel):
    name: str
    email: str
    project: str = ""
    message: str
@app.get("/")
def home():
    return {
        "message": "Portfolio backend is running"
    }

@app.post("/contact")
def contact(message: ContactMessage):
    try:
        resend.Emails.send({
            "from": "Portfolio <onboarding@resend.dev>",
            "to": ["pradiptahaldar938@gmail.com"],
            "reply_to": message.email,
            "subject": f"New Portfolio Contact — {message.project or 'General Inquiry'}",
            "text": (
                f"Name: {message.name}\n"
                f"Email: {message.email}\n"
                f"Project: {message.project or 'Not specified'}\n\n"
                f"Message:\n{message.message}"
            ),
        })
        return {
            "success": True,
            "message": "Message sent successfully"
        }
    except Exception as error:
        print(f"Email sending failed: {error}")

        raise HTTPException(
            status_code=500,
            detail="Unable to send message. Please try again later."
        )