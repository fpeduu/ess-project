from fastapi import APIRouter, status, HTTPException
from src.schemas.response import HttpResponseModel
from src.service.impl.user_service import UserService

router = APIRouter()

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Create a new user",
    tags=["users"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Successfully created a new user",
        }
    },
)
def create_user(user: dict) -> HttpResponseModel:
    """
    Create a user.

    Returns:
    - The created user.

    """
    user_create_response = UserService.create_user(user)
    return user_create_response

@router.put(
    "/{user_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Update user",
    tags=["users"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully update user",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "User not found",
        }
    },
)
def update_user(user_id: str, user: dict) -> HttpResponseModel:
    """
    Create a user.

    Returns:
    - The created user.

    """

    user_updated_response = UserService.update_user(user_id, user)
    return user_updated_response


@router.delete(
    "/{user_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Delete an existing user",
    tags=["users"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully deleted the user",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "User not found",
        }
    },
)
def delete_user(user_id: str) -> HttpResponseModel:
    """
    Delete an existing user.

    Parameters:
    - user_id: The ID of the user to delete.

    Returns:
    - Confirmation of user deletion.

    Raises:
    - HTTPException 404: If the user is not found.

    """
    user_delete_response = UserService.delete_user(user_id)
    if not user_delete_response:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user_delete_response