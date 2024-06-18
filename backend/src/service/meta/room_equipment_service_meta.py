from abc import ABC, abstractmethod

from src.schemas.equipment import EquipmentGet
from src.schemas.room_equipment import RoomEquipmentGet

class RoomEquipmentServiceMeta(ABC):

    @abstractmethod
    def get_room_equipment(self, item_id: str) -> RoomEquipmentGet:
        """Get room equipment by id method definition"""
        pass

    @abstractmethod
    def list_room_equipments(self) -> list[RoomEquipmentGet]:
        """List all room equipments method definition"""
        pass

    @abstractmethod
    def create_room_equipment(self, room_equipment_data: dict) -> RoomEquipmentGet:
        """Create a new room equipment method definition"""
        pass

    @abstractmethod
    def update_room_equipment(self, item_id: str, room_equipment_data: dict) -> RoomEquipmentGet:
        """Update an existing room equipment method definition"""
        pass

    @abstractmethod
    def delete_room_equipment(self, item_id: str) -> None:
        """Delete a room equipment by id method definition"""
        pass
