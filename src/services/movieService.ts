import axios from "axios";
import type { Movie } from "../types/movie";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/search/movie",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
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

export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get<TmdbResponse>("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await tmdbApi.get<TmdbResponse>("/search/movie", {
    params: {
      query: query,
    },
  });
  return response.data.results;
};
