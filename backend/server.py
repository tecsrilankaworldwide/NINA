from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="TecaiKids API", description="Educational Platform for Sri Lankan Children")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class ProgramType(str, Enum):
    LITTLE_LEARNERS = "little_learners"
    YOUNG_EXPLORERS = "young_explorers"
    SMART_KIDS = "smart_kids"
    TECH_TEENS = "tech_teens"
    FUTURE_LEADERS = "future_leaders"

class PaymentPlan(str, Enum):
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"

class PaymentMethod(str, Enum):
    CARD = "card"
    BANK_TRANSFER = "bank_transfer"
    EZ_CASH = "ez_cash"

# Data Models
class Program(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    age_range: str
    description: str
    monthly_price: int
    quarterly_price: int
    features: List[str]
    program_type: ProgramType

class EnrollmentCreate(BaseModel):
    student_full_name: str
    parent_guardian_name: str
    email: EmailStr
    phone: str
    address: str
    program_type: ProgramType
    payment_plan: PaymentPlan
    payment_method: PaymentMethod

class Enrollment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_full_name: str
    parent_guardian_name: str
    email: EmailStr
    phone: str
    address: str
    program_type: ProgramType
    payment_plan: PaymentPlan
    payment_method: PaymentMethod
    amount: int
    enrollment_date: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"

class ConsultationRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    child_age_group: ProgramType
    learning_goals: str
    request_date: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"

class ConsultationCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    child_age_group: ProgramType
    learning_goals: str

# Program data
PROGRAMS_DATA = [
    {
        "name": "Little Learners Foundation",
        "age_range": "Ages 4-6",
        "description": "Foundation Excellence",
        "monthly_price": 800,
        "quarterly_price": 2800,
        "program_type": ProgramType.LITTLE_LEARNERS,
        "features": [
            "Advanced Number & Letter Mastery",
            "Interactive Color & Shape Theory",
            "Foundation Logical Thinking",
            "Gamified Learning Adventures",
            "Expert Parent Coaching",
            "Premium Physical Workbooks",
            "Progress Analytics Dashboard"
        ]
    },
    {
        "name": "Young Explorers Discovery",
        "age_range": "Ages 7-9",
        "description": "Discovery Excellence",
        "monthly_price": 1200,
        "quarterly_price": 4200,
        "program_type": ProgramType.YOUNG_EXPLORERS,
        "features": [
            "Advanced Mathematics & Statistics",
            "Virtual Science Laboratory",
            "Critical Reading & Analysis",
            "Intermediate Logical Thinking",
            "Digital Art & Design",
            "AI-Powered Progress Tracking",
            "Peer Learning Networks"
        ]
    },
    {
        "name": "Smart Kids Mastery",
        "age_range": "Ages 10-12",
        "description": "Mastery Excellence",
        "monthly_price": 1500,
        "quarterly_price": 5250,
        "program_type": ProgramType.SMART_KIDS,
        "features": [
            "Higher Mathematics & Calculus Prep",
            "Professional Coding Fundamentals",
            "Real-World STEM Projects",
            "Advanced Logical Reasoning",
            "Algorithmic Thinking Mastery",
            "Critical Problem-Solving",
            "Mentor-Guided Learning"
        ]
    },
    {
        "name": "Tech Teens Professional",
        "age_range": "Ages 13-15",
        "description": "Professional Excellence",
        "monthly_price": 2000,
        "quarterly_price": 7000,
        "program_type": ProgramType.TECH_TEENS,
        "features": [
            "Professional Programming Languages",
            "Full-Stack Web Development",
            "Mobile App Development",
            "Advanced Algorithmic Design",
            "Industry-Level Projects",
            "Tech Career Preparation",
            "1-on-1 Industry Mentorship"
        ]
    },
    {
        "name": "Future Leaders Mastery",
        "age_range": "Ages 16-18",
        "description": "Leadership Excellence",
        "monthly_price": 2500,
        "quarterly_price": 8750,
        "program_type": ProgramType.FUTURE_LEADERS,
        "features": [
            "AI & Machine Learning Mastery",
            "Enterprise App Development",
            "Advanced Data Science",
            "Complex Algorithmic Systems",
            "Leadership & Entrepreneurship",
            "Global Career Preparation",
            "Executive Mentorship Program"
        ]
    }
]

# API Endpoints
@api_router.get("/")
async def root():
    return {"message": "TecaiKids API - Empowering Future Leaders"}

@api_router.get("/programs", response_model=List[Program])
async def get_programs():
    """Get all available programs"""
    programs = []
    for program_data in PROGRAMS_DATA:
        program = Program(**program_data)
        programs.append(program)
    return programs

@api_router.get("/programs/{program_type}", response_model=Program)
async def get_program(program_type: ProgramType):
    """Get a specific program by type"""
    for program_data in PROGRAMS_DATA:
        if program_data["program_type"] == program_type:
            return Program(**program_data)
    raise HTTPException(status_code=404, detail="Program not found")

@api_router.post("/enrollment", response_model=Enrollment)
async def create_enrollment(enrollment_data: EnrollmentCreate):
    """Create a new enrollment"""
    # Get program details for pricing
    program = None
    for program_data in PROGRAMS_DATA:
        if program_data["program_type"] == enrollment_data.program_type:
            program = program_data
            break
    
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    # Calculate amount based on payment plan
    amount = program["quarterly_price"] if enrollment_data.payment_plan == PaymentPlan.QUARTERLY else program["monthly_price"]
    
    # Create enrollment object
    enrollment = Enrollment(
        **enrollment_data.dict(),
        amount=amount
    )
    
    # Save to database
    await db.enrollments.insert_one(enrollment.dict())
    
    return enrollment

@api_router.get("/enrollments", response_model=List[Enrollment])
async def get_enrollments():
    """Get all enrollments"""
    enrollments = await db.enrollments.find().to_list(1000)
    return [Enrollment(**enrollment) for enrollment in enrollments]

@api_router.post("/consultation", response_model=ConsultationRequest)
async def create_consultation_request(consultation_data: ConsultationCreate):
    """Create a new consultation request"""
    consultation = ConsultationRequest(**consultation_data.dict())
    
    # Save to database
    await db.consultations.insert_one(consultation.dict())
    
    return consultation

@api_router.get("/consultations", response_model=List[ConsultationRequest])
async def get_consultation_requests():
    """Get all consultation requests"""
    consultations = await db.consultations.find().to_list(1000)
    return [ConsultationRequest(**consultation) for consultation in consultations]

@api_router.get("/stats")
async def get_platform_stats():
    """Get platform statistics"""
    total_enrollments = await db.enrollments.count_documents({})
    total_consultations = await db.consultations.count_documents({})
    
    return {
        "total_students": 10000 + total_enrollments,  # Base number + actual enrollments
        "success_rate": "99%",
        "expert_educators": 25,
        "support_hours": "24/7",
        "total_enrollments": total_enrollments,
        "total_consultations": total_consultations
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("TecaiKids API starting up...")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("TecaiKids API shutting down...")
