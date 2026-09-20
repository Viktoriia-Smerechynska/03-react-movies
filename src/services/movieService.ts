import axios from "axios";
import type { Movie } from "../types/movie";

// Безпечно беремо токен із прихованого файлу .env.local
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// Створюємо інстанс з правильною базовою URL-адресою API
const tmdbApi = axios.create({
  baseURL: "https://themoviedb.org",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  params: {
    language: "uk-UA", // Отримуємо дані українською мовою
  },
});

// Інтерфейс для суворої типізації відповіді від Axios
interface TmdbResponse {
  page: number;
  results: Movie[]; // Масив фільмів
  total_pages: number;
  total_results: number;
}

// ПРАВИЛЬНА ФУНКЦІЯ: Обов'язково експортуємо її через export const
export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get<TmdbResponse>("/trending/movie/day");
  return response.data.results;
};

// Додаткова функція для пошуку фільмів за ключовим словом
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await tmdbApi.get<TmdbResponse>("/search/movie", {
    params: {
      query: query,
    },
  });
  return response.data.results;
};
