const express = require("express");
const Joi = require("joi");
//lets call the created express object

const app = express();
//here we are adding a piece of middleware
app.use(express.json());

const genres = [
	{ id: 1, name: "genre1" },
	{ id: 2, name: "genre2" },
	{ id: 3, name: "genre3" },
];

app.get("/", (req, res) => {
	res.send("Hello genre");
});

app.get("/api/genres", (req, res) => {
	res.send(genres);
});

app.post("/api/genres", (req, res) => {
	const { error } = schema.validate(req.body);
	res.send(validation);

	if (error) return res.status(400).send(error.details[0].message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name,
	};

	genres.push(genre);
	res.send(genre);
});

app.get("/api/genres/:id", (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send("No such genre");
	res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send("No such genre");

	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	const { error } = schema.validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	genre.name = req.body.name;

	res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send("No such genre");

	//delete a genre

	const index = courses.indexOf(genre);

	courses.splice(index, 1);

	res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate(genre);
}
