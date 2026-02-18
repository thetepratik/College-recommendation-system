import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Colleges from "./pages/Colleges";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

/* ================= ADMIN ================= */
import AdminDashboard from "./admin/AdminDashboard";
import AdminColleges from "./admin/AdminColleges";
import AdminUsers from "./admin/AdminUsers";

/* ================= AUTH HELPERS ================= */
const isAuthenticated = () => !!localStorage.getItem("token");
const getRole = () => localStorage.getItem("role");

/* ================= PROTECTED ROUTES ================= */
const UserRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/" replace />;
  if (getRole() !== "user") return <Navigate to="/admin/dashboard" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/" replace />;
  if (getRole() !== "admin") return <Navigate to="/colleges" replace />;
  return children;
};

export default function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />
        <Route
          path="/colleges"
          element={
            <UserRoute>
              <Colleges />
            </UserRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <UserRoute>
              <Recommendations />
            </UserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/colleges"
          element={
            <AdminRoute>
              <AdminColleges />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
