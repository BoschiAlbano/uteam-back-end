// import { Movie } from "../../pelicula/1-dominio/movie.entidad";
import { IPerson } from "./IPerson.entidad";

export class Person implements IPerson {
	constructor(
		public id: number,
		public firstName: string,
		public lastName: string,
		public birthdate: string,
		public hasInsurance: boolean
	) // public favouriteMovies: Movie[]
	{}
}
