import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DASHBOARD DATA =================
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard"
      );
      setStats(res.data);
    } catch (err) {
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading Dashboard...</h2>;
  }

  if (!stats) {
    return <h2 style={{ padding: 40 }}>No dashboard data</h2>;
  }

  // ================= SAFE DATA =================
  const stateData = stats.colleges?.by_state || [];
  const cityData = stats.colleges?.by_city || [];
  const typeData = stats.colleges?.by_type || [];

  // ================= CHART CONFIGS =================
  const stateChart = {
    labels: stateData.map((s) => s.state),
    datasets: [
      {
        label: "Colleges",
        data: stateData.map((s) => s.count),
        backgroundColor: "#667eea",
      },
    ],
  };

  const cityChart = {
    labels: cityData.map((c) => c.city),
    datasets: [
      {
        label: "Colleges",
        data: cityData.map((c) => c.count),
        backgroundColor: "#43cea2",
      },
    ],
  };

  const typeChart = {
    labels: typeData.map((t) => t.type),
    datasets: [
      {
        label: "Colleges",
        data: typeData.map((t) => t.count),
        backgroundColor: ["#4facfe", "#f093fb"],
      },
    ],
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🎓 Admin Panel</h2>

        <button style={styles.link} onClick={() => navigate("/admin/dashboard")}>
          📊 Dashboard
        </button>
        <button style={styles.link} onClick={() => navigate("/admin/colleges")}>
          🏫 Colleges
        </button>
        <button style={styles.link} onClick={() => navigate("/admin/users")}>
          👨‍🎓 Users
        </button>

        <button style={styles.logout} onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        <h1>Admin Dashboard</h1>

        {/* STATS CARDS */}
        <div style={styles.cards}>
          <StatCard title="Total Users" value={stats.users.total} />
          <StatCard title="Active Users" value={stats.users.active} />
          <StatCard title="Blocked Users" value={stats.users.blocked} />
          <StatCard title="Total Colleges" value={stats.colleges.total} />
        </div>

        {/* ANALYTICS */}
        <div style={styles.charts}>
          <ChartCard title="📍 Colleges by State">
            {stateData.length ? (
              <Bar data={stateChart} />
            ) : (
              <p>No state data</p>
            )}
          </ChartCard>

          <ChartCard title="🏙️ Colleges by City">
            {cityData.length ? (
              <Bar data={cityChart} />
            ) : (
              <p>No city data</p>
            )}
          </ChartCard>

          <ChartCard title="🏫 College Type Distribution">
            {typeData.length ? (
              <Bar data={typeChart} />
            ) : (
              <p>No type data</p>
            )}
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div style={styles.chartCard}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#e0eafc,#cfdef3)",
    fontFamily: "Poppins, sans-serif",
  },

  sidebar: {
    width: "260px",
    background: "rgba(255,255,255,0.35)",
    backdropFilter: "blur(18px)",
    padding: "25px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },

  link: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },

  logout: {
    marginTop: "30px",
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#ff4d4f",
    color: "#fff",
    cursor: "pointer",
  },

  content: {
    flex: 1,
    padding: "40px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
    marginBottom: "40px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  charts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))",
    gap: "30px",
  },

  chartCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
  },
};
