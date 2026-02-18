import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginBg from "../assets/logsign.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ===============================
  // LOGIN HANDLER (BACKEND AUTH)
  // ===============================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // ✅ STORE AUTH DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("name", res.data.name);

      // ✅ ROLE BASED REDIRECT
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/colleges");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
        body { margin: 0; }

        .journey-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #dbeeff, #f5f9ff);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .journey-card {
          width: 1100px;
          height: 600px;
          background: white;
          border-radius: 20px;
          display: flex;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.25);
        }

        .left-panel {
          flex: 1;
          background: url(${loginBg}) center/cover no-repeat;
          position: relative;
          padding: 40px;
          color: white;
        }

        .left-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 90, 200, 0.35);
        }

        .left-content {
          position: relative;
          z-index: 2;
          max-width: 300px;
        }

        .left-content h2 { font-size: 32px; margin-bottom: 8px; }
        .left-content p { opacity: 0.9; }

        .right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #edf4ff, #ffffff);
        }

        .glass-form {
          width: 360px;
          padding: 30px;
          border-radius: 18px;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(15px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .glass-form h3 { margin-bottom: 6px; }
        .glass-form p { color: #555; margin-bottom: 20px; }

        .input-box { margin-bottom: 14px; }

        .input-box input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          background: #f3f6fb;
        }

        .step-btn {
          width: 100%;
          padding: 12px;
          border-radius: 25px;
          border: none;
          background: linear-gradient(to right, #4facfe, #00c6ff);
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        .step-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .bottom-text {
          margin-top: 15px;
          text-align: center;
          font-size: 14px;
        }

        .bottom-text a {
          color: #0066ff;
          font-weight: 600;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .journey-card { flex-direction: column; height: auto; }
          .left-panel { height: 250px; }
        }
      `}</style>

      <div className="journey-container">
        <div className="journey-card">

          <div className="left-panel">
            <div className="left-content">
              <h2>Welcome Back!</h2>
              <p>Login to your account</p>
            </div>
          </div>

          <div className="right-panel">
            <form className="glass-form" onSubmit={handleLogin}>
              <h3>Welcome Back!</h3>
              <p>Login to your account</p>

              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="step-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="bottom-text">
                Don’t have an account? <a href="/register">Sign Up</a>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
