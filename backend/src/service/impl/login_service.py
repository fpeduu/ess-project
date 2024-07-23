from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.login_service_meta import LoginServiceMeta
from src.db.__init__ import database as db
from typing import Dict
from datetime import datetime

class LoginService(LoginServiceMeta):

    @staticmethod
    def login(user_email: str, password: str) -> HttpResponseModel:
        """Authenticate user by email and password"""
        user = db.get_items_by_field('users', 'email', user_email)
        if not user or user[0]['password'] != password:
            return HttpResponseModel(
                message=HTTPResponses.USER_NOT_FOUND().message,
                status_code=HTTPResponses.USER_NOT_FOUND().status_code,
            )
        
        del(user[0]["password"])
        return HttpResponseModel(
                message=HTTPResponses.USER_FOUND().message,
                status_code=HTTPResponses.USER_FOUND().status_code,
                data=user,
            )
    