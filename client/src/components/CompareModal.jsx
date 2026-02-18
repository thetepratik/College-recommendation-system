export default function CompareModal({ colleges, clearCompare }) {
  return (
    <div className="compare-modal">
      <h3>Compare Colleges</h3>

      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {colleges.map(c => (
              <th key={c.college_id}>{c.college_name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Fees</td>
            {colleges.map(c => (
              <td key={c.college_id}>₹{c.fees}</td>
            ))}
          </tr>

          <tr>
            <td>Rank</td>
            {colleges.map(c => (
              <td key={c.college_id}>{c.ranking}</td>
            ))}
          </tr>

          <tr>
            <td>Placement %</td>
            {colleges.map(c => (
              <td key={c.college_id}>{c.placement_percentage}%</td>
            ))}
          </tr>

          <tr>
            <td>Infrastructure</td>
            {colleges.map(c => (
              <td key={c.college_id}>⭐{c.infrastructure}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <button onClick={clearCompare} style={{ marginTop: "10px" }}>
        Close
      </button>
    </div>
  );
}
