from fastapi import APIRouter, HTTPException, Query
from app.db.database import db
from app.schemas.attendance_schema import AttendanceCreate
from datetime import datetime

router = APIRouter(tags=["Attendance"])


@router.post("/attendance")
async def mark_attendance(attendance: AttendanceCreate):

    try:

        attendance_dict = attendance.dict()

        attendance_dict["date"] = datetime.combine(
            attendance_dict["date"], datetime.min.time()
        )

        # Check existing attendance for employee on same date
        existing = await db.attendance.find_one({
            "employeeId": attendance.employeeId,
            "date": attendance_dict["date"]
        })

        if existing:

            # Update status
            await db.attendance.update_one(
                {"_id": existing["_id"]},
                {"$set": {"status": attendance.status}}
            )

            return {
                "message": "Attendance updated"
            }

        else:

            result = await db.attendance.insert_one(attendance_dict)

            return {
                "message": "Attendance marked",
                "id": str(result.inserted_id)
            }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Error marking attendance: {str(e)}"
        )

@router.get("/attendance/{employeeId}")
async def get_attendance(employeeId: str):
    try:

        records = []

        cursor = db.attendance.find({
            "employeeId": employeeId
        })

        async for document in cursor:
            document["_id"] = str(document["_id"])
            records.append(document)

        return records

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching attendance: {str(e)}"
        )


@router.get("/attendance")
async def filter_attendance(date: str = Query(...)):
    try:

        filter_date = datetime.strptime(date, "%Y-%m-%d")

        start = datetime.combine(filter_date, datetime.min.time())
        end = datetime.combine(filter_date, datetime.max.time())

        records = []

        cursor = db.attendance.find({
            "date": {
                "$gte": start,
                "$lte": end
            }
        })

        async for document in cursor:
            document["_id"] = str(document["_id"])
            records.append(document)

        return records

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error filtering attendance: {str(e)}"
        )


@router.get("/attendance/summary/{employeeId}")
async def attendance_summary(employeeId: str):
    try:

        present_days = await db.attendance.count_documents({
            "employeeId": employeeId,
            "status": "Present"
        })

        return {
            "employeeId": employeeId,
            "presentDays": present_days
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating summary: {str(e)}"
        )


@router.get("/dashboard")
async def dashboard_summary():
    try:

        today = datetime.now().date()

        start = datetime.combine(today, datetime.min.time())
        end = datetime.combine(today, datetime.max.time())

        total_employees = await db.employees.count_documents({})

        present_today = await db.attendance.count_documents({
            "date": {
                "$gte": start,
                "$lte": end
            },
            "status": "Present"
        })

        absent_today = await db.attendance.count_documents({
            "date": {
                "$gte": start,
                "$lte": end
            },
            "status": "Absent"
        })

        return {
            "totalEmployees": total_employees,
            "presentToday": present_today,
            "absentToday": absent_today
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating dashboard: {str(e)}"
        )