from beanie import Document, Link
from pydantic import EmailStr, Field, field_validator
from datetime import datetime
from typing import Optional, Dict, List
from enum import Enum

class CreditGrade(str, Enum):
    A_PLUS = "A+"
    A = "A"
    B_PLUS = "B+"
    B = "B"
    C = "C"
    D = "D"
    F = "F"

class CreditPillars(Document):
    """6-Pillar credit evaluation scores (each pillar 0-20 points, total 100)"""
    upi_behavior: int = Field(default=0, ge=0, le=20)
    bills: int = Field(default=0, ge=0, le=20)
    employment: int = Field(default=0, ge=0, le=20)
    social_stability: int = Field(default=0, ge=0, le=10)
    financial_health: int = Field(default=0, ge=0, le=20)
    identity_verification: int = Field(default=0, ge=0, le=10)

    class Settings:
        name = "credit_pillars"

class LoanRecommendation(Document):
    """Loan recommendation based on score"""
    loan_amount: int = Field(default=0, gt=0)
    interest_rate: float = Field(default=0, gt=0)
    term_months: int = Field(default=0, gt=0)
    monthly_emi: float = Field(default=0, gt=0)
    max_tenure_months: int = Field(default=60)

    class Settings:
        name = "loan_recommendations"

class CreditScore(Document):
    """Credit score and evaluation results"""
    user_id: str = Field(...)
    score: int = Field(default=300, ge=0, le=900)  # Allow 0-900 for backward compatibility
    grade: CreditGrade = Field(default=CreditGrade.F)
    pillars: Dict = Field(default_factory=dict)  # Changed from CreditPillars to Dict
    loan_recommendation: Optional[Dict] = None  # Changed from LoanRecommendation to Dict
    
    # Processing info
    evaluated_at: datetime = Field(default_factory=datetime.utcnow)
    processing_time_seconds: float = Field(default=0)
    
    # Privacy flags
    data_deleted: bool = Field(default=True)
    consent_given: bool = Field(default=True)
    
    @field_validator('score', mode='before')
    @classmethod
    def convert_old_score(cls, v):
        """Convert old 0-100 scores to new 300-900 CIBIL scale"""
        if isinstance(v, (int, float)):
            # If score is in old range (0-100), convert to new scale
            if 0 <= v <= 100:
                return int(300 + (v * 6))
            # If already in new range (300-900), return as-is
            elif 300 <= v <= 900:
                return int(v)
            # If out of range, clamp to valid range
            else:
                return max(300, min(900, int(v)))
        return v

    class Settings:
        name = "credit_scores"

class User(Document):
    """User profile and authentication"""
    firebase_uid: str = Field(..., unique=True, index=True)
    email: EmailStr = Field(..., unique=True, index=True)
    phone: Optional[str] = None
    full_name: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    
    # Address info
    current_address: Optional[str] = None
    permanent_address: Optional[str] = None
    
    # Worker info
    worker_type: Optional[str] = None  # gig_worker, self_employed, freelancer, micro_entrepreneur
    
    # Latest credit score
    latest_credit_score: Optional[Link[CreditScore]] = None
    score_history: List[Link[CreditScore]] = Field(default_factory=list)
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_evaluation: Optional[datetime] = None
    
    # Privacy & Consent
    data_deletion_consent: bool = Field(default=True)
    consent_timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"

    class Config:
        json_schema_extra = {
            "example": {
                "firebase_uid": "abc123xyz",
                "email": "worker@example.com",
                "phone": "+919876543210",
                "full_name": "Rajesh Kumar",
                "worker_type": "gig_worker",
            }
        }
