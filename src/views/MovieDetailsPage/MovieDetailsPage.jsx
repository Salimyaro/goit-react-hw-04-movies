import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Api from '../../services/TMDB-api';

import Button from '../../components/Button';
import FullMovieCard from '../../components/FullMovieCard';
import AdditInfo from '../../components/AdditInfo';
import Loader from '../../components/Loader';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "Reviews" */),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { path } = useRouteMatch();
  const { slug } = useParams();
  const movieId = slug.match(/[0-9]+$/)[0];
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    Api.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    <div
      className={s.backdrop}
      style={
        movie?.backdrop_path && {
          background: `url("https://image.tmdb.org/t/p/w780${movie.backdrop_path}") center /cover no-repeat`,
        }
      }
    >
      <div className={s.blur}>
        <Button
          onClick={handleGoBack}
          title={location?.state?.from?.label ?? 'Home'}
        />
        {movie && (
          <>
            <FullMovieCard movie={movie} />
            <AdditInfo />
          </>
        )}
        <Suspense fallback={<Loader />}>
          <Route path={`${path}/cast`}>
            <Cast id={movieId} />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews id={movieId} />
          </Route>
        </Suspense>
      </div>
    </div>
  );
}
