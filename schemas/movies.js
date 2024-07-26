// vamos a utilizar ésta herramienta para realizar las validaciones de nuestras peticiones
const zod = require("zod");

const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required, please checkc your URL",
  }),
  year: zod.number().int().min(1900).max(2025),
  director: zod.string(),
  duration: zod.number().int().positive(),
  rate: zod.number().min(0).max(10).default(5),
  poster: zod.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: zod.array(
    zod.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
    {
      required_error: "Movie genre is required",
      invalid_type_error: "Movie genre must be an array of enum genre",
    }
  ),
});

const validateMovie = (object) => {
  // lo que hace es devolver un objeto resolve que te va decir si hay un error o si hay datos
  return movieSchema.safeParse(object);
};

const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object);
};

module.exports = {
  validateMovie,
  validatePartialMovie,
};

const saludo = () => {
  console.log(saludo);
};
