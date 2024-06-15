
from src.db.schemas.model_schema import ModelSchema


class EquipmentSchema(ModelSchema):
  bson_type: str = "object"
  required: list = ["id", "name", "description", "amount"]
  properties: dict = {
    "id": {
      "bson_type": "string",
      "description": "The equipment's unique identifier"
    },
    "name": {
      "bson_type": "string",
      "description": "The equipment's name"
    },
    "description": {
      "bson_type": "string",
      "description": "The equipment's description"
    },
    "amount": {
      "bson_type": "int",
      "description": "The equipment's amount"
    },
    "created_at": {
      "bson_type": "string",
      "description": "The equipment's creation time"
    },
  }