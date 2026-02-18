import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    college_id: "",
    college_name: "",
    college_image: "",
    fees: "",
    cutoff: "",
    ranking: "",
    placement_percentage: "",
    infrastructure: "",
    college_type: "",
    affiliation: "",
    established_year: "",
    state: "",
    city: "",
    official_website: ""
  };

  const [form, setForm] = useState(emptyForm);

  /* ================= FETCH COLLEGES ================= */
  const fetchColleges = async () => {
    const res = await axios.get("http://localhost:5000/api/colleges");
    setColleges(res.data);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({
        ...form,
        college_image: reader.result.split(",")[1] // BASE64 ONLY
      });
    };
    reader.readAsDataURL(file);
  };

  /* ================= SAVE / UPDATE ================= */
  const saveCollege = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/admin/colleges/${editingId}`,
          form
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/colleges",
          form
        );
      }

      setForm(emptyForm);
      setEditingId(null);
      fetchColleges();
      alert("✅ College saved successfully");
    } catch (err) {
      alert("❌ Failed to save college");
    }
  };

  /* ================= EDIT ================= */
  const editCollege = (college) => {
    setForm(college);
    setEditingId(college.college_id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const deleteCollege = async (college_id) => {
    if (!window.confirm("Delete this college?")) return;

    await axios.delete(
      `http://localhost:5000/api/admin/colleges/${college_id}`
    );
    fetchColleges();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🏫 Admin – Manage Colleges</h1>

      {/* ================= FORM ================= */}
      <div style={styles.formCard}>
        <h3>{editingId ? "✏ Edit College" : "➕ Add New College"}</h3>

        {/* IMAGE UPLOAD */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {form.college_image && (
          <img
            src={`data:image/jpeg;base64,${form.college_image}`}
            alt="preview"
            style={styles.preview}
          />
        )}

        <div style={styles.grid}>
          {Object.keys(emptyForm)
            .filter((k) => k !== "college_image")
            .map((key) => (
              <input
                key={key}
                placeholder={key.replace(/_/g, " ").toUpperCase()}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            ))}
        </div>

        <button style={styles.saveBtn} onClick={saveCollege}>
          {editingId ? "Update College" : "Add College"}
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>City</th>
            <th>Type</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {colleges.map((c) => (
            <tr key={c.college_id}>
              <td>
                {c.college_image && (
                  <img
                    src={`data:image/jpeg;base64,${c.college_image}`}
                    alt={c.college_name}
                    style={styles.tableImg}
                  />
                )}
              </td>
              <td>{c.college_name}</td>
              <td>{c.city}</td>
              <td>{c.college_type}</td>
              <td>₹{c.fees}</td>
              <td>
                <button onClick={() => editCollege(c)}>✏ Edit</button>
                <button onClick={() => deleteCollege(c.college_id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "30px",
    background: "linear-gradient(135deg,#e0eafc,#cfdef3)",
    minHeight: "100vh"
  },

  title: {
    marginBottom: "20px"
  },

  formCard: {
    background: "rgba(255,255,255,0.9)",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "40px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "12px",
    marginTop: "15px"
  },

  saveBtn: {
    marginTop: "20px",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    cursor: "pointer"
  },

  preview: {
    width: "180px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "12px",
    marginTop: "10px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff"
  },

  tableImg: {
    width: "80px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "8px"
  }
};
