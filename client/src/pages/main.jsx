import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Main = () => {
  const [movieName, setMovieName] = useState(""); //user submitted name and review in our form
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    //showing the movies and their reviews
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
      //console.log(response.data);
    });
  }, [movieReviewList]);
  /*
Use effect first parameter. Callback function. Gets called hwne first mounting
Second parameter. Array containing component who's state we track
If the component changes, callback function is run.
If we only want callback to run during mounting, pass an empty array.
THIS IS AWESOME..
  */

  const submitReview = () => {
    //connecting to our 3001 local api
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      //useEffect will update the state with a set method
      ...movieReviewList, //updating by directly inserting into the original list. A different list is new list is shown when the page is updated and pulls from the db
      { movieName: movieName, movieReview: review },
    ]);
  }; //updating movie list to include the submitted element

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
    //js template literals uses back ticks
   /* Axios.get("http://localhost:3001/api/get").then((response) => {
        setMovieList(response.data);
  });
  */
   /* const index = movieReviewList.indexOf(id);
    console.log(index);
    setMovieList(movieReviewList.splice(index, 1));
    */
  };

  const updateReview = (val) => {
    Axios.put("http://localhost:3001/api/update", {
      id: val.id, //sending our object to the back end
      movieReview: newReview,
    });

    setNewReview(""); //clearing newReview to be blank for the next update
    setMovieList(movieReviewList);
  };
  return (
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
          <div className="post" key={val.id}>
            <h1>{val.movieName}</h1> <p>{val.movieReview}</p>
            <button
              onClick={() => {
                deleteReview(val.id);
              }}
            >
              Delete
            </button>
            <input
              type="text"
              id="updateInput"
              onChange={(e) => {
                setNewReview(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updateReview(val);//if the function takes in the value must create an empty function. otherwise it ispassed down without parentheses
              }}
            >
              {" "}
              Change review
            </button>
          </div>
        );
      })}
      
    </div>
  );
};
