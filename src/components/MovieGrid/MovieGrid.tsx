import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid = ({ movies }: MovieGridProps) => {
  // Базове зображення, якщо у фільму немає постера на серверах TMDB
  const defaultImg = "https://viber.com";

  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        // Формуємо правильне посилання на постер фільму
        const posterUrl = movie.poster_path
          ? `https://tmdb.org{movie.poster_path}`
          : defaultImg;

        return (
          <li key={movie.id}>
            <div className={css.card}>
              <img
                className={css.image} // ВИПРАВЛЕНО: використовуємо точний клас .image від менторів
                src={posterUrl}
                alt={movie.title || "Постер фільму"}
              />
              {/* Назва накладатиметься поверх картинки завдяки стилю .title */}
              <h3 className={css.title}>{movie.title}</h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieGrid;
