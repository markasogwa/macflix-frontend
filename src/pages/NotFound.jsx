import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603006908648-b82f66c7f04d?auto=format&fit=crop&w=1470&q=80')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />

      {/* Animated content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-red-500 drop-shadow-lg mb-6">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold mb-4">
          Page Not Found
        </p>
        <p className="text-lg mb-8 max-w-xl text-gray-300">
          Sorry, the movie you're looking for might have been removed, renamed,
          or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
