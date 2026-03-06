function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        width: "220px",
      }}
    >
      <h3 style={{ fontSize: "16px", marginBottom: "10px", color: "#555" }}>
        {title}
      </h3>

      <p style={{ fontSize: "28px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

export default StatCard;
