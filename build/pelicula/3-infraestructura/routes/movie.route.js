"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
const movie_casoUso_1 = require("../../2-aplicacion/movie.casoUso");
const _router = (0, express_1.Router)();
const movieCasoUso = new movie_casoUso_1.MovieCasoUso();
const movieController = new movie_controller_1.MovieController({ movieCasoUso });
_router.get("/movie/person/:id", movieController.getMovie);
_router.post("/movie/person/:id", movieController.addMovieByPerson);
_router.delete("/movie/person/:id", movieController.deleteMovieByPerson);
exports.default = _router;
