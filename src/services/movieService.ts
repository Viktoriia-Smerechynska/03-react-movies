import axios from "axios";
import type { Movie } from "../types/movie";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const tmdbApi = axios.create({
  baseURL: "https://themoviedb.org",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: "application/json",
  },
  params: {
    language: "uk-UA",
  },
});

interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get<TmdbResponse>("/trending/movie/day");
  return response.data.results;
};
