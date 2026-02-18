import { useEffect, useState } from "react";
import { getColleges } from "../services/collegeService";
import CollegeCard from "../components/CollegeCard";
import FilterPanel from "../components/FilterPanel";
import CompareModal from "../components/CompareModal";
import "../styles/colleges.css";

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [filters, setFilters] = useState({});
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getColleges(filters)
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges");
        setLoading(false);
      });
  }, [filters]);

  const handleCompare = (college) => {
    if (compareList.find((c) => c.college_id === college.college_id)) return;

    if (compareList.length === 2) {
      alert("You can compare only 2 colleges");
      return;
    }

    setCompareList((prev) => [...prev, college]);
  };

  return (
    <div className="college-page">
      <FilterPanel filters={filters} setFilters={setFilters} />

      {/* Loading state */}
      {loading && (
        <p style={{ padding: "20px", color: "#555" }}>
          Loading colleges...
        </p>
      )}

      {/* Error state */}
      {!loading && error && (
        <p style={{ padding: "20px", color: "red" }}>
          {error}
        </p>
      )}

      {/* Empty state */}
      {!loading && !error && colleges.length === 0 && (
        <p style={{ padding: "20px", color: "#777" }}>
          No colleges found. Try changing filters.
        </p>
      )}

      {/* College cards */}
      {!loading && !error && colleges.length > 0 && (
        <div className="college-grid">
          {colleges.map((college) => (
            <CollegeCard
              key={college.college_id}
              college={college}
              onCompare={handleCompare}
            />
          ))}
        </div>
      )}

      {/* Compare modal */}
      {compareList.length > 0 && (
        <CompareModal
          colleges={compareList}
          clearCompare={() => setCompareList([])}
        />
      )}
    </div>
  );
}
