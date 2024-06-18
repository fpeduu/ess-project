
from src.db.schemas.model_schema import ModelSchema

class RoomEquipmentSchema(ModelSchema):
  bson_type: str = "object"
  required: list = ["id", "room_id", "equipment_id", "amount"]
  properties: dict = {
    "id": {
      "bson_type": "string",
      "description": "The room equipment's unique identifier"
    },
    "room_id": {
      "bson_type": "string",
      "description": "The room equipment's room identifier"
    },
    "equipment_id": {
      "bson_type": "string",
      "description": "The room equipment's equipment identifier"
    },
    "amount": {
      "bson_type": "int",
      "description": "The room equipment's amount"
    },
    "created_at": {
      "bson_type": "string",
      "description": "The room equipment's creation time"
    }
  }

  def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }