
from src.db.schemas.model_schema import ModelSchema


class RoomSchema(ModelSchema):
    bson_type: str = "object"
    required: list = ["id", "name", "status", "occupancy"]
    properties: dict = {
        "id": {
            "bson_type": "string",
            "description": "The item's unique identifier"
        },
        "name": {
            "bson_type": "string",
            "description": "The item's name"
        },
        "status": {
            "bson_type": "string",
            "description": "The item's status"
        },
        "occupancy": {
            "bson_type": "int",
            "description": "The item's occupancy"
        },
        "created_at": {
            "bson_type": "string",
            "description": "The item's creation time"
        }
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }