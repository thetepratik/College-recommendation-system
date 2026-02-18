import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [studentType, setStudentType] = useState("");
  const [form, setForm] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRecommend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/recommend",
        {
          studentType,
          ...form
        }
      );
      setResults(res.data);
    } catch (err) {
      alert("Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* TITLE */}
      <h2>🎓 College Recommendation</h2>
      <p style={{ color: "#555", marginBottom: "20px" }}>
        Select your academic background to get personalized college suggestions
      </p>

      {/* STUDENT TYPE */}
      <div style={{ marginBottom: "20px" }}>
        <label><strong>Are you a:</strong></label><br />
        <select
          value={studentType}
          onChange={(e) => {
            setStudentType(e.target.value);
            setForm({});
            setResults([]);
          }}
          style={{ padding: "10px", width: "300px", marginTop: "8px" }}
        >
          <option value="">-- Select --</option>
          <option value="12th">12th Student</option>
          <option value="diploma">Diploma Student</option>
        </select>
      </div>

      {/* FORM */}
      {studentType && (
        <form
          onSubmit={handleRecommend}
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            maxWidth: "700px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >
          {/* 12TH STUDENT FORM */}
          {studentType === "12th" && (
            <>
              <h3>Academic Inputs (12th Student)</h3>

              <input name="tenthPercentage" placeholder="10th Percentage" onChange={handleChange} />
              <input name="twelfthPercentage" placeholder="12th Percentage" onChange={handleChange} />
              <input name="stream" placeholder="Stream (Science)" onChange={handleChange} />

              <select name="entranceExam" onChange={handleChange}>
                <option value="">Entrance Exam</option>
                <option>JEE</option>
                <option>CET</option>
                <option>NEET</option>
              </select>

              <input name="rank" placeholder="Rank / Score" onChange={handleChange} />
              <input name="location" placeholder="Preferred Location" onChange={handleChange} />

              <select name="category" onChange={handleChange}>
                <option value="">Category</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
              </select>
            </>
          )}

          {/* DIPLOMA STUDENT FORM */}
          {studentType === "diploma" && (
            <>
              <h3>Academic Inputs (Diploma Student)</h3>

              <input name="diplomaBranch" placeholder="Diploma Branch" onChange={handleChange} />
              <input name="diplomaPercentage" placeholder="Diploma Percentage" onChange={handleChange} />

              <select name="collegeType" onChange={handleChange}>
                <option value="">Diploma College Type</option>
                <option>Government</option>
                <option>Private</option>
              </select>

              <input name="lateralExam" placeholder="Lateral Entry Exam (if any)" onChange={handleChange} />
              <input name="location" placeholder="Preferred Location" onChange={handleChange} />

              <select name="category" onChange={handleChange}>
                <option value="">Category</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
              </select>
            </>
          )}

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "12px",
              width: "100%",
              border: "none",
              borderRadius: "8px",
              background: "#1e90ff",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            {loading ? "Finding Colleges..." : "Get College Recommendations"}
          </button>
        </form>
      )}

      {/* RESULTS */}
      <div style={{ marginTop: "40px" }}>
        <h3>Top 10 Recommended Colleges</h3>

        {results.length === 0 && !loading && (
          <p style={{ color: "#777" }}>
            No recommendations yet.
          </p>
        )}

        <ul>
          {results.map((college, index) => (
            <li key={index} style={{
              background: "#f9f9f9",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}>
              #{index + 1} {college}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
