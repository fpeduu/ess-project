from abc import ABC, abstractmethod

from src.schemas.equipment import EquipmentGet

class EquipmentServiceMeta(ABC):

    @abstractmethod
    def list_equipments(self) -> list[EquipmentGet]:
        """List all equipments method definition"""
        pass

    @abstractmethod
    def create_equipment(self, equipment_data: dict) -> EquipmentGet:
        """Create a new equipment method definition"""
        pass

    @abstractmethod
    def delete_equipment(self, equipment_id: str) -> None:
        """Delete an existing equipment method definition"""
        pass