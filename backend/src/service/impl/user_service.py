from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.user_service_meta import UserServiceMeta
from src.db.__init__ import database as db
from typing import Dict
from datetime import datetime

class UserService(UserServiceMeta):

    @staticmethod
    def get_user(user_id: str) -> HttpResponseModel:
        """Get user by id method implementation"""
        user = db.get_item_by_id('users', user_id)
        if not user:
            return HttpResponseModel(
                message=HTTPResponses.ITEM_NOT_FOUND().message,
                status_code=HTTPResponses.ITEM_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
                message=HTTPResponses.ITEM_FOUND().message,
                status_code=HTTPResponses.ITEM_FOUND().status_code,
                data=user,
            )
    
    @staticmethod
    def create_user(user: dict) -> HttpResponseModel:
        """Create user method implementation"""
        db.insert_item('users', user)

        users = db.get_all_items('users')

        return HttpResponseModel(
            message=HTTPResponses.USER_CREATED().message,
            status_code=HTTPResponses.USER_CREATED().status_code,
            data=users,
    )
        
     
    @staticmethod
    def update_user(user_id: str, user_data: dict) -> HttpResponseModel:
        """Update user by id method implementation"""
        existing_user = db.get_item_by_id('users', user_id)
        if not existing_user:
            return HttpResponseModel(
                message=HTTPResponses.USER_NOT_FOUND().message,
                status_code=HTTPResponses.USER_NOT_FOUND().status_code,
            )
        
        else:
            user_data["updated_at"] = str(datetime.now())
            updated_user = db.update_item('users', user_id, user_data)
            return HttpResponseModel(
                message=HTTPResponses.USER_UPDATED().message,
                status_code=HTTPResponses.USER_UPDATED().status_code,
                data=updated_user,
            )
        
    @staticmethod
    def delete_user(user_id: str) -> HttpResponseModel:
        """Delete user by id method implementation"""
        existing_user = db.get_item_by_id('users', user_id)
        if not existing_user:
            return HttpResponseModel(
                message=HTTPResponses.USER_NOT_FOUND().message,
                status_code=HTTPResponses.USER_NOT_FOUND().status_code,
            )

        success = db.delete_item('users', user_id)
        if success:
            return HttpResponseModel(
                message=HTTPResponses.USER_DELETED().message,
                status_code=HTTPResponses.USER_DELETED().status_code,
            )
        else:
            return HttpResponseModel(
                message=HTTPResponses.USER_NOT_FOUND().message,
                status_code=HTTPResponses.USER_NOT_FOUND().status_code
            )   