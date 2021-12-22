const express = require("express");
const Joi = require("joi");
//lets call the created express object

const app = express();
//here we are adding a piece of middleware
app.use(express.json());

const courses = [
	{ id: 1, name: "course1" },
	{ id: 2, name: "course2" },
	{ id: 3, name: "course3" },
];

app.get("/", (req, res) => {
	res.send("Hello Node");
});

app.get("/api/courses", (req, res) => {
	res.send(courses);
});

app.post("/api/courses", (req, res) => {
	//joi validations
	// const schema = {
	// 	name: Joi.string().min(3).required(),
	// };

	// const result = Joi.validate(req.body, schema);
	// console.log(result);

	//newer version of join

	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	const validation = schema.validate(req.body);
	res.send(validation);

	console.log(validation);

	//validations
	if (validation.error) {
		//400 bad request
		res.status(400).send(validation.error.details[0].message);
		return;
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};

	courses.push(course);
	res.send(course);
});

//retrieving a single courses

app.get("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send("No such course");
	res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send("No such course");

	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	const validation = schema.validate(req.body);
	if (validation.error) {
		//400 bad request
		res.status(400).send(validation.error.details[0].message);
		return;
	}

	course.name = req.body.name;

	res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
