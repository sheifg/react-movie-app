import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";
import { useEffect, useState } from "react";
import { useMovie } from "../context/MovieContext";

const MovieDetails = () => {
  //? useParams is easier way
  const { id } = useParams();
  // console.log(id)
  //? alternative using useLocation sending the id inside the state in <MovieCard>
  // const location = useLocation();
  // console.log(location.state.id);

  // Giving here initial value as object, the state has a value
  const [movieDetails, setMovieDetails] = useState({});
  const [videoKey, setVideoKey] = useState();

  const { getMovieDetails, IMG_API_URL, defaultImage } = useMovie();

  // Destructuring the movieDetails, first there is no details, but the values will be provided in the useEffect with getMovieDetails(id) and updating the movieDeatils with setMovieDetails with the detailsData
  const {
    title,
    poster_path,
    overview,
    release_date,
    vote_average,
    vote_count,
  } = movieDetails;

  useEffect(() => {
    const getData = async () => {
      // In detailsData it is avaiable all the info destructuring in movieDetails and in videoData it will just have the key(youtube)
      const { detailsData, videoData } = await getMovieDetails(id);
      setMovieDetails(detailsData);
      setVideoKey(videoData);
    };
    getData();
  }, []);

  console.log(videoKey);

  return (
    <div className="md:container px-10 mx-auto py-5">
      <h1 className="text-center text-3xl dark:text-slate-200"> {title}</h1>
      {/* Some movies dont have any video, for that reason it is included the conditional videoKey, so the video will be only shown if there is videoKey */}
      {videoKey && <VideoSection videoKey={videoKey} />}
      {/* container is a className and it is included it just to make the web responsive. For smallers screens we have to include additional stylings */}
      <div className="md:container flex justify-center px-10 mt-5">
        <div className="flex flex-col lg:flex-row w-2/3 rounded-lg bg-gray-100 shadow-lg dark:bg-gray-700">
          <img
            className="lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={poster_path ? `${IMG_API_URL}${poster_path}` : defaultImage}
            alt={title}
          />
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-gray-200 text-center">
                {" "}
                Overview
              </h5>
              <p className="text-gray-700 text-base mb-4 dark:text-slate-200">
                {overview}
              </p>
            </div>
            <ul className="bg-gray-100 rounded-lg border-gray-400 text-gray-900">
              <li className="flex justify-between px-6 py-2 border-b border-gray-400 w-full rounded-t-lg">
                <span className="font-semibold">Release Date</span>
                <span>{release_date}</span>
              </li>
              <li className="flex justify-between px-6 py-2 border-b border-gray-400 w-full">
                <span className="font-semibold">Rate</span>
                <span>{vote_average?.toFixed(1)}</span>
              </li>
              <li className="flex justify-between px-6 py-2 border-b border-gray-400 w-full">
                <span className="font-semibold">Total Vote</span>
                <span>{vote_count}</span>
              </li>
              <li className="px-6 py-2 border-gray-400 w-full rouned-t-lg text-center">
                <Link
                  to={-1}
                  className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
                >
                  Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
