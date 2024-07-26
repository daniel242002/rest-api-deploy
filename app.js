const express = require("express");
const crypto = require("node:crypto");
const app = express();
const port = process.env.PORT ?? 3000;
const movies = require("./movies.json");
// vamos a utilizar ésta herramienta para realizar las validaciones de nuestras peticiones
const zod = require("zod");
const { validateMovie, validatePartialMovie } = require("./schemas/movies");

app.use(express.json());

app.disable("x-powerd-by"); // deshabilitar el header 'x-powered-by : Express'

// app.get("/", (req, res) =>
//   res.send("Bienvenido a nnuestra página de películas")
// );

// ver imagen de la definición de Api REST(ApiRest-definition.png)

// 1.RECUPERAR TODAS LAS PELICULAS

// todos los recursos que sean MOVIES se identifican con "/movies"
// app.get("/movies", (req, res) => {
//   // leer el query param de format, ejemplo: if(res.format === 'html') { convertimos el formato json a html }

//   res.json(movies);
// });

// 2. RECUPERAR PELICULAR POR ID

// path-to-regexp
// app.get("/movies/:id", (req, res) => {
//   const { id } = req.params;
//   const movie = movies.find((movie) => movie.id == id);
//   if (movie) {
//     res.json(movie);
//   } else {
//     res.status(404).send("No se pudo encontrar el recurso");
//   }
// });

// 3. RECUPERAR PELICULA POR GENERO

const ACCEPTED_ORIGINS = [
  "http://localhost:8080/movies",
  "http://localhost:5050/movies",
  "http://127.0.0.1:5500",
];

// query string
app.get("/movies", (req, res) => {
  // ORIGIN
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { genre } = req.query;

  if (genre) {
    const moviesFilter = movies.filter((movie) => movie.genre.includes(genre));

    return res.json(moviesFilter);
  }

  res.json(movies);
});

// -------- POST -----------

// CREAR UNA PELICULA
app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    // tambien se podría utilizar el "422" = Unprocessable entity
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // crea un uuid versión 4
    ...result.data,
  };

  // esto no sería REST, Porque estamos guardando el estado de la aplicación en memoria
  movies.push(newMovie);

  res.status("201").json(newMovie); // actualizar la caché del cliene
});

// -------- PATCH -----------

// 1. ACTUALIZAR UNA PELÍCULA
// http://localhost:3000/movies/:id

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (result.error) {
    // tambien se podría utilizar el "422" = Unprocessable entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => (movie.id = id));

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = { ...movies[movieIndex], ...result.data };

  console.log({ ...movies[movieIndex] });
  console.log("------------------------");
  console.log({ ...result.data });

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
