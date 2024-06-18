from abc import ABC, abstractmethod
from src.schemas.room import RoomGet

class RoomServiceMeta(ABC):
      @abstractmethod
      def get_room(self, id: str) -> RoomGet:
            """Get item by id method definition"""
            pass