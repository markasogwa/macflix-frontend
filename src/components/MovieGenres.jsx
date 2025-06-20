// components/GenreTags.jsx
import useGenres from "../hooks/useGenres";

export default function MovieGenres({ genreIds = [] }) {
  const { genres } = useGenres();

  const genreMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  const genreNames = genreIds
    .map((id) => genreMap[id])
    .filter(Boolean)
    .join(", ");

  if (!genreNames)
    return (
      <span className="text-sm text-gray-400 mt-1 block">Unknown Genre</span>
    );

  return (
    <div className="flex flex-wrap justify-center gap-1 mt-1 mb-2">
      {genreNames.split(", ").map((genre, index) => (
        <span
          key={index}
          className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium"
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
