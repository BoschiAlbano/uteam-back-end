import { db } from "../../db/db";
import { CustomError } from "../../utilities/customError";
import {
	IPerson,
	IPersonOmitId,
	IPersonPartial,
} from "../1-dominio/IPerson.entidad";

export class PersonCasoUso {
	public allPersons = async (): Promise<IPerson[]> => {
		const order = await db.sort((a, b) =>
			a.firstName < b.firstName && a.lastName < b.lastName ? -1 : 1
		);
		return order;
	};

	public personById = async (
		id: number
	): Promise<IPerson | null | undefined> => {
		const person = db.find((p) => p.id == id);
		return person;
	};

	public personByName = async (
		text: string
	): Promise<IPerson | null | undefined> => {
		const person = db.find((p) =>
			p.firstName.toLowerCase().includes(text.toLowerCase())
		);

		return person;
	};

	public createPerson = async (
		newPerson: IPersonOmitId
	): Promise<IPerson | null | undefined> => {
		const maxId = Math.max(...db.map((p) => p.id));

		const person: IPerson = {
			id: maxId + 1,
			...newPerson,
			favouriteMovies: [],
		};
		db.unshift(person);
		return person;
	};

	public updatePerson = async (
		id: number,
		PersonUpdate: IPersonPartial
	): Promise<IPerson | null | undefined> => {
		const index = db.findIndex((p) => p.id == id);

		if (index === -1) throw new CustomError("Error, persona no encontrada.");

		PersonUpdate.favouriteMovies = db[index].favouriteMovies;
		db[index] = { ...db[index], ...PersonUpdate };

		return db[index];
	};

	public deletePerson = async (
		id: number
	): Promise<IPerson | null | undefined> => {
		const index = db.findIndex((p) => p.id == id);

		if (index === -1) throw new CustomError("Error, persona no encontrada.");

		const res = { ...db[index] };

		db.splice(index, 1);

		return res;
	};
}
