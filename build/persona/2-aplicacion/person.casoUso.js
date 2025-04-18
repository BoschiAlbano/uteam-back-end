"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCasoUso = void 0;
const db_1 = require("../../db/db");
const customError_1 = require("../../utilities/customError");
class PersonCasoUso {
    constructor() {
        this.allPersons = async () => {
            const order = await db_1.db.sort((a, b) => a.firstName < b.firstName && a.lastName < b.lastName ? -1 : 1);
            return order;
        };
        this.personById = async (id) => {
            const person = db_1.db.find((p) => p.id == id);
            return person;
        };
        this.personByName = async (text) => {
            const person = db_1.db.find((p) => p.firstName.toLowerCase().includes(text.toLowerCase()));
            return person;
        };
        this.createPerson = async (newPerson) => {
            const maxId = Math.max(...db_1.db.map((p) => p.id));
            const person = {
                id: maxId + 1,
                ...newPerson,
                favouriteMovies: [],
            };
            db_1.db.unshift(person);
            return person;
        };
        this.updatePerson = async (id, PersonUpdate) => {
            const index = db_1.db.findIndex((p) => p.id == id);
            if (index === -1)
                throw new customError_1.CustomError("Error, persona no encontrada.");
            PersonUpdate.favouriteMovies = db_1.db[index].favouriteMovies;
            db_1.db[index] = { ...db_1.db[index], ...PersonUpdate };
            return db_1.db[index];
        };
        this.deletePerson = async (id) => {
            const index = db_1.db.findIndex((p) => p.id == id);
            if (index === -1)
                throw new customError_1.CustomError("Error, persona no encontrada.");
            const res = { ...db_1.db[index] };
            db_1.db.splice(index, 1);
            return res;
        };
    }
}
exports.PersonCasoUso = PersonCasoUso;
