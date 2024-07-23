from fastapi import APIRouter, status, HTTPException
from src.schemas.response import HttpResponseModel
from src.service.impl.login_service import LoginService

router = APIRouter()

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Authenticate user",
    tags=["login"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Successfully created a new user",
        }
    },
)
def login(user: dict) -> HttpResponseModel:
    """
    Create a user.

    Returns:
    - The created user.

    """
    login_response = LoginService.login(user["email"], user["password"])
    return login_response