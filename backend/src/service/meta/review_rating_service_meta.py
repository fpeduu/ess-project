
from abc import ABC, abstractmethod

from src.schemas.review_rating import ReviewRatingGet

class ReviewRatingServiceMeta(ABC):

    @abstractmethod
    def get_review(self, item_id: str) -> ReviewRatingGet:
        """Get item by id method definition"""
        pass