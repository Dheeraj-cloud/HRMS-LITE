import { useEffect, useState } from "react";
import api from "../services/api";

function AttendanceForm() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/attendance", form);

      alert("Attendance marked");

      setForm({
        employeeId: "",
        date: "",
        status: "Present",
      });
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to mark attendance");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        width: "500px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Mark Attendance</h3>

      <div style={{ marginBottom: "10px" }}>
        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp.employeeId}>
              {emp.fullName}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Mark Attendance
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default AttendanceForm;
