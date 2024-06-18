from src.schemas.response import HttpResponseModel, HTTPResponses, HTTPException
from src.service.meta.equipment_service_meta import EquipmentServiceMeta
from src.db.__init__ import database as db
from src.schemas.equipment import EquipmentModel, EquipmentGet

class EquipmentService(EquipmentServiceMeta):

    @staticmethod
    def create_equipment(equipment_data: EquipmentModel) -> HttpResponseModel:
        """Create a new equipment method implementation"""
        db.insert_item('equipments', equipment_data.dict())
        return HttpResponseModel(
            message="Recurso adicionado com sucesso",
            status_code=200,
        )

    @staticmethod
    def get_equipment(item_id: str) -> EquipmentGet:
        """Get equipment by id method implementation"""
        equipment = db.get_item_by_id('equipments', item_id)
        if not equipment:
            raise HTTPException(status_code=404, detail="Equipamento não encontrado")
        return EquipmentGet(**equipment)

    @staticmethod
    def list_equipments() -> list[EquipmentGet]:
        """List all equipments method implementation"""
        equipments = db.get_all_items('equipments')
        return [EquipmentGet(**equipment) for equipment in equipments]

    @staticmethod
    def update_equipment(item_id: str, equipment_data: EquipmentModel) -> HttpResponseModel:
        """Update an existing equipment method implementation"""
        existing_equipment = db.get_item_by_id('equipments', item_id)
        if not existing_equipment:
            return HttpResponseModel(
                message=HTTPResponses.EQUIPMENT_NOT_FOUND().message,
                status_code=HTTPResponses.EQUIPMENT_NOT_FOUND().status_code,
            )
        
        updated_data = equipment_data.dict(exclude_unset=True) 
        db.update_item('equipments', item_id, updated_data)
        
        return HttpResponseModel(
            message="Recurso atualizado com sucesso",
            status_code=200,
        )

    @staticmethod
    def delete_equipment(item_id: str) -> HttpResponseModel:
        """Delete an equipment by id method implementation"""
        existing_equipment = db.get_item_by_id('equipments', item_id)
        if not existing_equipment:
            return HttpResponseModel(
                message=HTTPResponses.EQUIPMENT_NOT_FOUND().message,
                status_code=HTTPResponses.EQUIPMENT_NOT_FOUND().status_code,
            )
        
        db.delete_item('equipments', item_id)
        
        db.delete_items_by_field('room_equipment', 'equipment_id', item_id)
        
        return HttpResponseModel(
            message="Recurso removido com sucesso",
            status_code=200,
        )