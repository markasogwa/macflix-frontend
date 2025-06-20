import { useState } from "react";
import YearsSelect from "./YearsSelect";

export default function MovieFilter({ onFilterChange, loading }) {
  const [minRating, setMinRating] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [sortBy, setSortBy] = useState("");

  const updateFilter = (newValues) => {
    const updated = {
      minRating,
      releaseYear,
      sortBy,
      ...newValues,
    };
    setMinRating(updated.minRating);
    setReleaseYear(updated.releaseYear);
    setSortBy(updated.sortBy);
    onFilterChange(updated);
  };

  return (
    <section className="bg-gray-800 p-6 rounded-xl mb-8 text-white max-w-full mx-auto relative">
      <h3 className="text-xl font-semibold mb-5 border-b border-gray-700 pb-2">
        Filter Movies
      </h3>

      <form
        className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between w-full"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Movie filter form"
      >
        {/* Min Rating */}
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label
            htmlFor="min-rating"
            className="mb-1 text-sm font-medium text-gray-300"
          >
            Minimum Rating (0 - 10)
          </label>
          <input
            id="min-rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={minRating}
            onChange={(e) => updateFilter({ minRating: e.target.value })}
            placeholder="e.g. 7"
            disabled={loading}
            className="bg-gray-700 text-white rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Release Year */}
        <div className="flex flex-col flex-1 min-w-[120px]">
          <YearsSelect
            id="release-year"
            value={releaseYear}
            onChange={(e) => updateFilter({ releaseYear: e.target.value })}
            disabled={loading}
            className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Sort By */}
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label
            htmlFor="sort-by"
            className="mb-1 text-sm font-medium text-gray-300"
          >
            Sort By
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => updateFilter({ sortBy: e.target.value })}
            disabled={loading}
            className="bg-gray-700 text-white rounded-md px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="">Default</option>
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="release">Release Date</option>
          </select>
        </div>

        {/* Loading spinner */}
        {loading && (
          <div
            aria-label="Loading"
            role="status"
            className="flex items-center justify-center ml-4"
          >
            <div className="w-6 h-6 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </form>
    </section>
  );
}
