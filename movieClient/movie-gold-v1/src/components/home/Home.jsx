import React, { useEffect } from "react";
import Hero from "../hero/Hero";

const Home = ({ movies }) => {
  useEffect(() => {
    console.log("Home: movies updated!");
  }, [movies]);
  return <Hero movies={movies} key={movies.length} />;
};

export default Home;
