from fastapi import APIRouter, HTTPException
from app.db.database import db
from app.schemas.employee_schema import EmployeeCreate
from bson import ObjectId

router = APIRouter(tags=["Employees"])


@router.post("/employees")
async def add_employee(employee: EmployeeCreate):
    try:

        employee_dict = employee.dict()

        existing_employee = await db.employees.find_one({
            "employeeId": employee.employeeId
        })

        if existing_employee:
            raise HTTPException(
                status_code=400,
                detail="Employee ID already exists"
            )

        result = await db.employees.insert_one(employee_dict)

        return {
            "message": "Employee added",
            "id": str(result.inserted_id)
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error adding employee: {str(e)}"
        )


@router.get("/employees")
async def get_employees():
    try:

        employees = []

        cursor = db.employees.find()

        async for document in cursor:
            document["_id"] = str(document["_id"])
            employees.append(document)

        return employees

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching employees: {str(e)}"
        )


@router.delete("/employees/{id}")
async def delete_employee(id: str):
    try:

        result = await db.employees.delete_one({
            "_id": ObjectId(id)
        })

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Employee not found"
            )

        return {"message": "Employee deleted"}

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting employee: {str(e)}"
        )