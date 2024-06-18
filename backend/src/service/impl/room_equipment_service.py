from src.schemas.response import HttpResponseModel, HTTPResponses
from src.service.meta.room_equipment_service_meta import RoomEquipmentServiceMeta
from src.db.__init__ import database as db
from src.schemas.room_equipment import RoomEquipmentModel, RoomEquipmentGet
from src.schemas.equipment import EquipmentGet
from datetime import datetime

class RoomEquipmentService(RoomEquipmentServiceMeta):

    @staticmethod
    def add_equipment_to_room(room_id: str, equipment_id: str, amount: int) -> HttpResponseModel:
        """Add equipment to a room method implementation"""
        existing_room_equipment = db.get_items_by_field('room_equipments', 'room_id', room_id)
        existing_room_equipment = [item for item in existing_room_equipment if item['equipment_id'] == equipment_id]

        if existing_room_equipment:
            # Atualiza a quantidade se já existir
            existing_amount = existing_room_equipment[0]['amount']
            new_amount = existing_amount + amount
            db.update_item('room_equipments', existing_room_equipment[0]['id'], {'amount': new_amount})
        else:
            # Se não, cria uma associação nova
            room_equipment_data = RoomEquipmentModel(
                room_id=room_id,
                equipment_id=equipment_id,
                amount=amount,
                created_at=datetime.now().isoformat()
            )
            db.insert_item('room_equipments', room_equipment_data.dict())

        return HttpResponseModel(
            message="Equipamento adicionado à sala com sucesso",
            status_code=200,
        )

    @staticmethod
    def update_room_equipment(room_id: str, equipment_id: str, amount: int) -> HttpResponseModel:
        """Update room equipment method implementation"""
        existing_room_equipment = db.get_items_by_field('room_equipments', 'room_id', room_id)
        existing_room_equipment = [item for item in existing_room_equipment if item['equipment_id'] == equipment_id]

        if not existing_room_equipment:
            return HttpResponseModel(
                message="Associação sala-equipamento não encontrada",
                status_code=404,
            )

        db.update_item('room_equipments', existing_room_equipment[0]['id'], {'amount': amount})

        return HttpResponseModel(
            message="Quantidade de equipamento na sala atualizada com sucesso",
            status_code=200,
        )

    @staticmethod
    def remove_equipment_from_room(room_id: str, equipment_id: str) -> HttpResponseModel:
        """Remove equipment from a room method implementation"""
        existing_room_equipment = db.get_items_by_field('room_equipments', 'room_id', room_id)
        existing_room_equipment = [item for item in existing_room_equipment if item['equipment_id'] == equipment_id]

        if not existing_room_equipment:
            return HttpResponseModel(
                message="Associação sala-equipamento não encontrada",
                status_code=404,
            )

        db.delete_item('room_equipments', existing_room_equipment[0]['id'])

        return HttpResponseModel(
            message="Equipamento removido da sala com sucesso",
            status_code=200,
        )

    @staticmethod
    def get_room_equipment(room_id: str) -> HttpResponseModel:
        """Get room equipment by room_id method implementation"""
        room_equipments = db.get_items_by_field('room_equipments', 'room_id', room_id)

        if not room_equipments:
            return HttpResponseModel(
                message="Nenhum equipamento encontrado para esta sala",
                status_code=404,
            )

        equipment_list = []
        for room_equipment in room_equipments:
            equipment = db.get_item_by_id('equipments', room_equipment['equipment_id'])
            if equipment:
                equipment_data = EquipmentGet(**equipment)
                room_equipment_data = RoomEquipmentGet(
                    id=room_equipment['id'],
                    room_id=room_equipment['room_id'],
                    equipment_id=room_equipment['equipment_id'],
                    amount=room_equipment['amount'],
                    created_at=room_equipment['created_at']
                )
                equipment_list.append({
                    "equipment": equipment_data,
                    "room_equipment": room_equipment_data
                })

        return HttpResponseModel(
            message="Equipamentos encontrados para esta sala",
            status_code=200,
            data={"room_equipments": equipment_list},
        )
