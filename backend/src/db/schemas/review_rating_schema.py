
from src.db.schemas.model_schema import ModelSchema


class ReviewRatingSchema(ModelSchema):
  bson_type: str = "object"
  required: list = ["id", "review_id", "user_id", "rating"]
  properties: dict = {
    "id": {
      "bson_type": "string",
      "description": "The review rating's unique identifier"
    },
    "review_id": {
      "bson_type": "string",
      "description": "The review rating's review identifier"
    },
    "user_id": {
      "bson_type": "string",
      "description": "The review rating's user identifier"
    },
    "liked": {
      "bson_type": "boolean",
      "description": "The review rating's rating (true for like, false for dislike)"
    },
    "created_at": {
      "bson_type": "string",
      "description": "The review rating's creation time"
    }
  }

  def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }