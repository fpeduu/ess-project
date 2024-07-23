from abc import ABC, abstractmethod
from src.schemas.room import RoomGet, RoomReservation

class RoomServiceMeta(ABC):
      @abstractmethod
      def get_room(self, id: str) -> RoomGet:
            """Get item by id method definition"""
            pass

      @abstractmethod
      def get_rooms_occupancy(user_id: str) -> list[RoomReservation]:
            """Get item by id method definition"""
            pass