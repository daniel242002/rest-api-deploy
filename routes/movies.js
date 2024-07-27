import { Router } from "express";
import { movieController } from "../controllers/movies.js";
export const moviesRouter = Router();

// 1. RECUPERAR TODAS LAS PELICULAS
moviesRouter.get("/", movieController.getAll);

// 2. RECUPERAR PELÍCULAS POR GÉNERO
moviesRouter.get("/genres", movieController.getByGenre);

// 3. RECUPERAR PELÍCULAS POR ID
moviesRouter.get("/:id", movieController.getById);

// 4. CREAR UNA PELÍCULA
moviesRouter.post("/", movieController.create);

// 5. ACTUALIZAR UNA PELÍCULA
moviesRouter.patch("/:id", movieController.update);
