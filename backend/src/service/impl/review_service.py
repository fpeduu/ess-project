from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.review_service_meta import ReviewServiceMeta
from src.db.__init__ import database as db

class ReviewService(ReviewServiceMeta):
  
  @staticmethod
  def get_reviews(room_id: str) -> HttpResponseModel:
      """Get items method implementation"""
      reviews = db.get_items_by_field('reviews', 'room_id', room_id)
      if not reviews:
          return HttpResponseModel(
              message=HTTPResponses.REVIEW_NOT_FOUND().message,
              status_code=HTTPResponses.REVIEW_NOT_FOUND().status_code,
          )

      return HttpResponseModel(
              message=HTTPResponses.REVIEW_FOUND().message,
              status_code=HTTPResponses.REVIEW_FOUND().status_code,
              data=reviews,
          )

  @staticmethod
  def get_all_reviews() -> HttpResponseModel:
      """Get all items method implementation"""
      reviews = db.get_all_items('reviews')
      if not reviews:
          return HttpResponseModel(
              message=HTTPResponses.REVIEW_NOT_FOUND().message,
              status_code=HTTPResponses.REVIEW_NOT_FOUND().status_code,
          )

      return HttpResponseModel(
              message=HTTPResponses.REVIEW_FOUND().message,
              status_code=HTTPResponses.REVIEW_FOUND().status_code,
              data=reviews,
          )
  
  @staticmethod
  def create_review(review: dict) -> HttpResponseModel:
        """Create item method implementation"""
        db.insert_item('reviews', review)
        return HttpResponseModel(
            message=HTTPResponses.REVIEW_CREATED().message,
            status_code=HTTPResponses.REVIEW_CREATED().status_code,
    )