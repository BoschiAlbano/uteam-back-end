"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
console.log("Puerto en Entorno: ", process.env.PORT);
exports.default = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || `http://localhost:${process.env.PORT || 3000}`,
    MAX_FAVORITE_MOVIES: Number(process.env.MAX_FAVORITE_MOVIES) || 5,
};
