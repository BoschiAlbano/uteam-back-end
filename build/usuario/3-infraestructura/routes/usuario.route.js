"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const usuario_casoUso_1 = require("../../2-aplicacion/usuario.casoUso");
const _router = (0, express_1.Router)();
// iniciamos caso de uso
const usuarioCasoUso = new usuario_casoUso_1.UsuarioCasoUso();
// Iniciar usuario controller
const usuarioController = new usuario_controller_1.UsuarioController({ usuarioCasoUso });
// rutas
_router.post("/login", usuarioController.Login);
_router.post("/register", usuarioController.Register);
_router.post("/logout", usuarioController.Logout);
exports.default = _router;
