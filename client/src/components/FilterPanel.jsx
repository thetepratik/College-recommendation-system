import { useEffect, useState } from "react";

export default function FilterPanel({ filters, setFilters }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: search || undefined
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="filter-panel">
      <input
        type="text"
        placeholder="Search college name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        onChange={(e) =>
          setFilters(prev => ({
            ...prev,
            maxFees: e.target.value || undefined
          }))
        }
      >
        <option value="">Max Fees</option>
        <option value="100000">₹1,00,000</option>
        <option value="150000">₹1,50,000</option>
        <option value="200000">₹2,00,000</option>
      </select>

      <select
        onChange={(e) =>
          setFilters(prev => ({
            ...prev,
            maxRank: e.target.value || undefined
          }))
        }
      >
        <option value="">Max Rank</option>
        <option value="30">Top 30</option>
        <option value="50">Top 50</option>
        <option value="100">Top 100</option>
      </select>

      <select
        onChange={(e) =>
          setFilters(prev => ({
            ...prev,
            minPlacement: e.target.value || undefined
          }))
        }
      >
        <option value="">Min Placement %</option>
        <option value="60">60%</option>
        <option value="70">70%</option>
        <option value="80">80%</option>
      </select>
    </div>
  );
}
