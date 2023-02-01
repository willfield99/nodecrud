import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    //showing the movies and their reviews
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    //connecting to our 3001 local api
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([//useEffect will update the state with a set method
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  }; //updating movie list to include the submitted element

  return (
    <div className="App">
      <h1> Hiya </h1>

      <div className="form">
        <label> Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }} //connecting the button to our state
        />
        <label> Movie Review: </label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}> Submit </button>
        {movieReviewList.map((val) => {
          return (
            <h1>
              Movie Name: {val.movieName} | Movie Review: {val.movieReview}{" "}
            </h1>
          );
        })}
      </div>
    </div>
  );
}

export default App;
