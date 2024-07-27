import express, { json } from "express";
import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";
const port = process.env.PORT ?? 3000;
const app = express();

app.use(json());
app.use(corsMiddleware());
app.use("/movies", moviesRouter);
app.disable("x-powerd-by");

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
