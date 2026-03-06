from pydantic import BaseModel
from datetime import date

class AttendanceCreate(BaseModel):
    employeeId: str
    date: date
    status: str