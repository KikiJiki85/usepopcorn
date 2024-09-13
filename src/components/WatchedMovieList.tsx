import { MovieDetailsType } from '../App-v1';
import WatchedMovie from './WatchedMovie';

interface WatchedMovieListProps {
  watched: MovieDetailsType[];
  handleRemoveWatch: (id: string) => void;
}

function WatchedMovieList({
  watched,
  handleRemoveWatch,
}: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbId}
          handleRemoveWatch={handleRemoveWatch}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
