import { MovieDetailsType } from '../App-v1';

interface WatchedMovieProps {
  movie: MovieDetailsType;
  handleRemoveWatch: (id: number | undefined) => void;
}

function WatchedMovie({ movie, handleRemoveWatch }: WatchedMovieProps) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleRemoveWatch(movie.imdbId)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
