
from abc import ABC, abstractmethod

from src.schemas.reservation import ReservationGet

class ReservationServiceMeta(ABC):

    @abstractmethod
    def get_reservation(self, item_id: str) -> ReservationGet:
        """Get item by id method definition"""
        pass