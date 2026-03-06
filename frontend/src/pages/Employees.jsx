import { useEffect, useState } from "react";
import api from "../services/api";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");

      setEmployees(res.data);
    } catch (error) {
      console.error("Error loading employees");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Employees</h2>

      <EmployeeForm onEmployeeAdded={fetchEmployees} />

      <EmployeeTable employees={employees} refresh={fetchEmployees} />
    </div>
  );
}

export default Employees;
