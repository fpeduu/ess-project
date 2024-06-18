def reservation_entity(reservation) -> dict:
    """
    Returns a dict of the reservation entity
    """
    return {
        "id": reservation["id"],
        "room_id": reservation["room_id"],
        "user_id": reservation["user_id"],
        "status": reservation["status"],
        "start_date": reservation["start_date"],
        "end_date": reservation["end_date"],
        "activity": reservation["activiy"],
        "teacher": reservation["teacher"],
        "created_at": reservation.get("created_at")
    }

def reservation_response_entity(reservation) -> dict:
    """
    Returns a dict of the reservation response entity
    """
    return {
        "id": reservation["id"],
        "room_id": reservation["room_id"],
        "user_id": reservation["user_id"],
        "status": reservation["status"],
        "start_date": reservation["start_date"],
        "end_date": reservation["end_date"],
        "activity": reservation["activiy"],
        "teacher": reservation["teacher"],
        "created_at": reservation.get("created_at")
    }

def reservation_list_entity(reservations) -> list:
    """
    Returns a list of the reservation entity
    """
    return [reservation_entity(reservation) for reservation in reservations]
