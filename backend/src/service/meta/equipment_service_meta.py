from abc import ABC, abstractmethod

from src.schemas.equipment import EquipmentGet

class EquipmentServiceMeta(ABC):

    @abstractmethod
    def get_equipment(self, item_id: str) -> EquipmentGet:
        """Get equipment by id method definition"""
        pass

    @abstractmethod
    def list_equipments(self) -> list[EquipmentGet]:
        """List all equipments method definition"""
        pass

    @abstractmethod
    def create_equipment(self, equipment_data: dict) -> EquipmentGet:
        """Create a new equipment method definition"""
        pass

    @abstractmethod
    def update_equipment(self, item_id: str, equipment_data: dict) -> EquipmentGet:
        """Update an existing equipment method definition"""
        pass

    @abstractmethod
    def delete_equipment(self, item_id: str) -> None:
        """Delete an equipment by id method definition"""
        pass