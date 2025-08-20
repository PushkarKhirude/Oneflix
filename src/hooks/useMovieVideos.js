import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieVideos = (movieId) => {
  const dispatch = useDispatch();

  //fetch trailer video
  //this will fetch all the videos associated with the movie id
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    //we will filter the trailers
    const filterData = json.results.filter((video) => {
      return video.type == "Trailer";
    });
    const trailer = filterData.length ? filterData[0] : json.results[0]; //if the trailer for movie is unavailable then just take any video available
    //console.log(trailer);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieVideos;
