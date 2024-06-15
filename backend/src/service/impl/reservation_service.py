from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.reservation_service_meta import ReservationServiceMeta
from src.db.__init__ import database as db

class ReservationService(ReservationServiceMeta):
  
  @staticmethod
  def get_all_reservations() -> HttpResponseModel:
      """Get all items method implementation"""
      reservations = db.get_all_items('reservations')
      if not reservations:
          return HttpResponseModel(
              message=HTTPResponses.RESERVATION_NOT_FOUND().message,
              status_code=HTTPResponses.RESERVATION_NOT_FOUND().status_code,
          )

      return HttpResponseModel(
              message=HTTPResponses.RESERVATION_FOUND().message,
              status_code=HTTPResponses.RESERVATION_FOUND().status_code,
              data=reservations,
          )
  
  @staticmethod
  def create_reservation(reservation: dict) -> HttpResponseModel:
        """Create item method implementation"""
        db.insert_item('reservations', reservation)
        return HttpResponseModel(
            message=HTTPResponses.RESERVATION_CREATED().message,
            status_code=HTTPResponses.RESERVATION_CREATED().status_code,
    )