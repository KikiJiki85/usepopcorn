import { useEffect, useRef, useState } from 'react';
import Loader from './Loader';
import StarRating from './StarRating';
import { MovieDetailsType } from '../App-v2';

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
  const [movie, setMovie] = useState<MovieDetailsType>({
    Poster: '',
    Title: '',
    Released: '',
    Runtime: '',
    Genre: '',
    imdbRating: 0,
    Plot: '',
    Actors: '',
    Director: '',
    userRating: 0,
    imdbId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState<number | string>('');
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  useEffect(() => {
    async function getMovieDetails(id: string) {
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails(selectedId);
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;
    return () => {
      document.title = 'usePopcorn';
    };
  }, [movie.Title]);

  useEffect(() => {
    const handleEscPress = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onMovieDetailsClose();
      }
    };
    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, [onMovieDetailsClose]);

  const handleAdd = () => {
    const newWatchedMovie: MovieDetailsType = {
      imdbId: selectedId,
      Title: movie.Title,
      Released: movie.Released,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      Runtime: movie.Runtime?.split(' ')[0],
      userRating: +userRating,
      countRatingDecisions: countRef.current,
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
            <img
              src={
                movie.Poster === 'N/A' ? '/images/no-image.svg' : movie.Poster
              }
              alt={movie.Title}
            />
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
                    defaultRating={Number(userRating)}
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
