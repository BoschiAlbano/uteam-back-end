"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioCasoUso = void 0;
// import { UsuarioLoginDto } from "./Dtos/usuarioDto";
const customError_1 = require("../../utilities/customError");
class UsuarioCasoUso {
    constructor() {
        this.Login = async () => {
            try {
                return "Api Terminada";
            }
            catch (error) {
                throw new customError_1.CustomError("Error al iniciar sesión.");
            }
        };
    }
}
exports.UsuarioCasoUso = UsuarioCasoUso;
