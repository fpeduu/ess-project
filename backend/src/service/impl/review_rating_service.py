from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.review_rating_service_meta import ReviewRatingServiceMeta
from src.db.__init__ import database as db

class ReviewRatingService(ReviewRatingServiceMeta):
  
  @staticmethod
  def get_ratings(review_id: str) -> HttpResponseModel:
    """Get items method implementation"""
    reviews = db.get_items_by_field('review_ratings', 'review_id', review_id)
    if not reviews:
        return HttpResponseModel(
            message=HTTPResponses.RATING_NOT_FOUND().message,
            status_code=HTTPResponses.RATING_NOT_FOUND().status_code,
        )

    return HttpResponseModel(
            message=HTTPResponses.RATING_FOUND().message,
            status_code=HTTPResponses.RATING_FOUND().status_code,
            data=reviews,
        )

  @staticmethod
  def create_rating(rating: dict) -> HttpResponseModel:
        """Create item method implementation"""
        db.insert_item('review_ratings', rating)

        return HttpResponseModel(
            message=HTTPResponses.RATING_CREATED().message,
            status_code=HTTPResponses.RATING_CREATED().status_code,
    )