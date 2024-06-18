from fastapi import APIRouter, status
from src.schemas.response import HttpResponseModel
from src.service.impl.room_equipment_service import RoomEquipmentService
from src.schemas.room_equipment import RoomEquipmentModel

router = APIRouter()

@router.get(
    "/{room_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve all equipment in a room",
    tags=["room_equipments"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got all equipment in the room",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "No equipment found for this room",
        }
    },
)
def get_room_equipment(room_id: str) -> HttpResponseModel:
    """
    Get all equipment in a room.

    Parameters:
    - room_id: The ID of the room.

    Returns:
    - All equipment in the room.
    """
    return RoomEquipmentService.get_room_equipment(room_id)

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Add equipment to a room",
    tags=["room_equipments"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Successfully added equipment to the room",
        },
    },
)
def add_equipment_to_room(room_equipment: RoomEquipmentModel) -> HttpResponseModel:
    """
    Add equipment to a room.

    Parameters:
    - room_equipment: The equipment and room association data.

    Returns:
    - The response indicating the addition was successful.
    """
    return RoomEquipmentService.add_equipment_to_room(
        room_equipment.room_id, room_equipment.equipment_id, room_equipment.amount
    )

@router.put(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Update equipment amount in a room",
    tags=["room_equipments"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully updated equipment amount in the room",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Room-equipment association not found",
        }
    },
)
def update_room_equipment(room_equipment: RoomEquipmentModel) -> HttpResponseModel:
    """
    Update equipment amount in a room.

    Parameters:
    - room_equipment: The equipment and room association data to update.

    Returns:
    - The response indicating the update was successful.
    """
    return RoomEquipmentService.update_room_equipment(
        room_equipment.room_id, room_equipment.equipment_id, room_equipment.amount
    )

@router.delete(
    "/{room_id}/{equipment_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Remove equipment from a room",
    tags=["room_equipments"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully removed equipment from the room",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Room-equipment association not found",
        }
    },
)
def remove_equipment_from_room(room_id: str, equipment_id: str) -> HttpResponseModel:
    """
    Remove equipment from a room.

    Parameters:
    - room_id: The ID of the room.
    - equipment_id: The ID of the equipment.

    Returns:
    - The response indicating the removal was successful.
    """
    return RoomEquipmentService.remove_equipment_from_room(room_id, equipment_id)
