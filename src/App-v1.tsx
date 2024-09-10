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

const KEY = 'c26bf5e5';

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError('');
        setIsloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok) throw new Error('Something went wrong');
        const data = await res.json();
        if (data.Response === 'False') throw new Error('No results');
        setMovies(data.Search);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsloading(false);
      }
    }
    if (query.length < 3) return;
    fetchMovies();
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
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMsg message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

export default App;
