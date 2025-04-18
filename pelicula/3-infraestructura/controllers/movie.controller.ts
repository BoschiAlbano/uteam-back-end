import { CustomError } from "../../../utilities/customError";
import { MovieCasoUso } from "../../2-aplicacion/movie.casoUso";
import { z } from "zod";

const movieSchema = z.object({
	title: z
		.string({
			required_error: "El título es requerido",
			invalid_type_error: "El título debe ser un texto",
		})
		.min(1, "El título no puede estar vacío"),
	genre: z.string().min(1, "El género no puede estar vacío"),
});

interface Iresponse {
	status: number;
	message: string;
	data: object;
}
class respose implements Iresponse {
	constructor(status: number, message: string, data: object) {
		this.status = status;
		this.message = message;
		this.data = data;
	}

	status: number;
	message: string;
	data: object;
}

export class MovieController {
	private readonly MovieCasoUso: MovieCasoUso;

	constructor({ movieCasoUso }: { movieCasoUso: MovieCasoUso }) {
		this.MovieCasoUso = movieCasoUso;
	}

	public getMovie = async (req: any, res: any, next: any) => {
		const { id } = req.params;

		try {
			const movies = await this.MovieCasoUso.movieByPerson(id);

			return res
				.status(200)
				.json(new respose(200, "Peliculas encontradas", movies));
		} catch (error) {
			if (error instanceof CustomError) {
				return res.status(400).json(new respose(400, error.message, {}));
			}

			return next(new Error("Error en el servidor."));
		}
	};

	public addMovieByPerson = async (req: any, res: any, next: any) => {
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
		} catch (error) {
			if (error instanceof CustomError) {
				return res.status(400).json(new respose(400, error.message, {}));
			}

			if (error instanceof z.ZodError) {
				return res.status(400).json(
					new respose(
						404,
						"Error de validacion",
						error.errors.map((err) => ({
							campo: err.path.join("."),
							mensaje: err.message,
						}))
					)
				);
			}
			return next(new Error("Error en el servidor."));
		}
	};

	public deleteMovieByPerson = async (req: any, res: any, next: any) => {
		const { id } = req.params;
		const { movie } = req.query;

		try {
			const result = await this.MovieCasoUso.deleteMovieByPerson(
				id,
				movie as string
			);

			if (!result) {
				return res
					.status(404)
					.json(new respose(404, "Error, Pelicula no eliminada", {}));
			}

			return res
				.status(200)
				.json(new respose(200, "Peliculas eliminada", result));
		} catch (error) {
			if (error instanceof CustomError) {
				return res.status(400).json(new respose(400, error.message, {}));
			}
			return next(new Error("Error en el servidor."));
		}
	};
}
