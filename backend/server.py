from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ==================== Models ====================

class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterSubscriberCreate(BaseModel):
    email: EmailStr

class NewsletterSubscriberResponse(BaseModel):
    id: str
    email: str
    subscribed_at: str
    message: str

class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None
    request_type: str = "video_audit"  # video_audit, consultation, general
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None
    request_type: str = "video_audit"

class ContactRequestResponse(BaseModel):
    id: str
    name: str
    email: str
    company: Optional[str]
    message: Optional[str]
    request_type: str
    created_at: str
    success_message: str


# ==================== Routes ====================

@api_router.get("/")
async def root():
    return {"message": "Clarity Labs API", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "clarity-labs-api"}


# Newsletter Subscription
@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscriberResponse)
async def subscribe_newsletter(input: NewsletterSubscriberCreate):
    # Check if email already exists
    existing = await db.newsletter_subscribers.find_one({"email": input.email}, {"_id": 0})
    if existing:
        return NewsletterSubscriberResponse(
            id=existing["id"],
            email=existing["email"],
            subscribed_at=existing["subscribed_at"],
            message="You're already subscribed! Thanks for your interest."
        )
    
    subscriber = NewsletterSubscriber(email=input.email)
    doc = subscriber.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter_subscribers.insert_one(doc)
    logger.info(f"New newsletter subscriber: {input.email}")
    
    return NewsletterSubscriberResponse(
        id=subscriber.id,
        email=subscriber.email,
        subscribed_at=doc['subscribed_at'],
        message="Successfully subscribed! You'll receive weekly breakdowns on what makes SaaS videos convert."
    )

@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscriberResponse])
async def get_newsletter_subscribers():
    subscribers = await db.newsletter_subscribers.find({}, {"_id": 0}).to_list(1000)
    return [
        NewsletterSubscriberResponse(
            id=s["id"],
            email=s["email"],
            subscribed_at=s["subscribed_at"],
            message=""
        ) for s in subscribers
    ]


# Contact Requests (Video Audit / Book a Call)
@api_router.post("/contact", response_model=ContactRequestResponse)
async def create_contact_request(input: ContactRequestCreate):
    contact = ContactRequest(
        name=input.name,
        email=input.email,
        company=input.company,
        message=input.message,
        request_type=input.request_type
    )
    
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_requests.insert_one(doc)
    logger.info(f"New contact request from {input.email} - Type: {input.request_type}")
    
    success_messages = {
        "video_audit": "Thanks for requesting a video audit! We'll review your current videos and reach out within 24 hours.",
        "consultation": "Your consultation request has been received. We'll be in touch shortly to schedule your call.",
        "general": "Thanks for reaching out! We'll get back to you as soon as possible."
    }
    
    return ContactRequestResponse(
        id=contact.id,
        name=contact.name,
        email=contact.email,
        company=contact.company,
        message=contact.message,
        request_type=contact.request_type,
        created_at=doc['created_at'],
        success_message=success_messages.get(input.request_type, success_messages["general"])
    )

@api_router.get("/contact/requests", response_model=List[ContactRequestResponse])
async def get_contact_requests():
    requests = await db.contact_requests.find({}, {"_id": 0}).to_list(1000)
    return [
        ContactRequestResponse(
            id=r["id"],
            name=r["name"],
            email=r["email"],
            company=r.get("company"),
            message=r.get("message"),
            request_type=r["request_type"],
            created_at=r["created_at"],
            success_message=""
        ) for r in requests
    ]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
