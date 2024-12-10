import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";

const defaultImage =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const MovieCard = ({ movie }) => {
  // Using destructuring, so then it can be written id, title instead of movie.id, movie.title,.....
  const { id, poster_path, title, overview, vote_average } = movie;
  const { currentUserTracking } = useAuth();
  const { IMG_API_URL } = useMovie();
  const navigate = useNavigate();

  // Function to change the color of the vote average/rating of the movie, depending of the value of the votes
  const getVoteClass = (vote) => {
    if (vote >= 8) return "green";
    else if (vote >= 6) return "orange";
    else return "red";
  };

  return (
    <div className="movie" onClick={() => navigate(`/details/${id}`)}>
      {/* Alternative instead of using params, it can be sent inside the state
    <div className="movie" onClick={() => navigate(`/details/${id}, {state: {id}}`)}> */}
      <img
        src={poster_path ? `${IMG_API_URL}${poster_path}` : defaultImage}
        alt={title}
      />
      <div className="flex align-center justify-between p-1 text-white">
        <h5 className="p-3">{title}</h5>
        {/* Adding the conditio: the vote average can only be seen, if there is a registered user  */}
        {currentUserTracking && (
          // tag is a className that it has already been defined
          <span className={`tag ${getVoteClass(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2 className="text-center font-semibold">Overview</h2>
        <p className="text-justify">{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
