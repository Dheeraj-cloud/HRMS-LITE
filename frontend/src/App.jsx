import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import AttendanceHistory from "./pages/AttendanceHistory";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/employees" element={<Employees />} />

          <Route path="/attendance" element={<Attendance />} />

          <Route path="/attendance-history" element={<AttendanceHistory />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
