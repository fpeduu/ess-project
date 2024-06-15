from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ReviewModel(BaseModel):
    user_id: str
    room_id: str
    rating: int
    comment: str

class ReviewGet(BaseModel):
    id: str
    user_id: str
    room_id: str
    rating: int
    comment: str
    created_at: Optional[datetime]

class ReviewList(BaseModel):
    reviews: list[ReviewGet]