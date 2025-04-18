import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { MovieCasoUso } from "../../2-aplicacion/movie.casoUso";

const _router = Router();

const movieCasoUso = new MovieCasoUso();

const movieController = new MovieController({ movieCasoUso });

_router.get("/movie/person/:id", movieController.getMovie);

_router.post("/movie/person/:id", movieController.addMovieByPerson);

_router.delete("/movie/person/:id", movieController.deleteMovieByPerson);

export default _router;
