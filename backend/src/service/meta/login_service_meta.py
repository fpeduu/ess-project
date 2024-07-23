
from abc import ABC, abstractmethod

from src.schemas.user import UserGet

class LoginServiceMeta(ABC):

    @abstractmethod
    def login(self, user_email: str, password: str) -> UserGet:
        """Authenticate user by email and password"""
        pass
