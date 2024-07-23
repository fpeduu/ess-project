from datetime import datetime
from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.room_service_meta import RoomServiceMeta
from src.schemas.room import RoomModel, RoomGet
from src.db.__init__ import database as db

class RoomService(RoomServiceMeta):

      @staticmethod
      def get_rooms(id: str) -> HttpResponseModel:
            """Get items method implementation"""
            rooms = db.get_items_by_field('rooms', 'id', id)
            if not rooms:
                  return HttpResponseModel(
                        message=HTTPResponses.ROOM_NOT_FOUND().message,
                        status_code=HTTPResponses.ROOM_NOT_FOUND().status_code,
                  )
            
            now = datetime.now()
            reservations = db.get_items_by_field('reservations', 'room_id', rooms[0].get('id'))
            if len(reservations) > 0:
                  for reservation in reservations:
                        start_time = reservation.get("start_time")
                        end_time = reservation.get("end_time")
                        date_format = "%d/%m/%Y %H:%M:%S"
                        dt_start_time = datetime.strptime(start_time, date_format)
                        dt_end_time = datetime.strptime(end_time, date_format)
                        if dt_start_time <= now <= dt_end_time:
                              rooms[0]["occupancy_status"] = True

                        

            return HttpResponseModel(
              message=HTTPResponses.ROOM_FOUND().message,
              status_code=HTTPResponses.ROOM_FOUND().status_code,
              data=rooms,
          )

      @staticmethod
      def get_all_rooms() -> HttpResponseModel:
            """Get all items method implementation"""
            rooms = db.get_all_items('rooms')
            if not rooms:
                  return HttpResponseModel(
                        message=HTTPResponses.ROOM_NOT_FOUND().message,
                        status_code=HTTPResponses.ROOM_NOT_FOUND().status_code,
                  )
            return HttpResponseModel(
                  message=HTTPResponses.ROOM_FOUND().message,
                  status_code=HTTPResponses.ROOM_FOUND().status_code,
                  data=rooms,
            )
      
      @staticmethod
      def create_room(name: str, status: str, capacity: int) -> HttpResponseModel:
            """Create item method implementation"""
            room_data = RoomModel(
                  name=name,
                  status=status,
                  capacity=capacity,
                  created_at= datetime.now().isoformat()
            )
            db.insert_item('rooms', room_data.dict())
            return HttpResponseModel(
                  message=HTTPResponses.ROOM_CREATED().message,
                  status_code=HTTPResponses.ROOM_CREATED().status_code,
            )
      
      @staticmethod
      def update_room_status(id: str, status: bool) -> HttpResponseModel:
            rooms = db.get_items_by_field('rooms','id', id)
            if not rooms:
                  return HttpResponseModel(
                        message=HTTPResponses.ROOM_NOT_FOUND().message,
                        status_code=HTTPResponses.ROOM_NOT_FOUND().status_code,
                  )

            db.update_item('rooms', id, {"status": status})
            return HttpResponseModel(
                  message=HTTPResponses.ROOM_CHANGE_STATUS().message,
                  status_code=HTTPResponses.ROOM_CHANGE_STATUS().status_code,
                  data=rooms,
                  )
      
      @staticmethod
      def delete_room(id: str) -> HttpResponseModel:
            rooms = db.get_items_by_field('rooms', 'id', id)
            if not rooms:
                  return HttpResponseModel(
                        message=HTTPResponses.ROOM_NOT_FOUND().message,
                        status_code=HTTPResponses.ROOM_NOT_FOUND().status_code,
                  )
            db.delete_item('rooms', id)
            return HttpResponseModel(
                  message=HTTPResponses.ROOM_DELETED().message,
                  status_code=HTTPResponses.ROOM_DELETED().status_code,
                  data=rooms,
            )
      
      @staticmethod
      def get_rooms_occupancy(user_id: str) -> HttpResponseModel:
            rooms = db.get_all_items('rooms')
            user = db.get_item_by_id('users', user_id)
            now = datetime.now()
            isAdmin = user.get("role", "").lower() in {"admin"}
            statuses = []

            for room in rooms:
                  alreadyAdded = False
                  reservations = db.get_items_by_field('reservations', 'room_id', room.get('id'))
                  if len(reservations) > 0:
                        for reservation in reservations:
                              start_time = reservation.get("start_time")
                              end_time = reservation.get("end_time")
                              date_format = "%d/%m/%Y %H:%M:%S"
                              dt_start_time = datetime.strptime(start_time, date_format)
                              dt_end_time = datetime.strptime(end_time, date_format)

                              if dt_start_time <= now <= dt_end_time:
                                    owner = db.get_item_by_id('users', reservation.get("user_id"))
                                    if owner.get("id") == user_id or isAdmin:
                                          owner_obj = {
                                                "name": owner.get('name'),
                                                "email": owner.get('email')
                                          }
                                    else:
                                          owner_obj = None
                                    status = {
                                          "room_id": room.get("id"),
                                          "occupancy_status": True,
                                          "owner": owner_obj
                                    }
                              else:
                                    status = {
                                          "room_id": room.get("id"),
                                          "occupancy_status": False,
                                          "owner": None
                                    }
                              
                              if not alreadyAdded:
                                    statuses.append(status)

                              alreadyAdded = True
                  
            return HttpResponseModel(
                  message=HTTPResponses.RESERVATION_FOUND().message,
                  status_code=HTTPResponses.RESERVATION_FOUND().status_code,
                  data=statuses,
            )
