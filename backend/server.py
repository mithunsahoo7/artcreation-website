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

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Art Creation API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: Optional[str] = ""
    email: str
    phone: Optional[str] = ""
    service: Optional[str] = ""
    city: Optional[str] = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class EnquiryCreate(BaseModel):
    name: str
    company: Optional[str] = ""
    email: str
    phone: Optional[str] = ""
    service: Optional[str] = ""
    city: Optional[str] = ""
    message: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Art Creation API", "status": "ok"}


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    if not input.name.strip() or not input.email.strip() or not input.message.strip():
        raise HTTPException(status_code=400, detail="Name, email and message are required.")

    enquiry = Enquiry(**input.model_dump())
    doc = enquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()

    await db.enquiries.insert_one(doc)
    return enquiry


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries():
    docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            try:
                d['created_at'] = datetime.fromisoformat(d['created_at'])
            except Exception:
                d['created_at'] = datetime.now(timezone.utc)
    return docs


@api_router.get("/stats")
async def get_stats():
    total = await db.enquiries.count_documents({})
    return {
        "projects_delivered": 1200,
        "retail_partners": 40,
        "cities_served": 28,
        "years_experience": 14,
        "enquiries_received": total,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
