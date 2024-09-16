import { useEffect, useState } from 'react';
import { KEY } from '../assets/utils';

export interface MovieType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export function useMovies(query: string, callback: () => void) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    callback?.(); // If it is exists call it

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setError('');
        setIsloading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('Something went wrong');
        const data = await res.json();
        if (data.Response === 'False') throw new Error('no results...');
        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          if (err.name !== 'AbortError') setError(err.message);
        }
      } finally {
        setIsloading(false);
      }
    }
    if (query.length < 3) return;
    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
