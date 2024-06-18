from fastapi import APIRouter, status
from src.schemas.response import HttpResponseModel
from src.service.impl.reservation_service import ReservationService

router = APIRouter()

@router.get(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve all reservations",
    tags=["reservations"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got all reservations",
        }
    },
)
def get_all_reservations() -> HttpResponseModel:
    """
    Get all reservations.

    Returns:
    - All reservations.

    """
    reservation_get_all_response = ReservationService.get_all_reservations()
    return reservation_get_all_response

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Create a new reservation",
    tags=["reservations"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Successfully created a new reservation",
        }
    },
)
def create_reservation(reservation: dict) -> HttpResponseModel:
    """
    Create a reservation.

    Parameters:
    - reservation: The reservation to create.

    Returns:
    - The created reservation.

    """
    reservation_create_response = ReservationService.create_reservation(reservation)
    return reservation_create_response

@router.put(
    "/{reservation_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Update a reservation",
    tags=["reservations"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully updated a reservation",
        }
    },
)
def update_reservation(reservation_id: str, reservation: dict) -> HttpResponseModel:
    """
    Update a reservation.

    Parameters:
    - reservation_id: The ID of the reservation to update.
    - reservation: The updated reservation.

    Returns:
    - The updated reservation.

    """
    reservation_update_response = ReservationService.update_reservation(reservation_id, reservation)
    return reservation_update_response
