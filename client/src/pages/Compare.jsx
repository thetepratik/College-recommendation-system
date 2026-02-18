import { useState } from "react";
import CompareTable from "../components/CompareTable";

export default function Compare() {
  const [college1, setCollege1] = useState("");
  const [college2, setCollege2] = useState("");

  return (
    <div>
      <h2>Compare Colleges</h2>

      <input
        placeholder="College 1 Name"
        value={college1}
        onChange={(e) => setCollege1(e.target.value)}
      />

      <input
        placeholder="College 2 Name"
        value={college2}
        onChange={(e) => setCollege2(e.target.value)}
      />

      {college1 && college2 && (
        <CompareTable college1={college1} college2={college2} />
      )}
    </div>
  );
}
