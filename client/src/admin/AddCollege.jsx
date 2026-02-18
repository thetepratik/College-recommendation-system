import { useState } from "react";

export default function AddCollege() {
  const [college, setCollege] = useState({
    name: "",
    state: "",
    city: "",
    type: "",
    branch: "",
    fees: "",
  });

  const handleChange = (e) =>
    setCollege({ ...college, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log(college);
    alert("College Added (console)");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>➕ Add College</h2>

      <div style={{ maxWidth: "400px", display: "grid", gap: "10px" }}>
        <input name="name" placeholder="College Name" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="branch" placeholder="Branch" onChange={handleChange} />
        <input name="fees" placeholder="Fees" onChange={handleChange} />
        <select name="type" onChange={handleChange}>
          <option value="">College Type</option>
          <option>Government</option>
          <option>Private</option>
        </select>

        <button onClick={handleSubmit}>Save College</button>
      </div>
    </div>
  );
}
