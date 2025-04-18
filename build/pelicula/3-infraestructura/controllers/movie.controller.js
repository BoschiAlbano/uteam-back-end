"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const customError_1 = require("../../../utilities/customError");
const zod_1 = require("zod");
const movieSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "El título es requerido",
        invalid_type_error: "El título debe ser un texto",
    })
        .min(1, "El título no puede estar vacío"),
    genre: zod_1.z.string().min(1, "El género no puede estar vacío"),
});
class respose {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
class MovieController {
    constructor({ movieCasoUso }) {
        this.getMovie = async (req, res, next) => {
            const { id } = req.params;
            try {
                const movies = await this.MovieCasoUso.movieByPerson(id);
                return res
                    .status(200)
                    .json(new respose(200, "Peliculas encontradas", movies));
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.addMovieByPerson = async (req, res, next) => {
            const { id } = req.params;
            const data = req.body;
            try {
                const movie = movieSchema.parse(data);
                const result = await this.MovieCasoUso.updateMovieByPerson(id, movie);
                if (!result) {
                    return res
                        .status(404)
                        .json(new respose(404, "Error, Pelicula no agregada", {}));
                }
                return res
                    .status(200)
                    .json(new respose(200, "Peliculas agregada", result));
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                if (error instanceof zod_1.z.ZodError) {
                    return res.status(400).json(new respose(404, "Error de validacion", error.errors.map((err) => ({
                        campo: err.path.join("."),
                        mensaje: err.message,
                    }))));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.deleteMovieByPerson = async (req, res, next) => {
            const { id } = req.params;
            const { movie } = req.query;
            try {
                const result = await this.MovieCasoUso.deleteMovieByPerson(id, movie);
                if (!result) {
                    return res
                        .status(404)
                        .json(new respose(404, "Error, Pelicula no eliminada", {}));
                }
                return res
                    .status(200)
                    .json(new respose(200, "Peliculas eliminada", result));
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.MovieCasoUso = movieCasoUso;
    }
}
exports.MovieController = MovieController;
