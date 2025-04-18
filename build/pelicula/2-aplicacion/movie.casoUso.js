"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieCasoUso = void 0;
const db_1 = require("../../db/db");
const customError_1 = require("../../utilities/customError");
const config_1 = __importDefault(require("../../config"));
class MovieCasoUso {
    constructor() {
        this.movieByPerson = async (id) => {
            const res = db_1.db.find((f) => f.id == id)?.favouriteMovies;
            if (!res)
                throw new customError_1.CustomError("Error, persona no encontrada");
            return res;
        };
        this.updateMovieByPerson = async (id, movie) => {
            const index = db_1.db.findIndex((f) => f.id == id);
            if (index === -1)
                throw new customError_1.CustomError("Error, persona no encontrada");
            if (db_1.db[index].favouriteMovies?.length &&
                db_1.db[index].favouriteMovies.length >= config_1.default.MAX_FAVORITE_MOVIES) {
                throw new customError_1.CustomError(`Error, no se pueden agregar más de ${config_1.default.MAX_FAVORITE_MOVIES} peliculas`);
            }
            db_1.db[index].favouriteMovies?.push(movie);
            return db_1.db[index].favouriteMovies;
        };
        this.deleteMovieByPerson = async (id, text) => {
            const indexPerson = db_1.db.findIndex((f) => f.id == id);
            if (indexPerson === -1)
                throw new customError_1.CustomError("Error, persona no encontrada");
            const indexMovie = db_1.db[indexPerson].favouriteMovies?.findIndex((f) => f.title.toLowerCase().includes(text.toLowerCase()));
            if (indexMovie === -1 || indexMovie === undefined)
                throw new customError_1.CustomError("Error, pelicula no encontrada");
            const movieDeleteCopy = {
                ...db_1.db[indexPerson].favouriteMovies?.[indexMovie],
            };
            // Eliminar la pelicula
            db_1.db[indexPerson].favouriteMovies?.splice(indexMovie, 1);
            return {
                genre: movieDeleteCopy.genre ?? "",
                title: movieDeleteCopy.title ?? "",
            };
        };
    }
}
exports.MovieCasoUso = MovieCasoUso;
