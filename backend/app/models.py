from pydantic import BaseModel, Field

class Account(BaseModel):
    id: int
    name: str
    balance: float = Field(ge=0, description="Account balance must be non-negative")
