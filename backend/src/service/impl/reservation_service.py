from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.reservation_service_meta import ReservationServiceMeta
from src.db.__init__ import database as db
import datetime

class ReservationService(ReservationServiceMeta):
    @staticmethod
    def get_all_reservations() -> HttpResponseModel:
        """Get all items method implementation"""
        reservations = db.get_all_items('reservations')

        for reservation in reservations:
            user = db.get_item_by_id('users', reservation['user_id'])
            reservation['user'] = user

            room = db.get_item_by_id('rooms', reservation['room_id'])
            reservation['room'] = room

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
        reservation['created_at'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        db.insert_item('reservations', reservation)
        reservations = db.get_all_items('reservations')
        return HttpResponseModel(
            message=HTTPResponses.RESERVATION_CREATED().message,
            status_code=HTTPResponses.RESERVATION_CREATED().status_code,    
            data=reservations,
        )
    
    @staticmethod
    def remove_reservation(reservation_id: str)->HttpResponseModel:
        """Remove reservation method implementation"""
        remove = db.delete_item('reservations', reservation_id)
        if remove.deleted_count == 0:
            return HttpResponseModel(
                message=HTTPResponses.RESERVATION_NOT_FOUND().message,
                status_code=HTTPResponses.RESERVATION_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
            message=HTTPResponses.RESERVATION_REMOVED().message,
            status_code=HTTPResponses.RESERVATION_REMOVED().status_code,
        )

    @staticmethod
    def update_reservation(reservation_id: str, reservation: dict) -> HttpResponseModel:
        """Update item method implementation"""
        item = db.get_item_by_id('reservations', reservation_id)

        if not item:
            return HttpResponseModel(
                message=HTTPResponses.RESERVATION_NOT_FOUND().message,
                status_code=HTTPResponses.RESERVATION_NOT_FOUND().status_code,
                data=reservations[-1],   # essa linha estava deslocada no conflito, não tenho certeza se era para estar aqui
            )

        db.update_item('reservations', reservation_id, reservation)

        reservations = db.get_all_items('reservations')
        return HttpResponseModel(
            message=HTTPResponses.RESERVATION_UPDATED().message,
            status_code=HTTPResponses.RESERVATION_UPDATED().status_code,
            data=reservations,
    )

    @staticmethod
    def approve_reservation(reservation_id: str) -> HttpResponseModel:
        """Update status to approved method implementation"""
        update = db.update_item('reservations', reservation_id, {'status': 'approved'})
        if not update:
            return HttpResponseModel(
                message=HTTPResponses.RESERVATION_NOT_FOUND().message,
                status_code=HTTPResponses.RESERVATION_NOT_FOUND().status_code,
            )
        
        return HttpResponseModel(
            message=HTTPResponses.RESERVATION_APPROVED().message,
            status_code=HTTPResponses.RESERVATION_APPROVED().status_code,
        )
    
    @staticmethod
    def deny_reservation(reservation_id: str) -> HttpResponseModel:
        """Update status to denied method implementation"""
        update = db.update_item('reservations', reservation_id, {'status': 'denied'})
        if not update:
            return HttpResponseModel(
                message=HTTPResponses.RESERVATION_NOT_FOUND().message,
                status_code=HTTPResponses.RESERVATION_NOT_FOUND().status_code,
            )
        
        return HttpResponseModel(
            message=HTTPResponses.RESERVATION_DENIED().message,
            status_code=HTTPResponses.RESERVATION_DENIED().status_code,
        )