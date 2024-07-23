from fastapi import HTTPException  # Adicione esta importação
from typing import Optional
from pydantic import BaseModel

class HttpResponseModel(BaseModel):
    message: str
    status_code: int
    data: Optional[dict] | Optional[list] = None

class HTTPResponses:

    """
    This class contains the basic HTTP responses for the API
    """

    @staticmethod
    def DATA_FOUND(item_name: str) -> HttpResponseModel:
        return HttpResponseModel(
            message=f"{item_name} found",
            status_code=200,
        )

    @staticmethod
    def ITEM_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item not found",
            status_code=404,
        )

    @staticmethod
    def ITEM_FOUND() -> HttpResponseModel:
        return HTTPResponses.DATA_FOUND("Item")

    @staticmethod
    def ITEM_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item created",
            status_code=201,
        )

    @staticmethod
    def SERVER_ERROR() -> HttpResponseModel:
        return HttpResponseModel(
            message="Server error",
            status_code=500,
        )

    @staticmethod
    def REVIEW_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Review not found",
            status_code=404,
        )
    
    @staticmethod
    def REVIEW_FOUND() -> HttpResponseModel:
        return HTTPResponses.DATA_FOUND("Review")

    
    @staticmethod
    def REVIEW_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Review created",
            status_code=201,
        )
    
    @staticmethod
    def RATING_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Rating not found",
            status_code=404,
        )
    
    @staticmethod
    def RATING_FOUND() -> HttpResponseModel:
        return HTTPResponses.DATA_FOUND("Rating")

    
    @staticmethod
    def RATING_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Rating created",
            status_code=201,
        )
    
    @staticmethod
    def RESERVATION_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reservation not found",
            status_code=404,
        )
    
    @staticmethod
    def RESERVATION_FOUND() -> HttpResponseModel:
        return HTTPResponses.DATA_FOUND("Reservation")

    
    @staticmethod
    def RESERVATION_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reservation created",
            status_code=201,
        )
    
    @staticmethod
    def RESERVATION_REMOVED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reservation removed",
            status_code=200
        )

    @staticmethod
    def ROOM_FOUND() -> HttpResponseModel:
        return HTTPResponses.DATA_FOUND("Room")

    def RESERVATION_UPDATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reservation updated",
            status_code=200,
        )

    @staticmethod
    def ROOM_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Room not found",
            status_code=404,
        )

    @staticmethod
    def ROOM_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Room created",
            status_code=201,
        )

    @staticmethod
    def ROOM_CHANGE_STATUS() -> HttpResponseModel:
        return HttpResponseModel(
            message="Room status changed",
            status_code=200,
        )

    @staticmethod
    def USER_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="user created",
            status_code=201,
        )


    @staticmethod
    def USER_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="User not found",
            status_code=404,
        )

    @staticmethod
    def USER_FOUND() -> HttpResponseModel:
        return HTTPResponses.DATA_FOUND("User")


    @staticmethod
    def ROOM_DELETED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Room deleted",
            status_code=200,
        )

    @staticmethod
    def USER_UPDATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="User updated",
            status_code=200,
        )

    @staticmethod
    def USER_DELETED() -> HttpResponseModel:
        return HttpResponseModel(
            message="User deleted",
            status_code=200,
        )

    @staticmethod
    def EQUIPMENT_FOUND() -> HttpResponseModel:
        return HTTPResponses.DATA_FOUND("Equipment")


    @staticmethod
    def EQUIPMENT_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Equipment not Found",
            status_code=404
        )

    @staticmethod
    def EQUIPMENT_DELETED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Equipamento excluído",
            status_code=200,
        )

    @staticmethod
    def RESERVATION_APPROVED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reservation approved",
            status_code=201,
        )

    @staticmethod
    def RESERVATION_DENIED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reservation denied",
            status_code=201,
        )