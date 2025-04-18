"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioLoginDto = exports.UsuarioRegisterDto = exports.UsuarioDto = void 0;
class UsuarioDto {
    constructor(usuarioRegister) {
        this.Nombre = usuarioRegister.Nombre;
        this.Apellido = usuarioRegister.Apellido;
        this.Dni = usuarioRegister.Dni;
        this.Email = usuarioRegister.Email;
        this.Password = usuarioRegister.Nombre;
    }
}
exports.UsuarioDto = UsuarioDto;
class UsuarioRegisterDto {
    constructor(usuarioRegister) {
        this.Nombre = usuarioRegister.Nombre;
        this.Apellido = usuarioRegister.Apellido;
        this.Dni = usuarioRegister.Dni;
        this.Email = usuarioRegister.Email;
        this.Password = usuarioRegister.Nombre;
    }
}
exports.UsuarioRegisterDto = UsuarioRegisterDto;
class UsuarioLoginDto {
    constructor(usuarioLogin) {
        this.Email = usuarioLogin.Email;
        this.Password = usuarioLogin.Password;
    }
}
exports.UsuarioLoginDto = UsuarioLoginDto;
