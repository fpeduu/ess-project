from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class RoomModel(BaseModel):
    name: str
    status: str
    capacity: int

class RoomGet(BaseModel):
    id: str
    name: str
    status: str
    capacity: int
    created_at: Optional[datetime]

class RoomList(BaseModel):
    rooms: list[RoomGet]