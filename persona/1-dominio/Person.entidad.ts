import { IMovie, IPerson } from "./IPerson.entidad";

export class Movie implements IMovie {
	constructor(public title: string, public genre: string) {}
}

export class Person implements IPerson {
	constructor(
		public id: number,
		public firstName: string,
		public lastName: string,
		public birthdate: string,
		public hasInsurance: boolean,
		public favouriteMovies: Movie[]
	) {}
}
