import type { Movie, Show, TmdbMovieResult, TmdbShowResult, TmdbApiResponse } from '../types/index.ts';

const TMDB_API_KEY: string = import.meta.env.VITE_REACT_APP_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE'; 
const TMDB_BASE_URL: string = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/w500'; 

// --- Helper Functions ---

const getFullImageUrl = (posterPath: string | null): string => {
  if (posterPath) {
    return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
  }
  return 'https://via.placeholder.com/500x750?text=No+Image'; 
};

const transformTmdbMovie = (tmdbMovie: TmdbMovieResult): Movie => ({
  id: tmdbMovie.id,
  src: getFullImageUrl(tmdbMovie.poster_path),
  title: tmdbMovie.title,
  year: tmdbMovie.release_date ? tmdbMovie.release_date.substring(0, 4) : 'N/A', // Extract year
  description: tmdbMovie.overview || 'No description available.',
  rating: parseFloat(tmdbMovie.vote_average.toFixed(1)), // Format to one decimal place
});

const transformTmdbShow = (tmdbShow: TmdbShowResult): Show => ({
  id: tmdbShow.id,
  src: getFullImageUrl(tmdbShow.poster_path),
  title: tmdbShow.name,
  year: tmdbShow.first_air_date ? tmdbShow.first_air_date.substring(0, 4) : 'N/A', // Extract year
  description: tmdbShow.overview || 'No description available.',
  rating: parseFloat(tmdbShow.vote_average.toFixed(1)), // Format to one decimal place
});

// --- API Request Functions ---

export const fetchPopularMovies = async (count: number = 20, page: number = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  let movies: Movie[] = [];
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Check your TMDB API key.');
      }
      throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
    }
    const data: TmdbApiResponse<TmdbMovieResult> = await response.json();
    movies = data.results.map(transformTmdbMovie);
    return { movies: movies.slice(0, count), totalPages: data.total_pages };
  } catch (error) {
    throw error;
  }
};

export const fetchPopularShows = async (count: number = 20): Promise<Show[]> => {
  let shows: Show[] = [];
  let page = 1;

  try {
    while (shows.length < count) {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&page=${page}`
      );

      if (!response.ok) {
        if (response.status === 401) {
            console.error('TMDB API Error: Invalid API key or permissions.');
            throw new Error('Authentication failed. Check your TMDB API key.');
        }
        throw new Error(`Failed to fetch popular shows: ${response.statusText}`);
      }

      const data: TmdbApiResponse<TmdbShowResult> = await response.json();

      if (!data.results || data.results.length === 0) {
        break;
      }

      const transformedShows = data.results.map(transformTmdbShow);
      shows = shows.concat(transformedShows);

      if (page >= data.total_pages) {
        break;
      }
      page++;
    }

    return shows.slice(0, count);

  } catch (error) {
    console.error("Error fetching popular shows:", error);
    throw error;
  }
};

