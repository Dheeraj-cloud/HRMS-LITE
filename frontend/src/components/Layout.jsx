import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "#f4f6f8",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
