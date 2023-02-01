//file that the server runs through

const express = require("express");
const app = express(); //our server app
const mysql = require("mysql2"); //use mysql2
const cors = require("cors"); //allow resource sharing

const db = mysql.createPool({//database connection
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodecrud",
});

app.use(cors()); //allow sharing resources between webpages

app.use(express.urlencoded({ extended: true })); //instead of bodyparser
app.use(express.json()); //parse requests containing json

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
  //res.send("Hello William");
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;//when sending as object use body
  const movieReview = req.body.movieReview;
  //^making an object to send both fields to the db
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result); //2 variables so use array
  });
  res.send("Hello William. This is the insert route of your backend");
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;//when sending as template literal use params
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
  
  db.query(sqlDelete, name, (err, result) => {
    
    err && console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
  
  db.query(sqlUpdate, [review, name], (err, result) => {
    console.log(name)
    err && console.log(err);
  });
});


app.get("/", (req, res) => {
  res.send("Server main page");
});

//app.get("/", (req, res) => {//home page empty here so front end fills it
//pass the route, then req, res params.
//res is the response to front. req is for pulling
//from the front end

/*
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');"
    db.query(sqlInsert, (err, result) => {//insert review into db. if it inserts the function is called and sends the message to homescreen
      res.send("hello william");
    });*/

//res.send("hello wilim");
//});

/**
in package.json create custom scripts to run node and nodemon.
nodemon will automatically restart the server after a change is made  */

app.listen(3001, () => {
  console.log("running on port 3001");
});
/*start server in terminal with command: node index.s
-restart server with this command after every change to reserver

*/
