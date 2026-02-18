import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Recommendations() {
  const [qualification, setQualification] = useState("12th");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [formData, setFormData] = useState({
    rank: "",
    diplomaPercent: "",
    branch: "",
    entranceExam: "",
    category: "General",
    collegeType: [],
    state: "",
    city: "",
    budget: ""
  });

  // ---------------- HANDLERS ----------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckbox = (type) => {
    setFormData((prev) => ({
      ...prev,
      collegeType: prev.collegeType.includes(type)
        ? prev.collegeType.filter((c) => c !== type)
        : [...prev.collegeType, type],
    }));
  };

  // ---------------- API CALL ----------------
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setResults([]);

      const endpoint =
        qualification === "12th"
          ? "http://localhost:5000/api/recommend/12th"
          : "http://localhost:5000/api/recommend/diploma";

      const res = await axios.post(endpoint, formData);
      setResults(res.data || []);
    } catch (err) {
      alert("❌ Failed to fetch recommendations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- PDF EXPORT ----------------
  const exportToPDF = () => {
  if (!results || results.length === 0) {
    alert("No colleges to export");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("College Recommendation Report", 14, 15);

  doc.setFontSize(11);
  doc.text(`Student Type: ${qualification}`, 14, 25);
  doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 14, 32);

  const tableColumn = [
    "Rank",
    "College Name",
    "Branch",
    "Location",
    "Type",
    "Fees",
    "Placement %"
  ];

  const tableRows = results.map((c, index) => [
    index + 1,
    c.college_name,
    c.branch,
    `${c.city}, ${c.state}`,
    c.college_type,
    `₹${c.fees}`,
    `${c.placement_percentage}%`
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: "grid",
    headStyles: { fillColor: [102, 126, 234] },
    styles: { fontSize: 9 }
  });

  doc.save("College_Recommendations.pdf");
};

  // ---------------- UI ----------------
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🎓 College Recommendation System</h1>
        <p style={styles.subtitle}>
          Smart recommendations based on your academic profile
        </p>

        {/* TOGGLE */}
        <div style={styles.toggleBox}>
          <button
            style={qualification === "12th" ? styles.activeToggle : styles.toggle}
            onClick={() => setQualification("12th")}
          >
            12th Student
          </button>
          <button
            style={qualification === "Diploma" ? styles.activeToggle : styles.toggle}
            onClick={() => setQualification("Diploma")}
          >
            Diploma Student
          </button>
        </div>

        {/* FORM */}
        <div style={styles.form}>
          {qualification === "12th" && (
            <>
              <input name="rank" placeholder="CET / JEE Rank" onChange={handleChange} style={styles.input} />
              <select name="entranceExam" onChange={handleChange} style={styles.input}>
                <option value="">Entrance Exam</option>
                <option value="CET">CET</option>
                <option value="JEE">JEE</option>
              </select>
              <select name="category" onChange={handleChange} style={styles.input}>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
              </select>
            </>
          )}

          {qualification === "Diploma" && (
            <input
              name="diplomaPercent"
              placeholder="Diploma Percentage"
              onChange={handleChange}
              style={styles.input}
            />
          )}

          <select name="branch" onChange={handleChange} style={styles.input}>
            <option value="">Preferred Branch</option>
            <option>Computer Engineering</option>
            <option>Information Technology</option>
            <option>AI & Data Science</option>
            <option>Mechanical Engineering</option>
            <option>Electrical Engineering</option>
            <option>ENTC</option>
            <option>Civil Engineering</option>
          </select>

          <div style={styles.checkboxRow}>
            <label><input type="checkbox" onChange={() => handleCheckbox("Government")} /> Government</label>
            <label><input type="checkbox" onChange={() => handleCheckbox("Private")} /> Private</label>
          </div>

          <input name="state" placeholder="State" onChange={handleChange} style={styles.input} />
          <input name="city" placeholder="City" onChange={handleChange} style={styles.input} />
          <input name="budget" placeholder="Max Budget (₹)" onChange={handleChange} style={styles.input} />

          <button onClick={handleSubmit} style={styles.findBtn}>
            {loading ? "Finding Colleges..." : "Find Colleges"}
          </button>

          <button onClick={exportToPDF} style={styles.pdfBtn}>
            📄 Export PDF
          </button>
        </div>

        {/* RESULTS */}
        <div style={styles.cardGrid}>
          {!loading && results.length === 0 && (
            <p style={styles.noResult}>No colleges found</p>
          )}

          {results.map((c, i) => (
            <div key={i} style={styles.card}>
              <span style={styles.badge}>{c.college_type}</span>
              <h3>{c.college_name}</h3>
              <p><b>Branch:</b> {c.branch}</p>
              <p><b>Location:</b> {c.city}, {c.state}</p>
              <p><b>Fees:</b> ₹{c.fees}</p>
              <p><b>Placement:</b> {c.placement_percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#e0eafc,#cfdef3)",
    display: "flex",
    justifyContent: "center",
    padding: "40px"
  },
  container: {
    width: "100%",
    maxWidth: "1100px"
  },
  title: { textAlign: "center", marginBottom: "5px" },
  subtitle: { textAlign: "center", marginBottom: "25px", color: "#555" },
  toggleBox: { display: "flex", justifyContent: "center", gap: "15px", marginBottom: "25px" },
  toggle: { padding: "10px 22px", borderRadius: "25px", border: "1px solid #999", cursor: "pointer" },
  activeToggle: { padding: "10px 22px", borderRadius: "25px", background: "#667eea", color: "#fff", border: "none" },
  form: {
    maxWidth: "480px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.85)",
    padding: "25px",
    borderRadius: "18px",
    display: "grid",
    gap: "14px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
  },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #ccc" },
  checkboxRow: { display: "flex", justifyContent: "space-between" },
  findBtn: { padding: "14px", borderRadius: "30px", background: "#43cea2", color: "#fff", border: "none" },
  pdfBtn: { padding: "12px", borderRadius: "30px", background: "#f7b733", border: "none" },
  cardGrid: {
    marginTop: "40px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "25px"
  },
  card: {
    background: "#fff",
    padding: "22px",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    position: "relative"
  },
  badge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "#667eea",
    color: "#fff",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px"
  },
  noResult: { textAlign: "center", color: "red", fontSize: "18px" }
};
