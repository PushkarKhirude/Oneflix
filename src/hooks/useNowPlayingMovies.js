import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  //fetch data from TMDB API
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1&with_keywords=anime",
      //"https://api.themoviedb.org/3/search/tv?query=dandadan&include_adult=true&page=1",
      //"https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_keywords=anime",
      //'https://api.themoviedb.org/3/discover/tv?language=ja&page=1&sort_by=popularity.desc&with_genres=16&with_origin_country=JP'
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
