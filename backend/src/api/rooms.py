from fastapi import APIRouter, status
from src.schemas.response import HttpResponseModel
from src.service.impl.room_service import RoomService


router = APIRouter()

@router.get(
      "/",
      response_model=HttpResponseModel,
      status_code=status.HTTP_200_OK,
      description="Retrieve all rooms",
      tags=["rooms"],
      responses={
            status.HTTP_200_OK: {
                  "model": HttpResponseModel,
                  "description": "Successfully got all rooms",
            }
      },
)

def get_all_rooms() -> HttpResponseModel:
      """
            Get all rooms.

            RETURNS:
            - All rooms
      """

      room_get_all_response = RoomService.get_all_rooms()
      return room_get_all_response


@router.get(
      "/{id}",
      response_model=HttpResponseModel,
      status_code=status.HTTP_200_OK,
      description="Show information of a room by its ID",
      tags=['rooms'],
      responses= {
            status.HTTP_200_OK: {
                  "model": HttpResponseModel,
                  "description": "Successfully got item by ID",
            },
            status.HTTP_404_NOT_FOUND: {
                  "description": "Item not found",
            }
      },
)

def get_rooms(id: str) -> HttpResponseModel:
      """
            Get room information by its ID

            Parameters:
            - room_id: the ID of the room to retrieve informatiom from

            Returns:
            - the information from the specified room

            Raises:
            - HTTPException 404: if the room is not found.

      """

      room_get_response = RoomService.get_rooms(id)
      return room_get_response


@router.post(
      "/",
      response_model=HttpResponseModel,
      status_code=status.HTTP_201_CREATED,
      description="Create a new room",
      tags=["rooms"],
      responses= {
            status.HTTP_201_CREATED : {
                  "model": HttpResponseModel,
                  "description": "Successfully created a new room",
            }
      },
)

def create_room(room: dict) -> HttpResponseModel:
      """
            Create a room.

            Parameters: 
            - room: the room to create

            Returns:
            - the created room
      """
      room_create_response = RoomService.create_room(room)
      return room_create_response

@router.put(
      "/{id}",
      response_model=HttpResponseModel,
      status_code=status.HTTP_200_OK,
      description="Update room status",
      tags=["rooms"],
      responses= {
            status.HTTP_200_OK: {
                  "model": HttpResponseModel,
                  "description": "Successfully updated room status",
            }
      },
)

def update_room_status(id: str, status: bool) -> HttpResponseModel:
      """
            Update a room status.

            Parameters: 
            - id: room id
            - status: 1 if available, 0 otherwise

            Returns:
            - the new room status
      """
      room_update_response = RoomService.update_room_status(id, status)
      return room_update_response

@router.delete(
      "/{id}",
      response_model=HttpResponseModel,
      status_code=status.HTTP_200_OK,
      description="Delete a room",
      tags=["rooms"],
      responses= {
            status.HTTP_200_OK: {
                  "model": HttpResponseModel,
                  "description": "Successfully deleted room",
                  }
            },
)

def delete_room(id: str) -> HttpResponseModel:
      """
            Delete a room

            Parameters: 
            - id: room id

            Returns:
            - the deletion status

      """
      room_delete_response = RoomService.delete_room(id)
      return room_delete_response