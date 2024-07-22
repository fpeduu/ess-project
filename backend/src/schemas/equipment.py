from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EquipmentModel(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    amount: int
    created_at: Optional[datetime] = None

class EquipmentGet(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    amount: int
    created_at: Optional[datetime] = None

class EquipmentList(BaseModel):
    equipments: list[EquipmentGet]