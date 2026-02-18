import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <style>{`
        .navbar {
          height: 60px;
          background: linear-gradient(to right, #4facfe, #00c6ff);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .nav-left {
          font-size: 22px;
          font-weight: 700;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-right a {
          color: white;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          position: relative;
        }

        .nav-right a::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          background: white;
          left: 0;
          bottom: -4px;
          transition: width 0.3s;
        }

        .nav-right a:hover::after {
          width: 100%;
        }

        .logout-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          background: white;
          color: #0077cc;
          font-weight: 600;
        }

        .logout-btn:hover {
          background: #e6f3ff;
        }

        @media (max-width: 600px) {
          .nav-right {
            gap: 12px;
          }

          .nav-left {
            font-size: 18px;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-left">🎓 College Finder</div>

        <div className="nav-right">
          <Link to="/colleges">Colleges</Link>
          <Link to="/recommendation">Recommendation</Link>
          <Link to="/profile">Profile</Link>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
