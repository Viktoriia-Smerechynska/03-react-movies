import { useEffect, useState } from "react";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";

import { fetchMovies } from "../../services/movieService";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError("Не вдалося завантажити фільми. Перевірте конфігурацію.");
      }
    };

    getMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>🔥 Трендові фільми сьогодні</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} (⭐️ {movie.vote_average.toFixed(1)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
