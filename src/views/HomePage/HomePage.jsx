import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Api from '../../services/TMDB-api';
import SmallMovieCard from '../../components/SmallMovieCard';
import Loader from '../../components/Loader';
import s from './HomePage.module.css';
import slugify from 'slugify';

const makeSlug = string => slugify(string, { lower: true });

function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const toggleLoadind = () => {
    setLoadedImages(prev => prev + 1);
  };

  useEffect(() => {
    Api.fetchTrending()
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loadedImages < movies.length && <Loader />}
      <h2 className={s.heading}>Trending today</h2>
      <ul className={s.cardsList}>
        {movies.map(movie => {
          return (
            <li key={movie.id} className={s.card}>
              <Link
                className={s.link}
                to={{
                  pathname: `movies/${makeSlug(`${movie.title} ${movie.id}`)}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to Home',
                    },
                  },
                }}
              >
                <SmallMovieCard movie={movie} onload={toggleLoadind} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default HomePage;
