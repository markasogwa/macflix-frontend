import UseGenres from "../hooks/useGenres";

function GenresSelect({value, onChange}) {
  const { genres, error } = UseGenres();
    return (
      <div>
        <div className="flex flex-col">
          
          <select
            value={value}
            onChange={onChange}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">Genres</option>
            {(genres || []).map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}
        </div>
      </div>
    );
}

export default GenresSelect;
