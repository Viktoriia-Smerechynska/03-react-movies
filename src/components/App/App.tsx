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

  // Обробник відправки форми з SearchBar
  const handleSearchSubmit = (query: string): void => {
    setMovies([]); // При кожному новому пошуку очищаємо попередню колекцію фільмів
    setSearchQuery(query); // Записуємо нове ключове слово
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        setError(null);

        // Якщо запиту немає — завантажуємо тренди, якщо є — шукаємо фільми
        const data = searchQuery
          ? await searchMovies(searchQuery)
          : await fetchMovies();

        // Перевірка на порожній масив результатів у момент обробки запиту
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
      {/* Підключаємо компонент пошуку */}
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

      {/* Обов'язковий контейнер від бібліотеки для рендеру сповіщень */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
