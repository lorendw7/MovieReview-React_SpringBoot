import { Paper } from "@mui/material";
import "./Hero.css";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import { Button } from "react-bootstrap";

const Hero = ({ movies }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    console.log("Hero: movies updated!");
    console.log(movies);
  }, [movies]);

  const navigate = useNavigate();

  const reviews = (movieId) => {
    navigate(`/Reviews/${movieId}`);
  };

  return (
    <div className="movie-carousel-container">
      {movies.length > 0 ? (
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {movies.map((movie) => (
            <Carousel.Item key={movie.imdbId}>
              <Paper>
                <div className="movie-card-container">
                  <div
                    className="movie-card"
                    style={{ "--img": `url(${movie.backdrops[0]})` }}
                  >
                    <div className="movie-detail">
                      <div className="movie-poster">
                        <img src={movie.backdrops[1]} alt="Movie Poster" />
                      </div>
                      <div className="movie-title">{movie.title}</div>
                      <div className="movie-buttons-container">
                        <Link
                          to={`/Trailer/${movie.trailerLink.substring(
                            movie.trailerLink.length - 11
                          )}`}
                        >
                          <div className="play-button-icon-container">
                            <FontAwesomeIcon
                              className="play-button-icon"
                              icon={faCirclePlay}
                            />
                          </div>
                        </Link>
                        <div className="review-button-container">
                          <Button
                            variant="info"
                            onClick={() => reviews(movie.imdbId)}
                          >
                            Reviews
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h3>Please wait</h3>
      )}
    </div>
  );
};

export default Hero;
