const express = require("express");

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
