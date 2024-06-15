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
    def ITEM_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item not found",
            status_code=404,
        )

    @staticmethod
    def ITEM_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item found",
            status_code=200,
        )

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
        return HttpResponseModel(
            message="Review found",
            status_code=200,
        )
    
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
        return HttpResponseModel(
            message="Rating found",
            status_code=200,
        )
    
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
        return HttpResponseModel(
            message="Reservation found",
            status_code=200,
        )
    
    @staticmethod
    def RESERVATION_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reservation created",
            status_code=201,
        )
