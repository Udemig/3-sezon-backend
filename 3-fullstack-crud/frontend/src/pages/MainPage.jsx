import { useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5001/api/movies')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return <div>MainPage</div>;
};

export default MainPage;
