import api from "../services/api";

function EmployeeTable({ employees, refresh }) {
  const deleteEmployee = async (id) => {
    if (!confirm("Delete employee?")) return;

    try {
      await api.delete(`/employees/${id}`);

      refresh();
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (employees.length === 0) {
    return <p>No employees found</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        background: "white",
        borderCollapse: "collapse",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr style={{ background: "#f1f5f9" }}>
          <th style={thStyle}>Employee ID</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Department</th>
          <th style={thStyle}>Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td style={tdStyle}>{emp.employeeId}</td>
            <td style={tdStyle}>{emp.fullName}</td>
            <td style={tdStyle}>{emp.email}</td>
            <td style={tdStyle}>{emp.department}</td>

            <td style={tdStyle}>
              <button
                onClick={() => deleteEmployee(emp._id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
};

export default EmployeeTable;
