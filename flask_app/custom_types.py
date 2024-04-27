from pydantic import BaseModel

class MessageWithUser(BaseModel):
    user: str
    message: str