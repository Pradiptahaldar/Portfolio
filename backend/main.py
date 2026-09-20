from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
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
    print("New contact message:")
    print(f"Name: {message.name}")
    print(f"Email: {message.email}")
    print(f"Project: {message.project}")
    print(f"Message: {message.message}")

    return {
        "success": True,
        "message": "Message received successfully"
    }