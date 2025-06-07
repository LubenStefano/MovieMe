interface DataProps {
src:string,
title:string,
year:string,
description:string,
rating:number,
}

export interface CatalogProps {
  arr: DataProps[];
}

export interface CinemaItemProps {
  id: string;
  top: number;
  left?: number;
  right?: number;
  width: number;
  rotate?: number;
  zIndex?: number;
  type: "popcorn" | "soda" | "ticket";
}

// src/types/index.ts

export interface Movie {
  id: number;
  src: string; // URL to the movie poster
  title: string;
  year: string; // Extracted from release_date
  description: string; // overview
  rating: number; // vote_average
  // You can add more TMDB specific properties here if needed,
  // e.g., original_title, genre_ids, popularity, etc.
}

export interface Show {
  id: number;
  src: string; // URL to the TV show poster
  title: string; // name
  year: string; // Extracted from first_air_date
  description: string; // overview
  rating: number; // vote_average
  // Similar to Movie, add more properties if required
}

// TMDB API Response Interfaces (Partial for relevant fields)
export interface TmdbMovieResult {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string; // YYYY-MM-DD
  overview: string;
  vote_average: number;
  // Add other fields you might receive but not explicitly use in your Movie interface
}

export interface TmdbShowResult {
  id: number;
  poster_path: string | null;
  name: string; // For TV shows, title is 'name'
  first_air_date: string; // YYYY-MM-DD
  overview: string;
  vote_average: number;
}

export interface TmdbApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}