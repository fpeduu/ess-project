def equipment_entity(equipment) -> dict:
    """
    Returns a dict of the equipment entity
    """
    return {
        "id": equipment["id"],
        "name": equipment["name"],
        "description": equipment.get("description"),
        "amount": equipment["amount"],
        "created_at": equipment.get("created_at")
    }

def equipment_response_entity(equipment) -> dict:
    """
    Returns a dict of the equipment response entity
    """
    return {
        "id": equipment["id"],
        "name": equipment["name"],
        "description": equipment.get("description"),
        "amount": equipment["amount"],
        "created_at": equipment.get("created_at")
    }

def equipment_list_entity(equipments) -> list:
    """
    Returns a list of the equipment entity
    """
    return [equipment_entity(equipment) for equipment in equipments]