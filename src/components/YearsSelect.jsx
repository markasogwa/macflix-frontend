import UseYears from "../hooks/useYears";

function YearsSelect({ value, onChange }) {
  const years = UseYears();
  return (
    <div>
      {/* Year select */}
      <div className="flex flex-col">
        <select
          value={value}
          onChange={onChange}
          className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">All year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default YearsSelect;
