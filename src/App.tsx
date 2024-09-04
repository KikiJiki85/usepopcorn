import { useState } from 'react';
import { tempMovieData, tempWatchedData } from './assets/mock';
import NavBar from './components/NavBar';
import Main from './components/Main';

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar movies={movies} />
      <Main movies={movies} watched={watched} />
    </>
  );
}

export default App;
