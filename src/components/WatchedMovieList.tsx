import { MovieDetailsType } from '../App-v1';
import WatchedMovie from './WatchedMovie';

interface WatchedMovieListProps {
  watched: MovieDetailsType[];
  handleRemoveWatch: (id: string) => void;
  onSelectMovie: (id: string) => void;
}

function WatchedMovieList({
  watched,
  handleRemoveWatch,
  onSelectMovie,
}: WatchedMovieListProps) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbId}
          handleRemoveWatch={handleRemoveWatch}
          onClick={onSelectMovie}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
