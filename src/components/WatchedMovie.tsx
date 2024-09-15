import { MovieDetailsType } from '../App-v1';

interface WatchedMovieProps {
  movie: MovieDetailsType;
  handleRemoveWatch: (id: string) => void;
  onClick: (id: string) => void;
}

function WatchedMovie({
  movie,
  handleRemoveWatch,
  onClick,
}: WatchedMovieProps) {
  const handleClose = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    handleRemoveWatch(movie.imdbId);
  };
  return (
    <li onClick={() => onClick(movie.imdbId)}>
      <img
        src={movie.Poster === 'N/A' ? '/images/no-image.svg' : movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>
            {isNaN(movie.imdbRating ?? 0) ? 'No data' : movie.imdbRating}
          </span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>
            {movie.Runtime === 'N/A' ? 'No data' : `${movie.Runtime} min`}
          </span>
        </p>
        <button className="btn-delete" onClick={handleClose}>
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
