import { Router } from "express";
import { UsuarioController } from "../controllers/person.controller";
import { UsuarioCasoUso } from "../../2-aplicacion/person.casoUso";

const _router = Router();

const usuarioCasoUso = new UsuarioCasoUso();

const usuarioController = new UsuarioController({ usuarioCasoUso });

_router.get("/person", usuarioController.allPerson);

_router.get("/person/id/:id", usuarioController.personById);

_router.get("/person/name/:name", usuarioController.personByName);

_router.post("/person", usuarioController.createPerson);

_router.patch("/person/:id", usuarioController.updatePerson);

_router.delete("/person/:id", usuarioController.deletePerson);

export default _router;
