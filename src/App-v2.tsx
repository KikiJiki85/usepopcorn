import { useState } from 'react';
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
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

export type SelectedIdType = string | null;

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
  countRatingDecisions?: number;
}

function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<SelectedIdType>(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useLocalStorageState<MovieDetailsType[]>(
    [],
    'watched'
  );

  const handleSelectMovie = (id: SelectedIdType) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatch = (movie: MovieDetailsType) => {
    setWatched((prev) => [...prev, movie]);
  };

  const handleRemoveWatch = (id: string) => {
    setWatched((prev) => prev.filter((movie) => movie.imdbId !== id));
  };

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
