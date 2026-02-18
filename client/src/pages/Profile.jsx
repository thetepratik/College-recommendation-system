import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  // 🔑 Replace later with real userId from auth
  const userId = localStorage.getItem("userId") || "demo_user_123";

  const photoUrl = `http://localhost:5000/api/profile/photo/${userId}`;

  const [edit, setEdit] = useState(false);
  const [photoKey, setPhotoKey] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    qualification: "",
    percentage: "",
    entranceExam: "",
    branch: "",
  });

  /* =========================
     LOAD PROFILE ON PAGE LOAD
     ========================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${userId}`
        );

        if (res.data) {
          setProfile((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  /* =========================
     SAVE PROFILE TO DATABASE
     ========================= */
  const saveProfile = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/profile/${userId}`,
        profile
      );
      alert("✅ Profile saved successfully");
      setEdit(false);
    } catch (err) {
      alert("❌ Failed to save profile");
    }
  };

  /* =========================
     UPLOAD PROFILE PHOTO
     ========================= */
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await axios.post(
        `http://localhost:5000/api/profile/upload-photo/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Force image reload
      setPhotoKey(Date.now());
    } catch (err) {
      alert("❌ Failed to upload photo");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.glassCard}>
        {/* LEFT PROFILE */}
        <div style={styles.left}>
          <img
            src={`${photoUrl}?t=${photoKey}`}
            alt="profile"
            style={styles.avatar}
            onError={(e) =>
              (e.target.src = "https://i.pravatar.cc/150")
            }
          />

          {edit && (
            <label style={styles.uploadBtn}>
              📷 Change Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoUpload}
              />
            </label>
          )}

          <h3>{profile.name || "Your Name"}</h3>
          <p>{profile.email || "your@email.com"}</p>

          <div style={styles.sideInfo}>
            <p>📧 {profile.email}</p>
            <p>📞 {profile.phone}</p>
            <p>📍 {profile.city}</p>
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div style={styles.right}>
          <div style={styles.header}>
            <h2>My Profile</h2>
            <button
              onClick={() => (edit ? saveProfile() : setEdit(true))}
              style={styles.editBtn}
            >
              {edit ? "Save Changes" : "Edit"}
            </button>
          </div>

          {/* PERSONAL INFO */}
          <div style={styles.section}>
            <h4>👤 Personal Information</h4>
            <div style={styles.grid}>
              <Input label="Full Name" name="name" value={profile.name} edit={edit} onChange={handleChange} />
              <Input label="Email" name="email" value={profile.email} edit={edit} onChange={handleChange} />
              <Input label="Phone" name="phone" value={profile.phone} edit={edit} onChange={handleChange} />
              <Input label="State" name="state" value={profile.state} edit={edit} onChange={handleChange} />
            </div>
          </div>

          {/* ACADEMIC INFO */}
          <div style={styles.section}>
            <h4>🎓 Academic Information</h4>
            <div style={styles.grid}>
              <Input label="Percentage / Rank" name="percentage" value={profile.percentage} edit={edit} onChange={handleChange} />
              <Input label="Entrance Exam" name="entranceExam" value={profile.entranceExam} edit={edit} onChange={handleChange} />
              <Input label="Branch" name="branch" value={profile.branch} edit={edit} onChange={handleChange} />
              <Input label="City" name="city" value={profile.city} edit={edit} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- REUSABLE INPUT ---------- */
function Input({ label, name, value, edit, onChange }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      {edit ? (
        <input
          name={name}
          value={value || ""}
          onChange={onChange}
          style={styles.input}
        />
      ) : (
        <div style={styles.readOnly}>{value || "-"}</div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#e0eafc,#cfdef3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
  },

  glassCard: {
    width: "100%",
    maxWidth: "1100px",
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(18px)",
    borderRadius: "22px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
    overflow: "hidden",
  },

  left: {
    background: "rgba(255,255,255,0.3)",
    padding: "30px",
    textAlign: "center",
  },

  avatar: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    border: "4px solid #fff",
    marginBottom: "10px",
    objectFit: "cover",
  },

  uploadBtn: {
    display: "inline-block",
    marginBottom: "15px",
    padding: "6px 14px",
    background: "#fff",
    borderRadius: "20px",
    fontSize: "13px",
    cursor: "pointer",
  },

  sideInfo: {
    marginTop: "20px",
    textAlign: "left",
    fontSize: "14px",
  },

  right: {
    padding: "30px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  editBtn: {
    padding: "10px 18px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    cursor: "pointer",
  },

  section: {
    marginBottom: "25px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
  },

  label: {
    fontSize: "13px",
    opacity: 0.8,
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.9)",
  },

  readOnly: {
    padding: "10px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.45)",
  },
};
