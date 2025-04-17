import { CustomError } from "../../utilities/customError";
import {
	IPerson,
	IPersonOmitId,
	IPersonPartial,
} from "../1-dominio/IPerson.entidad";

const db: IPerson[] = [
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
	{
		id: 2,
		firstName: "Albano",
		lastName: "Boschi",
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

export class UsuarioCasoUso {
	public allPersons = async (): Promise<IPerson[]> => {
		try {
			const order = await db.sort((a, b) =>
				a.firstName < b.firstName && a.lastName < b.lastName ? -1 : 1
			);
			return order;
		} catch (error) {
			throw new CustomError("Error");
		}
	};

	public personById = async (
		id: number
	): Promise<IPerson | null | undefined> => {
		try {
			const person = db.find((p) => p.id == id);
			return person;
		} catch (error: any) {
			throw new CustomError("Error, persona no encontrada.");
		}
	};

	public personByName = async (
		text: string
	): Promise<IPerson | null | undefined> => {
		try {
			const person = db.find((p) =>
				p.firstName.toLowerCase().includes(text.toLowerCase())
			);

			return person;
		} catch (error) {
			throw new CustomError("Error, persona no encontrada.");
		}
	};

	public createPerson = async (
		newPerson: IPersonOmitId
	): Promise<IPerson | null | undefined> => {
		try {
			const maxId = Math.max(...db.map((p) => p.id));

			const person = { id: maxId + 1, ...newPerson };
			db.unshift(person);
			return person;
		} catch (error) {
			throw new CustomError("Error, persona no encontrada.");
		}
	};

	public updatePerson = async (
		id: number,
		PersonUpdate: IPersonPartial
	): Promise<IPerson | null | undefined> => {
		try {
			const index = db.findIndex((p) => p.id == id);

			if (index === -1) return null;

			db[index] = { ...db[index], ...PersonUpdate };

			return db[index];
		} catch (error) {
			throw new CustomError("Error, persona no encontrada.");
		}
	};

	public deletePerson = async (
		id: number
	): Promise<IPerson | null | undefined> => {
		try {
			const index = db.findIndex((p) => p.id == id);

			if (index === -1) return null;

			const res = { ...db[index] };

			db.splice(index, 1);

			return res;
		} catch (error) {
			throw new CustomError("Error, persona no encontrada.");
		}
	};
}
