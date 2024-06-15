def review_rating_entity(rating) -> dict:
    """
    Returns a dict of the review rating entity
    """
    return {
        "id": rating["id"],
        "review_id": rating["room_id"],
        "user_id": rating["user_id"],
        "liked": rating["liked"],
        "created_at": rating.get("created_at")
    }

def review_rating_response_entity(rating) -> dict:
    """
    Returns a dict of the review rating response entity
    """
    return {
        "id": rating["id"],
        "review_id": rating["room_id"],
        "user_id": rating["user_id"],
        "liked": rating["liked"],
        "created_at": rating.get("created_at")
    }

def review_rating_list_entity(ratings) -> list:
    """
    Returns a list of the review rating entity
    """
    return [review_rating_entity(rating) for rating in ratings]
