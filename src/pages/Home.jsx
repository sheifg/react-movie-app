import { MoonLoader } from "react-spinners";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";
import { useState } from "react";

const Home = () => {
  const { movies, loading, getMovies, searchMoviesUrl } = useMovie();
  // Controlled input in the form
  const [searchTerm, setSearchTerm] = useState("");
  // To use for the conditional part of the search
  const { currentUserTracking } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();
    //! Search can be done only if there is a logged in user
    if (currentUserTracking && searchTerm)
      getMovies(`${searchMoviesUrl}${searchTerm}`);
    else if (!currentUserTracking) toast.warn("Please login to search movie");
    else toast.warn("Please enter a movie name");
  };

  // That is just for debugging
  if (movies.length == 0) {
    return (
      <h2 className="text-center text-red-500">
        No Movies, Something went wrong!
      </h2>
    );
  }

  return (
    <>
      <form className="flex justify-center p-2 my-5 " onSubmit={submitHandler}>
        <input
          type="search"
          className="w-80 form-input h-11 mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-danger-bordered">Search</button>
      </form>

      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div className="mt-48 flex justify-center items-center">
            <MoonLoader color="red" />
          </div>
        ) : (
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        )}
      </div>
    </>
  );
};

export default Home;

// <></>: if it isn't wanted to style it
// <div></div>: if it is wanted to style it
