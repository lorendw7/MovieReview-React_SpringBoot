import { useParams } from "react-router";
import ReactPlayer from "react-player";
import "./Trailer.css";

const Trailer = () => {
  const params = useParams();
  const key = params.tyTrailerId;

  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer
          controls="true"
          playing={true}
          url={`https://www.youtube.com/watch?v=${key}`}
          width="100%"
          height="100%"
        />
      ) : null}
    </div>
  );
};

export default Trailer;
