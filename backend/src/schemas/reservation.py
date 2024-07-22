from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ReservationCreate(BaseModel):
    room_id: str
    user_id: str
    status: str
    start_time: datetime
    end_time: datetime 
    activity: str
    teacher: str

class ReservationUpdate(BaseModel):
    start_time: Optional[datetime]
    end_time: Optional[datetime] 
    activity: Optional[str]
    teacher: Optional[str]

class ReservationGet(BaseModel):
    id: str
    room_id: str
    user_id: str
    status: str
    start_time: datetime
    end_time: datetime
    activity: str
    teacher: str
    created_at: Optional[datetime]

class ReservationList(BaseModel):
    reservations: list[ReservationGet]
