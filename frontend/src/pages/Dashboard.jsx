import { useEffect, useState } from "react";
import api from "../services/api";

import StatCard from "../components/StatCard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      setStats(res.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "25px" }}>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <StatCard title="Total Employees" value={stats.totalEmployees} />

        <StatCard title="Present Today" value={stats.presentToday} />

        <StatCard title="Absent Today" value={stats.absentToday} />
      </div>
    </div>
  );
}

export default Dashboard;
