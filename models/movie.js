import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";
const require = createRequire(import.meta.url);
const movies = require("../movies.json");

export class movieModel {
  static async getAll() {
    return movies;
  }

  static async getByGenre({ genre }) {
    if (genre) {
      const moviesFilter = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );

      return moviesFilter;
    }
  }

  static async getId({ id }) {
    const movie = movies.find((movie) => movie.id == id);
    return movie;
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(), // crea un uuid versión 4
      ...input,
    };

    // esto no sería REST, Porque estamos guardando el estado de la aplicación en memoria
    movies.push(newMovie);

    return newMovie;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => (movie.id = id));

    if (movieIndex === -1) {
      return false;
    }

    const updateMovie = { ...movies[movieIndex], ...input };

    movies[movieIndex] = updateMovie;

    return movies[movieIndex];
  }
}
