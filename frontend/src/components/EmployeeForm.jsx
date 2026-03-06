import { useState } from "react";
import api from "../services/api";

function EmployeeForm({ onEmployeeAdded }) {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/employees", form);

      onEmployeeAdded();

      setForm({
        employeeId: "",
        name: "",
        email: "",
        department: "",
      });
    } catch (error) {
      alert(error.response?.data?.detail || "Error adding employee");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "25px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Add Employee</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={handleChange}
          required
        />

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
