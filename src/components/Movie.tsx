import { MovieType, SelectedIdType } from '../App-v1';

interface MovieProps {
  movie: MovieType;
  onClick: (id: SelectedIdType) => void;
}

function Movie({ movie, onClick }: MovieProps) {
  return (
    <li onClick={() => onClick(movie.imdbID)}>
      <img
        src={movie.Poster === 'N/A' ? '/images/no-image.svg' : movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
