
from src.db.schemas.model_schema import ModelSchema


class ReservationSchema(ModelSchema):
  bson_type: str = "object"
  required: list = ["id", "room_id", "user_id", "status", "start_date", "end_date", "activity", "teacher"]
  properties: dict = {
    "id": {
      "bson_type": "string",
      "description": "The reservation's unique identifier"
    },
    "room_id": {
      "bson_type": "string",
      "description": "The reservation's room identifier"
    },
    "user_id": {
      "bson_type": "string",
      "description": "The reservation's user identifier"
    },
    "status": {
      "bson_type": "string",
      "description": "The reservation's status"
    },
    "start_date": {
      "bson_type": "string",
      "description": "The reservation's start date"
    },
    "end_date": {
      "bson_type": "string",
      "description": "The reservation's end date"
    },
    "created_at": {
      "bson_type": "string",
      "description": "The reservation's creation time"
    }
  }
  def get(self) -> dict:
    return {
        "bson_type": self.bson_type,
        "required": self.required,
        "properties": self.properties
    }

  def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }