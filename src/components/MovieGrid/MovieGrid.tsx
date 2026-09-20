import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  const defaultImg = "https://viber.com";

  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://tmdb.org{movie.poster_path}`
          : defaultImg;

        return (
          <li key={movie.id}>
            {}
            <div className={css.card} onClick={() => onSelect(movie)}>
              <img
                className={css.image}
                src={posterUrl}
                alt={movie.title || "Movie title"}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieGrid;
