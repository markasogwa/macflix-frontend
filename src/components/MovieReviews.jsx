import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function MovieReviews({ movieId, user, token }) {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  async function fetchReviews() {
    try {
      const res = await axios(
        `${import.meta.env.VITE_BASE_URL}/api/reviews/${movieId}`
      );
      setReviews(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function submitReview(e) {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      if (editingReviewId) {
        // Update existing review
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/reviews/${editingReviewId}`,
          { text, rating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Review updated!");
        setEditingReviewId(null);
      } else {
        // Create new review
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/reviews/`,
          { movieId, text, rating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Review submitted!");
      }

      setText("");
      setRating(0);
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting review.");
    }
  }

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setText(review.text);
    setRating(review.rating);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Review deleted.");
      fetchReviews();
    } catch (error) {
      console.error("Failed to delete review.", error);
      toast.error("Failed to delete review.");
    }
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Reviews</h2>

      <ul className="space-y-4 mb-8 max-h-96 overflow-y-auto">
        {reviews.length > 0 ? (
          reviews.map((item) => (
            <li
              key={item._id}
              className="border border-gray-700 rounded-md p-4 text-sm bg-gray-800 text-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold">{item.userId?.username}</span>{" "}
                  <span className="text-gray-400 text-xs">
                    {item.rating}/10
                  </span>
                  <p className="mt-1">{item.text}</p>
                </div>

                {user && user._id === item.userId._id && (
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} title="Edit">
                      <Pencil className="w-4 h-4 text-yellow-400 hover:text-yellow-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400 italic text-sm">No reviews yet.</p>
        )}
      </ul>

      {user ? (
        <form onSubmit={submitReview} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Rating (0–10)
            </label>
            <input
              type="number"
              max="10"
              min="0"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              className="w-20 px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white focus:ring focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Your Review
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="3"
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring focus:ring-indigo-500"
              placeholder="Write something..."
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md text-sm font-semibold"
          >
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </form>
      ) : (
        <p className="text-gray-500 text-sm italic">
          Login to add a review.{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline ml-2"
          >
            Login
          </Link>
        </p>
      )}
    </section>
  );
}

export default MovieReviews;
