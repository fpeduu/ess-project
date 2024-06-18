def room_equipment_entity(room_equipment) -> dict:
    """
    Returns a dict of the room equipment entity
    """
    return {
        "id": room_equipment["id"],
        "room_id": room_equipment["room_id"],
        "equipment_id": room_equipment["equipment_id"],
        "amount": room_equipment["amount"],
        "created_at": room_equipment.get("created_at")
    }

def room_equipment_response_entity(room_equipment) -> dict:
    """
    Returns a dict of the room equipment response entity
    """
    return {
        "id": room_equipment["id"],
        "room_id": room_equipment["room_id"],
        "equipment_id": room_equipment["equipment_id"],
        "amount": room_equipment["amount"],
        "created_at": room_equipment.get("created_at")
    }

def room_equipment_list_entity(room_equipments) -> list:
    """
    Returns a list of the room equipment entity
    """
    return [room_equipment_entity(room_equipment) for room_equipment in room_equipments]
