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
        reservations = db.get_all_items('reservations')
        return HttpResponseModel(
            message=HTTPResponses.RESERVATION_CREATED().message,
            status_code=HTTPResponses.RESERVATION_CREATED().status_code,
            data=reservations[-1],
    )
  
  @staticmethod
  def update_reservation(reservation_id: str, reservation: dict) -> HttpResponseModel:
        """Update item method implementation"""
        item = db.get_item_by_id('reservations', reservation_id)

        if not item:
            return HttpResponseModel(
                message=HTTPResponses.RESERVATION_NOT_FOUND().message,
                status_code=HTTPResponses.RESERVATION_NOT_FOUND().status_code,
            )

        db.update_item('reservations', reservation_id, reservation)

        reservations = db.get_all_items('reservations')
        return HttpResponseModel(
            message=HTTPResponses.RESERVATION_UPDATED().message,
            status_code=HTTPResponses.RESERVATION_UPDATED().status_code,
            data=reservations,
    )
