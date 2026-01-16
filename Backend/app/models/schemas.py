"""
Pydantic request/response schemas
"""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class PersonalInfoSchema(BaseModel):
    """Personal information schema"""
    name: str
    age: int
    gender: Optional[str] = None
    phone: str
    email: Optional[str] = None


class DocumentUploadSchema(BaseModel):
    """Document upload schema"""
    user_id: str
    document_type: str  # identity, bank_statement, utility_bill, gig_screenshot
    file_name: str
    file_size: int
    mime_type: str


class EvaluationRequestSchema(BaseModel):
    """Evaluation request schema"""
    user_id: str
    personal_info: PersonalInfoSchema
    documents: dict = Field(default_factory=dict)


class PillarScoreSchema(BaseModel):
    """Pillar score schema"""
    pillar_name: str
    score: float
    weight: float
    status: str
    contributing_factors: List[str]


class CreditScoreSchema(BaseModel):
    """Credit score schema"""
    user_id: str
    evaluation_id: str
    total_score: float
    grade: str
    percentile: float
    pillars: List[PillarScoreSchema]
    created_at: datetime
    
    class Config:
        from_attributes = True


class ErrorSchema(BaseModel):
    """Error response schema"""
    detail: str
    code: str
    timestamp: datetime
