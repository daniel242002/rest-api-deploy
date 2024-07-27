import { movieModel } from "../models/movie.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class movieController {
  static async getAll(req, res) {
    try {
      const movies = await movieModel.getAll();
      // el controlador decide que es lo que renderiza
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getByGenre(req, res) {
    try {
      const { genre } = req.query;
      const movies = await movieModel.getByGenre({ genre });
      // el controlador decide que es lo que renderiza
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await movieModel.getId({ id });
    if (movie) {
      return res.json(movie);
    } else {
      res.status(404).send("No se pudo encontrar el recurso");
    }
  }

  static async create(req, res) {
    const result = validateMovie(req.body);

    if (result.error) {
      // tambien se podría utilizar el "422" = Unprocessable entity
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await movieModel.create({ input: result.data });

    res.status("201").json(newMovie); // actualizar la caché del cliene
  }

  static async update(req, res) {
    const result = validatePartialMovie(req.body);

    if (result.error) {
      // tambien se podría utilizar el "422" = Unprocessable entity
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updateMovie = await movieModel.update({ id, input: result.data });

    return res.json(updateMovie);
  }
}
