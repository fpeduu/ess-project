from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class RoomEquipmentModel(BaseModel):
    room_id: str
    equipment_id: str
    amount: int

class RoomEquipmentGet(BaseModel):
    id: str
    room_id: str
    equipment_id: str
    amount: int
    created_at: Optional[datetime]

class RoomEquipmentList(BaseModel):
    room_equipments: list[RoomEquipmentGet]