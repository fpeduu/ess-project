from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class UserModel(BaseModel):
    email: str
    password: str
    cpf: str
    name: str
    role: str

class UserGet(BaseModel):
    id: str
    name: str
    email: str
    role: str    
    created_at: Optional[datetime]
    deleted: Optional[bool] = None

class UserList(BaseModel):
    rooms: list[UserGet]