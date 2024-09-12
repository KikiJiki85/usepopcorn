import { useEffect, useState } from 'react';
import Loader from './Loader';
import StarRating from './StarRating';
import { MovieDetailsType } from '../App-v1';

interface SelectedMovieProps {
  selectedId: string;
  onMovieDetailsClose: () => void;
  onAddWatched: (movie: MovieDetailsType) => void;
  watched: MovieDetailsType[];
}
const KEY = 'c26bf5e5';

function SelectedMovie({
  selectedId,
  onMovieDetailsClose,
  onAddWatched,
  watched,
}: SelectedMovieProps) {
  const [movie, setMovie] = useState<MovieDetailsType>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map((movie) => movie.imdbId).includes(+selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === +selectedId
  )?.userRating;

  useEffect(() => {
    async function getMovieDetails(id: string) {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails(selectedId);
  }, [selectedId]);

  const handleAdd = () => {
    const newWatchedMovie: MovieDetailsType = {
      imdbId: +selectedId,
      title: movie.Title,
      released: movie.Released,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime?.split(' ')[0]),
      userRating: +userRating,
    };

    onAddWatched(newWatchedMovie);
    onMovieDetailsClose();
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span> {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={28}
                    onSetRating={setUserRating}
                    defaultRating={userRating}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to watched list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie: {watchedUserRating} ⭐️</p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}

      <button onClick={onMovieDetailsClose} className="btn-back">
        &larr;
      </button>
    </div>
  );
}

export default SelectedMovie;
