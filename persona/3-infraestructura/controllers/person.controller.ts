import { PersonCasoUso } from "../../2-aplicacion/person.casoUso";
import { z } from "zod";

// Esquema para Movie
const movieSchema = z.object({
	title: z
		.string({
			required_error: "El título es requerido",
			invalid_type_error: "El título debe ser un texto",
		})
		.min(1, "El título no puede estar vacío"),
	genre: z.string().min(1, "El género no puede estar vacío"),
});

// Esquema para Person
const personSchema = z.object({
	firstName: z.string().min(1, "El nombre no puede estar vacío"),
	lastName: z.string().min(1, "El apellido no puede estar vacío"),
	birthdate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato YYYY-MM-DD"),
	hasInsurance: z.boolean({
		required_error: "El campo hasInsurance es requerido",
		invalid_type_error: "hasInsurance debe ser true o false",
	}),
	favouriteMovies: z
		.array(movieSchema)
		.nonempty("Debe tener al menos una película favorita")
		.optional(),
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

export class PersonController {
	private readonly PersonCasoUso: PersonCasoUso;

	constructor({ personCasoUso }: { personCasoUso: PersonCasoUso }) {
		this.PersonCasoUso = personCasoUso;
	}

	public allPerson = async (_req: any, res: any, next: any) => {
		try {
			const data = await this.PersonCasoUso.allPersons();
			return res.status(200).json(data);
		} catch (error) {
			return next(new Error("Error en el servidor."));
		}
	};

	public personById = async (req: any, res: any, next: any) => {
		const { id } = req.params;

		try {
			const data = await this.PersonCasoUso.personById(id);

			if (!data) {
				return res
					.status(404)
					.json(new respose(404, "Error, Persona no encontrada.", []));
			}

			return res
				.status(200)
				.json(new respose(200, "Persona encontrada.", data));
		} catch (error) {
			return next(new Error("Error en el servidor."));
		}
	};

	public personByName = async (req: any, res: any, next: any) => {
		const { name } = req.params;
		console.log(name);
		try {
			const data = await this.PersonCasoUso.personByName(name);

			if (!data) {
				return res
					.status(404)
					.json(new respose(404, "Error, Persona no encontrada.", []));
			}

			return res
				.status(200)
				.json(new respose(200, "Persona encontrada.", data));
		} catch (error) {
			return next(new Error("Error en el servidor."));
		}
	};

	public createPerson = async (req: any, res: any, next: any) => {
		const datos = req.body;

		try {
			const validate = personSchema.parse(datos);

			const data = await this.PersonCasoUso.createPerson(validate);

			if (!data) {
				return res
					.status(404)
					.json(new respose(404, "Error, Persona no agregada.", []));
			}

			return res.status(200).json(new respose(200, "Persona agregada.", data));
		} catch (error) {
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

	public updatePerson = async (req: any, res: any, next: any) => {
		const datos = req.body;
		const { id } = req.params;

		try {
			const data = await this.PersonCasoUso.updatePerson(id, datos);

			if (!data) {
				return res
					.status(404)
					.json(
						new respose(404, `Error, Persona con id ${id} no actualizada.`, [])
					);
			}

			return res
				.status(200)
				.json(new respose(200, "Persona actualizada.", data));
		} catch (error) {
			return next(new Error("Error en el servidor."));
		}
	};

	public deletePerson = async (req: any, res: any, next: any) => {
		const { id } = req.params;

		try {
			const data = await this.PersonCasoUso.deletePerson(id);

			if (!data) {
				return res
					.status(404)
					.json(
						new respose(404, `Error, Persona con id ${id} no eliminada.`, [])
					);
			}

			return res.status(200).json(new respose(200, "Persona eliminada.", data));
		} catch (error) {
			return next(new Error("Error en el servidor."));
		}
	};
}
