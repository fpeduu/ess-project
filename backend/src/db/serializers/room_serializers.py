def room_entity(room) -> dict:
      """
            Returns a dict of the room entity
      """
      return {
            "id": room["id"],
            "name": room["name"],
            "status": room["status"],
            "occupancy": room["occupancy"],
            "created_at": room.get("created_at")
      }

def room_response_entity(room) -> dict:
      """
            Returns a dict of the room response entity
      """
      return {
            "id": room["id"],
            "name": room["name"],
            "status": room["status"],
            "occupancy": room["occupancy"],
            "created_at": room.get("created_at")
      }

def room_list_entity(rooms) -> list:
      """
      Returns a list of the room entity
      """
      return [room_entity(room) for room in rooms]