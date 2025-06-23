// components/MovieSlider.jsx
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function MovieSlider({ movies }) {
  if (!movies || movies.length === 0) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // no arrows
    pauseOnHover: true, // pause on hover
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="mb-16">
      <Slider {...settings}>
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="px-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-2 text-sm text-center truncate">{movie.title}</p>
          </Link>
        ))}
      </Slider>
    </section>
  );
}
