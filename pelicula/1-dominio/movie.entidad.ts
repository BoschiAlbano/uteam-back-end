import { IMovie } from "./IMovie.entidad";

export class Movie implements IMovie {
	constructor(public title: string, public genre: string) {}
}
