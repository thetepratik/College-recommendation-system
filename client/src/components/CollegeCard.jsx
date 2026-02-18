import defaultImg from "../assets/pict.jpg";

export default function CollegeCard({ college, onCompare }) {
  let imgSrc;

  try {
    // Load local image dynamically (Vite-safe)
    imgSrc = new URL(
      `../assets/${college.college_image}`,
      import.meta.url
    ).href;
  } catch (error) {
    imgSrc = defaultImg;
  }

  return (
    <div className="college-card">
      <img
        src={imgSrc}
        alt={college.college_name}
        className="college-image"
      />

      <h3 className="college-name">{college.college_name}</h3>

      <div className="college-info">
        <p>💰 Fees: ₹{college.fees}</p>
        <p>🏆 Rank: {college.ranking}</p>
        <p>📈 Placement: {college.placement_percentage}%</p>
        <p>🏫 Infrastructure: ⭐ {college.infrastructure}</p>
      </div>

      <div className="card-actions">
        <a
          href={college.official_website}
          target="_blank"
          rel="noreferrer"
          className="website-btn"
        >
          Website
        </a>

        {onCompare && (
          <button
            className="compare-btn"
            onClick={() => onCompare(college)}
          >
            Compare
          </button>
        )}
      </div>
    </div>
  );
}
