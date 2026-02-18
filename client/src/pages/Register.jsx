import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/logsign.jpeg";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirm) {
    alert("Passwords do not match");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/register", {
      name: form.name,
      email: form.email,
      password: form.password
    });

    alert("Registration successful");
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
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
          background: url(${loginBg})
            center/cover no-repeat;
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
          width: 380px;
          padding: 30px;
          border-radius: 18px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(15px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .glass-form h3 { margin-bottom: 6px; }
        .glass-form p { color: #555; margin-bottom: 20px; }

        .input-box { margin-bottom: 14px; }

        .input-box input,
        .input-box select {
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
          background: linear-gradient(to right, #667eea, #764ba2);
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
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
              <h2>Create Your Account</h2>
              <p>Join us to find your ideal college</p>
            </div>
          </div>

          <div className="right-panel">
            <form className="glass-form" onSubmit={handleRegister}>
              <h3>Create Account</h3>
              <p>Start your journey</p>

              <div className="input-box">
                <input name="name" placeholder="Full Name" onChange={handleChange} />
              </div>

              <div className="input-box">
                <input name="email" placeholder="Email" onChange={handleChange} />
              </div>

              <div className="input-box">
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
              </div>

              <div className="input-box">
                <input type="password" name="confirm" placeholder="Confirm Password" onChange={handleChange} />
              </div>

              <div className="input-box">
                <select name="category" onChange={handleChange}>
                  <option>General / OBC / SC / ST</option>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                </select>
              </div>

              <button className="step-btn">Sign Up</button>

              <div className="bottom-text">
                Already have an account? <a href="/">Login here</a>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
