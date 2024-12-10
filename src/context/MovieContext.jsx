import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

const API_KEY = import.meta.env.VITE_MOVIE_APIKEY;

// URLs
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_API_URL = "https://image.tmdb.org/t/p/w1280";
const discoverMoviesUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
const searchMoviesUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;
// when the movie has no image, this image will be shown
const defaultImage =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  // For the loading part while the info is coming from the API
  // That state is also mandatory when you use an spinner from react-spinners: loading
  const [loading, setLoading] = useState(false);

  const getMovies = async (URL) => {
    // It is included in the useEffect, so it is not necessary to use it here
    // setLoading(true);
    try {
      const { data } = await axios.get(URL);
      setMovies(data.results);
    } catch (error) {
      console.log(error);
      // finally is a commom part for the function, if the try or catch is successful or failed, it will go anyway to finally
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMovies(discoverMoviesUrl);
  }, []);

  // https://developer.themoviedb.org/docs/search-and-query-for-details#query-for-details

  const getMovieDetails = async (id) => {
    //? 1- If the API would not allow to get the video info in the movie details and it is needed another API to fetching the video info
    // const movieDetailsUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    // const videoUrl = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;

    //! 2 -The API allows to take the video info adding append_to_response=videos, so it can be included it ->
    const movieDetailsUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
    // const videoUrl = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;

    try {
      //? 1 way with 2 API, in case one is not enough to get all the needed details(including video info)
      // To fetch the movie details there is an API
      // const { data: detailsData } = await axios.get(movieDetailsUrl);
      // To fetch the video info there is another API
      // IMPORTANT!! Second fetch is not needed any more as it can have video keys in movieDeatils thanks to adding append_to_response=videos parameter to the URL
      // const { data: videoData } = await axios.get(videoUrl);

      //! 2 way with the API taking all the needed details(including video info)
      const { data: detailsData } = await axios.get(movieDetailsUrl);

      //? 1 way
      // return { detailsData, videoData: videoData.results[0].key };

      //! 2 way with the API taking all the needed details(including video info)
      // key is needed to use in the Youtube to see the video
      return { detailsData, videoData: detailsData.videos.results[0].key };
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    movies,
    loading,
    getMovies,
    IMG_API_URL,
    defaultImage,
    searchMoviesUrl,
    getMovieDetails,
  };
  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
