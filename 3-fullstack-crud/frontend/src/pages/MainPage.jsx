import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Hero from '../components/Hero';
import ErrorDisplay from '../components/ErrorDisplay';
import Loader from '../components/Loader';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get('http://127.0.0.1:5001/api/movies')
      .then((res) => setMovies(res.data.movies))
      .catch((err) => setError(err?.response?.data?.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <Hero />

      <div className="p-4 grid gap-10  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          movies?.map((movie, i) => (
            <Card key={movie.id} movie={movie} index={i} />
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;
