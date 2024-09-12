import { MovieType, SelectedIdType } from '../App-v1';
import Movie from './Movie';

interface MovieListProps {
  movies: MovieType[];
  onSelectMovie: (id: SelectedIdType) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onClick={onSelectMovie} />
      ))}
    </ul>
  );
}

export default MovieList;
