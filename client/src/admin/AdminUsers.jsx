import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // ==============================
  // FETCH USERS
  // ==============================
  const fetchUsers = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/users?search=${search}&status=${status}`
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, status]);

  // ==============================
  // UPDATE STATUS
  // ==============================
  const updateStatus = async (user_id, newStatus) => {
    await axios.put(
      `http://localhost:5000/api/admin/users/${user_id}`,
      { status: newStatus }
    );
    fetchUsers();
  };

  // ==============================
  // EXPORT PDF
  // ==============================
  const exportPDF = () => {
    window.open(
      "http://localhost:5000/api/admin/users/export/pdf",
      "_blank"
    );
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>👤 Admin – User Management</h2>
        <button onClick={exportPDF} style={styles.pdfBtn}>
          📄 Export PDF
        </button>
      </div>

      {/* FILTER BAR */}
      <div style={styles.filterBar}>
        <input
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        >
          <option>All</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u.user_id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.branch || "-"}</td>
                <td>{u.city || "-"}</td>
                <td>
                  <span
                    style={{
                      ...styles.badge,
                      background:
                        u.status === "Blocked" ? "#ff4d4d" : "#4CAF50",
                    }}
                  >
                    {u.status || "Active"}
                  </span>
                </td>
                <td>
                  {u.status === "Blocked" ? (
                    <button
                      onClick={() => updateStatus(u.user_id, "Active")}
                      style={styles.activateBtn}
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(u.user_id, "Blocked")}
                      style={styles.blockBtn}
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f5f8ff",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  pdfBtn: {
    padding: "10px 18px",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    cursor: "pointer",
  },

  filterBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
  },

  tableWrap: {
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  badge: {
    padding: "5px 12px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "12px",
  },

  blockBtn: {
    padding: "6px 12px",
    borderRadius: "12px",
    border: "none",
    background: "#ff4d4d",
    color: "#fff",
    cursor: "pointer",
  },

  activateBtn: {
    padding: "6px 12px",
    borderRadius: "12px",
    border: "none",
    background: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
};
