import { NavLink } from "react-router-dom";

const navStyle = ({ isActive }) => ({
  color: "white",
  textDecoration: "none",
  padding: "8px",
  borderRadius: "4px",
  background: isActive ? "#334155" : "transparent",
});
function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>HRMS</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <NavLink to="/" style={navStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/employees" style={navStyle}>
          Employees
        </NavLink>

        <NavLink to="/attendance" style={navStyle}>
          Attendance
        </NavLink>

        <NavLink to="/attendance-history" style={navStyle}>
          Attendance History
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
