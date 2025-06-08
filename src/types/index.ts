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
  src: string; 
  title: string;
  year: string; 
  description: string; 
  rating: number; 
}

export interface Show {
  id: number;
  src: string; 
  title: string; 
  year: string; 
  description: string;
  rating: number; 
}

export interface TmdbMovieResult {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string; 
  overview: string;
  vote_average: number;
}

export interface TmdbShowResult {
  id: number;
  poster_path: string | null;
  name: string; 
  first_air_date: string; 
  overview: string;
  vote_average: number;
}

export interface TmdbApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}