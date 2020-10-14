import React, { useState, useEffect } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import MovieForm from "./Movies/MovieForm";
import AddMovieForm from "./Movies/AddMovieForm";
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const params = useParams();
  const { push } = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const removeMovie = m => {
    axios
      .delete(`http://localhost:5000/api/movies/${m.id}`)
      .then(res => {
        // setMovieList([...movieList, movieList.filter(movie => {
        //   return movie.id !== res.data;
        // })]);
        
        getMovieList();
        push('/');
      })
      .catch(err => console.error('Movie: deleteMovie: DT: Error: ', err));
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route
        path="/update-movie/:id"
      >
        <MovieForm />
      </Route>

      <Route
        path="/add-movie"
      >
        <AddMovieForm />
      </Route>

      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          removeMovie={removeMovie}
        />
      </Route>
    </>
  );
};

export default App;
