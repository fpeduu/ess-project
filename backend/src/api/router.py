from fastapi import APIRouter
from src.api import items
from src.api import reviews
from src.api import reservations
from src.api import room_equipment
from src.api import equipment
from src.api import users
from src.schemas.response import HttpResponseModel
from fastapi import status

api_router = APIRouter()
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(reservations.router, prefix="/reservations", tags=["reservations"])
api_router.include_router(room_equipment.router, prefix="/room_equipments", tags=["room_equipments"])
api_router.include_router(equipment.router, prefix="/equipment", tags=["equipment"])

@api_router.get(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Hello World",
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Hello World",
        }
    },
) 
def hello_world() -> HttpResponseModel:
    """
    Hello World.

    Returns:
    - A Hello World message.

    """
    return HttpResponseModel(
        message="Hello World",
        status_code=status.HTTP_200_OK,
    )