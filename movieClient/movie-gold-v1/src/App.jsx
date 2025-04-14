import "./App.css";
import { useState, useEffect } from "react";
import api from "./api/axiosConfig";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notFound/NotFound";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setAMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies/");
      setMovies(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getAMovie = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;

      setAMovie(singleMovie);
      setReviews(singleMovie.reviewIds || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Home movies={movies} key={movies.length} />}
          />
          <Route path="/Trailer/:tyTrailerId" element={<Trailer />} />
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                movie={movie}
                getAMovie={getAMovie}
                reviews={reviews}
                setReviews={setReviews}
                key={reviews.length}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
