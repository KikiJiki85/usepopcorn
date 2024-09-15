import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import NumResults from './components/NumResults';
import Logo from './components/Logo';
import Search from './components/Search';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
import SelectedMovie from './components/SelectedMovie';

const KEY = 'c26bf5e5';

export type SelectedIdType = string | null;

export interface MovieType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetailsType {
  Poster?: string;
  Title?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  imdbRating?: number;
  Plot?: string;
  Actors?: string;
  Director?: string;
  userRating?: number;
  imdbId: string;
}

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [watched, setWatched] = useState<MovieDetailsType[]>(() =>
    JSON.parse(localStorage.getItem('watched') ?? '[]')
  );
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<SelectedIdType>(null);

  const handleSelectMovie = (id: SelectedIdType) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatch = (movie: MovieDetailsType) => {
    setWatched((prev) => [...prev, movie]);
  };

  const handleRemoveWatch = (id: string) => {
    setWatched((prev) => prev.filter((movie) => movie.imdbId !== id));
  };

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
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
    handleCloseMovie();
    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMsg message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onMovieDetailsClose={handleCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched}>
                <WatchedMovieList
                  watched={watched}
                  handleRemoveWatch={handleRemoveWatch}
                  onSelectMovie={handleSelectMovie}
                />
              </WatchedSummary>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
