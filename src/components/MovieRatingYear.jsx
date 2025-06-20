// components/RatingYear.jsx
export default function MovieRatingYear({ voteAverage, releaseDate }) {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  return (
    <div className="flex items-center justify-center text-sm text-gray-600 space-x-2 mt-2">
      <span className="g-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
        👍 {voteAverage?.toFixed(1)}
      </span>
      <span className="text-gray-300">|</span>
      <span className="text-gray-500">{year}</span>
    </div>
  );
}
