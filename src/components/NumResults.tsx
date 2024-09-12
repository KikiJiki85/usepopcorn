import { MovieType } from '../App-v1';

interface NumResultsProps {
  movies: MovieType[];
}
function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
