from fastapi import APIRouter, HTTPException, status
from src.schemas.equipment import EquipmentModel, EquipmentGet
from src.service.impl.equipment_service import EquipmentService
from src.schemas.response import HttpResponseModel

router = APIRouter()

@router.post("/", response_model=EquipmentGet, status_code=status.HTTP_201_CREATED)
def create_equipment(equipment_data: EquipmentModel):
    if not equipment_data.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID is required")
    return EquipmentService.create_equipment(equipment_data)

@router.get("/", response_model=list[EquipmentGet])
def list_equipments():
    return EquipmentService.list_equipments()

@router.delete("/{equipment_id}", response_model=HttpResponseModel, status_code=status.HTTP_200_OK)
def delete_equipment(equipment_id: str) -> HttpResponseModel:
    try:
        EquipmentService.delete_equipment(equipment_id)
        return HttpResponseModel(
            message=f"Equipamento com ID {equipment_id} deletado com sucesso.",
            status_code=status.HTTP_200_OK,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Erro ao deletar equipamento: {str(e)}",
        )
    
@router.put("/{equipment_id}", response_model=EquipmentGet, status_code=status.HTTP_200_OK)
def update_equipment(equipment_id: str, equipment_data: EquipmentModel) -> EquipmentGet:
    try:
        updated_equipment = EquipmentService.update_equipment(equipment_id, equipment_data)
        return updated_equipment
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao atualizar equipamento: {str(e)}",
        )