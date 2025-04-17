export interface IMovie {
	title: string;
	genre: string;
}

export interface IPerson {
	id: number;
	firstName: string;
	lastName: string;
	birthdate: string;
	hasInsurance: boolean;
	favouriteMovies?: IMovie[];
}

export type IPersonOmitId = Omit<IPerson, "id">;

export type IPersonPartial = Partial<IPerson>;
