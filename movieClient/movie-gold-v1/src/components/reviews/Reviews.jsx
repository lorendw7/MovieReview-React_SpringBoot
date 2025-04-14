import React, { useEffect, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router";
import api from "../../api/axiosConfig";
import ReviewForm from "../reviewForm/ReviewForm";
import "./Reviews.css";

const Reviews = ({ movie, getAMovie, reviews, setReviews }) => {
  const revText = useRef();
  let param = useParams();
  const movieId = param.movieId;

  useEffect(() => {
    getAMovie(movieId);
  }, [movieId]);

  const addReview = async () => {
    try {
        const reponse = await api.post("api/v1/reviews", {
          reviewBody: revText.current.value,
          imdbId: movieId,
        });
        console.log("addReview", reponse);
        if (reponse.status === 201) {
          const newReviews = [...reviews, reponse.data];
          revText.current.value = "";
          console.log(newReviews);
          setReviews(newReviews);
        }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="movie-poster">
          <img src={movie?.backdrops[7]} alt="Movie Poster" />
        </Col>
        <Col>
          <div>
            <Row>
              <Col>
                <ReviewForm
                  handleSubmit={addReview}
                  revText={revText}
                  labelText="Write a Review?"
                  defaultValue=""
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </div>
          {reviews.length > 0 ? (
            reviews.map((r, index) => {
              return (
                <div key={index}>
                  <Row>
                    <Col>{r.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </div>
              );
            })
          ) : (
            <h3>There aren't any reviews yet.</h3>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
