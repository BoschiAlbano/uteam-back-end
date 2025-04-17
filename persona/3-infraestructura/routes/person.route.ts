import { Router } from "express";
import { PersonController } from "../controllers/person.controller";
import { PersonCasoUso } from "../../2-aplicacion/person.casoUso";

const _router = Router();

const personCasoUso = new PersonCasoUso();

const personController = new PersonController({ personCasoUso });

_router.get("/person", personController.allPerson);

_router.get("/person/id/:id", personController.personById);

_router.get("/person/name/:name", personController.personByName);

_router.post("/person", personController.createPerson);

_router.patch("/person/:id", personController.updatePerson);

_router.delete("/person/:id", personController.deletePerson);

export default _router;
