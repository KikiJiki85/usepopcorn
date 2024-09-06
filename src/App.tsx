import { useState } from 'react';
import { tempMovieData, tempWatchedData } from './assets/mock';
import NavBar from './components/NavBar';
import Main from './components/Main';
import NumResults from './components/NumResults';
import Logo from './components/Logo';
import Search from './components/Search';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
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
