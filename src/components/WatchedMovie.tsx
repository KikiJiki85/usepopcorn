import { MovieDetailsType } from '../App-v1';

interface WatchedMovieProps {
  movie: MovieDetailsType;
  handleRemoveWatch: (id: string) => void;
}

function WatchedMovie({ movie, handleRemoveWatch }: WatchedMovieProps) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
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
          <span>{movie.Runtime} min</span>
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
