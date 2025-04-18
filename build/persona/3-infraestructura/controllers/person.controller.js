"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonController = void 0;
const customError_1 = require("../../../utilities/customError");
const zod_1 = require("zod");
// Esquema para Person
const personSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "El nombre no puede estar vacío"),
    lastName: zod_1.z.string().min(1, "El apellido no puede estar vacío"),
    birthdate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato YYYY-MM-DD"),
    hasInsurance: zod_1.z.boolean({
        required_error: "El campo hasInsurance es requerido",
        invalid_type_error: "hasInsurance debe ser true o false",
    }),
});
class respose {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
class PersonController {
    constructor({ personCasoUso }) {
        this.allPerson = async (_req, res, next) => {
            try {
                const data = await this.PersonCasoUso.allPersons();
                return res
                    .status(200)
                    .json(new respose(200, "Personas encontradas.", data));
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.personById = async (req, res, next) => {
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
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.personByName = async (req, res, next) => {
            const { name } = req.params;
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
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.createPerson = async (req, res, next) => {
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
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    return res.status(400).json(new respose(404, "Error de validacion", error.errors.map((err) => ({
                        campo: err.path.join("."),
                        mensaje: err.message,
                    }))));
                }
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.updatePerson = async (req, res, next) => {
            const datos = req.body;
            const { id } = req.params;
            try {
                const data = await this.PersonCasoUso.updatePerson(id, datos);
                if (!data) {
                    return res
                        .status(404)
                        .json(new respose(404, `Error, Persona con id ${id} no actualizada.`, []));
                }
                return res
                    .status(200)
                    .json(new respose(200, "Persona actualizada.", data));
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.deletePerson = async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await this.PersonCasoUso.deletePerson(id);
                if (!data) {
                    return res
                        .status(404)
                        .json(new respose(404, `Error, Persona con id ${id} no eliminada.`, []));
                }
                return res.status(200).json(new respose(200, "Persona eliminada.", data));
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return res.status(400).json(new respose(400, error.message, {}));
                }
                return next(new Error("Error en el servidor."));
            }
        };
        this.PersonCasoUso = personCasoUso;
    }
}
exports.PersonController = PersonController;
