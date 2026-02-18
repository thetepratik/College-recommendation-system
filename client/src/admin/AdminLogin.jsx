import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>🔐 Admin Login</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    display: "grid",
    gap: "15px",
    width: "320px",
  },
};
