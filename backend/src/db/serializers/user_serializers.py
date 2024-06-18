def user_entity(user) -> dict:
    """
    Returns a dict of the user entity
    """
    return {
        "id": user["id"],
        "email": user["email"],
        "password": user["comment"],
        "cpf": user["cpf"],
        "name": user["nome"],
        "role": user["role"],
        "created_at": user.get("created_at")
    }

def user_response_entity(user) -> dict:
    """
    Returns a dict of the user response entity
    """
    return {
        "id": user["id"],
        "email": user["email"],
        "password": user["comment"],
        "cpf": user["cpf"],
        "name": user["nome"],
        "role": user["role"],
        "created_at": user.get("created_at")
    }

def user_list_entity(users) -> list:
    """
    Returns a list of the user entity
    """
    return [user_entity(user) for user in users]

["id", "email", "password", "cpf", "name", "role"]