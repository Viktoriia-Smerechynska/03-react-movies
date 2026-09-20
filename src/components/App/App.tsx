import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import { fetchMovies, searchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSearchSubmit = (query: string): void => {
    setMovies([]);
    setSearchQuery(query);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        setError(null);

        const data = searchQuery
          ? await searchMovies(searchQuery)
          : await fetchMovies();

        if (searchQuery && data.length === 0) {
          toast.error("No movies found for your request.");
        }

        setMovies(data);
      } catch (err) {
        setError("Не вдалося завантажити фільми. Перевірте конфігурацію.");
      }
    };

    getMovies();
  }, [searchQuery]);

  return (
    <div className={css.app}>
      {}
      <SearchBar onSubmit={handleSearchSubmit} />

      <div className={css.container}>
        <h1 className={css.mainTitle}>
          {searchQuery
            ? `Результати пошуку: "${searchQuery}"`
            : "🔥 Трендові фільми сьогодні"}
        </h1>

        {error && <p className={css.error}>{error}</p>}

        {movies.length > 0 && <MovieGrid movies={movies} />}
      </div>

      {}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
