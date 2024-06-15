from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class EquipmentModel(BaseModel):
    name: str
    description: str
    amount: int

class EquipmentGet(BaseModel):
    id: str
    name: str
    description: str
    amount: int
    created_at: Optional[datetime]  

class EquipmentList(BaseModel):
    equipments: list[EquipmentGet]