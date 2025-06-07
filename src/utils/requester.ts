import type { Movie, Show, TmdbMovieResult, TmdbShowResult, TmdbApiResponse } from '../types/index.ts';

// --- Configuration ---
// It's highly recommended to use environment variables for your API key
const TMDB_API_KEY: string = import.meta.env.VITE_REACT_APP_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE'; // Use Vite env var
const TMDB_BASE_URL: string = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/w500'; // Common size, adjust as needed (e.g., 'original')

// --- Helper Functions ---

/**
 * Constructs the full image URL from a TMDB poster path.
 * @param posterPath The poster_path from TMDB API response.
 * @returns Full URL to the image, or a placeholder if path is null.
 */
const getFullImageUrl = (posterPath: string | null): string => {
  if (posterPath) {
    return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
  }
  // Return a placeholder image or an empty string if no poster is available
  return 'https://via.placeholder.com/500x750?text=No+Image'; // Example placeholder
};

/**
 * Transforms raw TMDB movie data into our internal Movie interface.
 * @param tmdbMovie The raw movie object from TMDB API.
 * @returns A Movie object.
 */
const transformTmdbMovie = (tmdbMovie: TmdbMovieResult): Movie => ({
  id: tmdbMovie.id,
  src: getFullImageUrl(tmdbMovie.poster_path),
  title: tmdbMovie.title,
  year: tmdbMovie.release_date ? tmdbMovie.release_date.substring(0, 4) : 'N/A', // Extract year
  description: tmdbMovie.overview || 'No description available.',
  rating: parseFloat(tmdbMovie.vote_average.toFixed(1)), // Format to one decimal place
});

/**
 * Transforms raw TMDB show data into our internal Show interface.
 * @param tmdbShow The raw TV show object from TMDB API.
 * @returns A Show object.
 */
const transformTmdbShow = (tmdbShow: TmdbShowResult): Show => ({
  id: tmdbShow.id,
  src: getFullImageUrl(tmdbShow.poster_path),
  title: tmdbShow.name,
  year: tmdbShow.first_air_date ? tmdbShow.first_air_date.substring(0, 4) : 'N/A', // Extract year
  description: tmdbShow.overview || 'No description available.',
  rating: parseFloat(tmdbShow.vote_average.toFixed(1)), // Format to one decimal place
});

// --- API Request Functions ---

/**
 * Fetches N popular movies from TMDB.
 * @param count The number of movies to retrieve. Note: TMDB API returns pages of 20 results.
 * This function will fetch `count` movies by iterating through pages if needed.
 * @returns A promise that resolves to an array of Movie objects.
 */
export const fetchPopularMovies = async (count: number = 20): Promise<Movie[]> => {
  let movies: Movie[] = [];
  let page = 1;

  try {
    while (movies.length < count) {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
      );

      if (!response.ok) {
        // Handle specific error codes if necessary (e.g., 401 for invalid API key)
        if (response.status === 401) {
            console.error('TMDB API Error: Invalid API key or permissions.');
            throw new Error('Authentication failed. Check your TMDB API key.');
        }
        throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
      }

      const data: TmdbApiResponse<TmdbMovieResult> = await response.json();

      if (!data.results || data.results.length === 0) {
        // No more results or initial empty result
        break;
      }

      const transformedMovies = data.results.map(transformTmdbMovie);
      movies = movies.concat(transformedMovies);

      if (page >= data.total_pages) {
        // Reached the last page
        break;
      }
      page++;
    }

    // Return only the requested 'count' number of movies
    return movies.slice(0, count);

  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error; // Re-throw to be handled by the calling component
  }
};

/**
 * Fetches N popular TV shows from TMDB.
 * @param count The number of shows to retrieve. Similar to movies, handles pagination.
 * @returns A promise that resolves to an array of Show objects.
 */
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

