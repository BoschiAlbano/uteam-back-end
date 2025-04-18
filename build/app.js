"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const person_route_1 = __importDefault(require("./persona/3-infraestructura/routes/person.route"));
const movie_route_1 = __importDefault(require("./pelicula/3-infraestructura/routes/movie.route"));
const handleErrors_1 = __importDefault(require("./middleware/handleErrors"));
const app = (0, express_1.default)();
app.set("port", config_1.default.PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(person_route_1.default);
app.use(movie_route_1.default);
app.use("/", (_req, res) => {
    res.send(`<a href='${config_1.default.HOST}/persons'> /persons </a>`);
});
app.use((_req, res) => {
    res.status(404).json({
        error: "No existe la ruta",
    });
});
app.use(handleErrors_1.default);
exports.default = app;
