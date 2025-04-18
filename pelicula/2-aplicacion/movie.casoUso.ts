import { db } from "../../db/db";
import { CustomError } from "../../utilities/customError";
import { IMovie } from "../1-dominio/IMovie.entidad";
import config from "../../config";

export class MovieCasoUso {
	public movieByPerson = async (id: number): Promise<IMovie[]> => {
		const res = db.find((f) => f.id == id)?.favouriteMovies;

		if (!res) throw new CustomError("Error, persona no encontrada");

		return res;
	};

	public updateMovieByPerson = async (
		id: number,
		movie: IMovie
	): Promise<IMovie[] | null | undefined> => {
		const index = db.findIndex((f) => f.id == id);

		if (index === -1) throw new CustomError("Error, persona no encontrada");

		if (
			db[index].favouriteMovies?.length &&
			db[index].favouriteMovies.length >= config.MAX_FAVORITE_MOVIES
		) {
			throw new CustomError(
				`Error, no se pueden agregar más de ${config.MAX_FAVORITE_MOVIES} peliculas`
			);
		}

		db[index].favouriteMovies?.push(movie);

		return db[index].favouriteMovies;
	};

	public deleteMovieByPerson = async (
		id: number,
		text: string
	): Promise<IMovie | null | undefined> => {
		const indexPerson = db.findIndex((f) => f.id == id);

		if (indexPerson === -1)
			throw new CustomError("Error, persona no encontrada");

		const indexMovie = db[indexPerson].favouriteMovies?.findIndex((f) =>
			f.title.toLowerCase().includes(text.toLowerCase())
		);

		if (indexMovie === -1 || indexMovie === undefined)
			throw new CustomError("Error, pelicula no encontrada");

		const movieDeleteCopy = {
			...db[indexPerson].favouriteMovies?.[indexMovie],
		};

		// Eliminar la pelicula
		db[indexPerson].favouriteMovies?.splice(indexMovie, 1);

		return {
			genre: movieDeleteCopy.genre ?? "",
			title: movieDeleteCopy.title ?? "",
		};
	};
}
