import { useEffect, useState } from "react";
import api from "../services/api";

import AttendanceTable from "../components/AttendanceTable";

function AttendanceHistory() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");

      setEmployees(res.data);
    } catch (error) {
      console.error("Failed to load employees");
    }
  };

  const fetchAttendance = async (employeeId) => {
    try {
      const res = await api.get(`/attendance/${employeeId}`);

      setRecords(res.data);
    } catch (error) {
      console.error("Failed to fetch attendance");
    }
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;

    setSelectedEmployee(employeeId);

    if (employeeId) {
      fetchAttendance(employeeId);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Attendance History</h2>

      <select
        value={selectedEmployee}
        onChange={handleEmployeeChange}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">Select Employee</option>

        {employees.map((emp) => (
          <option key={emp._id} value={emp.employeeId}>
            {emp.fullName}
          </option>
        ))}
      </select>

      <AttendanceTable records={records} />
    </div>
  );
}

export default AttendanceHistory;
