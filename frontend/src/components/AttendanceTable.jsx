function AttendanceTable({ records }) {
  if (!records || records.length === 0) {
    return <p>No attendance records found</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        background: "white",
        borderCollapse: "collapse",
        marginTop: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <thead>
        <tr style={{ background: "#f1f5f9" }}>
          <th style={thStyle}>Employee ID</th>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Status</th>
        </tr>
      </thead>

      <tbody>
        {records.map((record) => (
          <tr key={record._id}>
            <td style={tdStyle}>{record.employeeId}</td>

            <td style={tdStyle}>
              {new Date(record.date).toLocaleDateString()}
            </td>

            <td style={tdStyle}>{record.status}</td>
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
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

export default AttendanceTable;
