"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
// import { z } from "zod";
// const registerSchema = z.object({
// 	Nombre: z
// 		.string()
// 		.min(2, "El nombre debe tener al menos 2 caracteres")
// 		.max(50, "El nombre no puede exceder 50 caracteres")
// 		.regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
// 	Apellido: z
// 		.string()
// 		.min(2, "El apellido debe tener al menos 2 caracteres")
// 		.max(50, "El apellido no puede exceder 50 caracteres")
// 		.regex(
// 			/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
// 			"El apellido solo puede contener letras"
// 		),
// 	Dni: z
// 		.string()
// 		.length(8, "El DNI debe tener 8 dígitos")
// 		.regex(/^\d+$/, "El DNI solo puede contener números"),
// 	Email: z
// 		.string()
// 		.email("Email inválido")
// 		.max(100, "El email no puede exceder 100 caracteres"),
// 	Password: z
// 		.string()
// 		.min(8, "La contraseña debe tener al menos 8 caracteres")
// 		.max(100, "La contraseña no puede exceder 100 caracteres")
// 		.regex(/[A-Z]/, "Debe contener al menos una mayúscula")
// 		.regex(/[0-9]/, "Debe contener al menos un número")
// 		.regex(/[!@#$%^&*]/, "Debe contener al menos un carácter especial"),
// });
// const loginSchema = z.object({
// 	Email: z.string().email("Email inválido"),
// 	Password: z.string(),
// });
class UsuarioController {
    constructor({ usuarioCasoUso }) {
        this.Login = async (req, res, next) => {
            console.log("Login");
            try {
                res.status(200).json(this.UsuarioCasoUso.Login());
            }
            catch (error) {
                return next(new Error("Error en el servidor"));
            }
        };
        this.Logout = async (_req, res) => { };
        this.Register = async (req, res, next) => { };
        this.UsuarioCasoUso = usuarioCasoUso;
    }
}
exports.UsuarioController = UsuarioController;
