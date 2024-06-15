def review_entity(review) -> dict:
    """
    Returns a dict of the review entity
    """
    return {
        "id": review["id"],
        "room_id": review["room_id"],
        "user_id": review["user_id"],
        "rating": review["rating"],
        "comment": review["comment"],
        "created_at": review.get("created_at")
    }

def review_response_entity(review) -> dict:
    """
    Returns a dict of the review response entity
    """
    return {
        "id": review["id"],
        "room_id": review["room_id"],
        "user_id": review["user_id"],
        "rating": review["rating"],
        "comment": review["comment"],
        "created_at": review.get("created_at")
    }

def review_list_entity(reviews) -> list:
    """
    Returns a list of the review entity
    """
    return [review_entity(review) for review in reviews]
