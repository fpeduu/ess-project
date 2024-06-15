
from src.db.schemas.model_schema import ModelSchema


class ReviewSchema(ModelSchema):
  bson_type: str = "object"
  required: list = ["id", "room_id", "user_id", "rating", "comment"]
  properties: dict = {
    "id": {
      "bson_type": "string",
      "description": "The review's unique identifier"
    },
    "room_id": {
      "bson_type": "string",
      "description": "The review's room identifier"
    },
    "user_id": {
      "bson_type": "string",
      "description": "The review's user identifier"
    },
    "rating": {
      "bson_type": "int",
      "description": "The review's rating"
    },
    "comment": {
      "bson_type": "string",
      "description": "The review's comment"
    },
    "created_at": {
      "bson_type": "string",
      "description": "The review's creation time"
    }
  }

  def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }