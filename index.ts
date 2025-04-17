import app from "./app";

app.listen(app.get("port"), () => {
	try {
		console.log("server on puerto", app.get("port"));
	} catch (error) {
		console.log("Error Start Server", error);
	}
});
