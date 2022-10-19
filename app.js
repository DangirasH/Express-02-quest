const express = require("express");
require("dotenv").config();
const { validateMovie, validateUser } = require("./validators.js");

const app = express();
app.use(express.json());
const mysql = require("mysql2/promise");
const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/user", userHandlers.getUsers);
app.get("/api/user/:id", userHandlers.getUsersById);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", userHandlers.updateUser);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, userHandlers.postUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
