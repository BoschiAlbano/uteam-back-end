import { IPerson } from "../persona/1-dominio/IPerson.entidad";

export const db: IPerson[] = [
	{
		id: 1,
		firstName: "pablo",
		lastName: "lamberti",
		birthdate: "1987-04-03",
		hasInsurance: false,
		favouriteMovies: [
			{
				title: "The Lord of the Rings",
				genre: "fantasy",
			},
			{
				title: "Pulp Fiction",
				genre: "action",
			},
		],
	},
];
