import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import { fetchMovies, searchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearchSubmit = (query: string): void => {
    setMovies([]);
    setSearchQuery(query);
  };

  const handleSelectMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = searchQuery
          ? await searchMovies(searchQuery)
          : await fetchMovies();

        if (searchQuery && data.length === 0) {
          toast.error("No movies found for your request.");
        }

        setMovies(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [searchQuery]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearchSubmit} />

      <div className={css.container}>
        {isLoading && <Loader />}

        {isError && !isLoading && <ErrorMessage />}

        {!isLoading && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}
      </div>

      {}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
