import express from "express";
import config from "./config";
import cors from "cors";
import persona from "./persona/3-infraestructura/routes/person.route";
import movie from "./pelicula/3-infraestructura/routes/movie.route";

import handleErrors from "./middleware/handleErrors";

const app = express();

app.set("port", config.PORT);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(persona);
app.use(movie);

app.use("/", (_req, res) => {
	res.send(`<a href='${config.HOST}/persons'> /persons </a>`);
});

app.use((_req, res) => {
	res.status(404).json({
		error: "No existe la ruta",
	});
});

app.use(handleErrors);

export default app;
