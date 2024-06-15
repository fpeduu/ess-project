from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ReservationModel(BaseModel):
    room_id: str
    user_id: str
    start_time: datetime
    end_time: datetime

class ReservationGet(BaseModel):
    id: str
    room_id: str
    user_id: str
    start_time: datetime
    end_time: datetime
    created_at: Optional[datetime]

class ReservationList(BaseModel):
    reservations: list[ReservationGet]