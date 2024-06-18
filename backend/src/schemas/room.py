from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class RoomModel(BaseModel):
    name: str
    status: bool = False
    occupancy: int

class RoomGet(BaseModel):
    id: str
    name: str
    status: bool
    occupancy: int
    created_at: Optional[datetime]

class RoomList(BaseModel):
    rooms: list[RoomGet]