import { MovieDetailsType } from '../App-v1';
import { average } from '../assets/utils';
interface WatchedSummaryProps {
  watched: MovieDetailsType[];
}
function WatchedSummary({ watched }: WatchedSummaryProps) {
  const avgImdbRating = average(
    watched
      .map((movie) => movie.imdbRating)
      .filter((rating): rating is number => rating !== undefined)
  );
  const avgUserRating = average(
    watched
      .map((movie) => movie.userRating)
      .filter((rating): rating is number => rating !== undefined)
  );
  const avgRuntime = average(
    watched
      .map((movie) => movie.runtime)
      .filter((rating): rating is number => rating !== undefined)
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(0)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
