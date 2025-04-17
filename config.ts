import { config } from "dotenv";

config();

console.log("Puerto en Entorno: ", process.env.PORT);

export default {
	PORT: process.env.PORT || 3000,
	HOST: process.env.HOST || `http://localhost:${process.env.PORT || 3000}`,
};
