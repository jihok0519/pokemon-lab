const express = require("express");
const pokemon = require("./models/pokemon.js");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Index
app.get("/pokemon/", (req, res) => {
	res.render("index.ejs", {
		allPokemon: pokemon,
	});
});

// New
app.get("/pokemon/new/", (req, res) => {
	res.render("new.ejs");
});

// Delete
app.delete("/pokemon/:id/", (req, res) => {
	pokemon.splice(req.params.index, 1);
	//redirect back to index route
	res.redirect("/pokemon/");
});

// Update
app.put("/pokemon/:id/", (req, res) => {
	pokemon[req.params.id] = req.body;
	//redirect to the index page
	res.redirect("/pokemon/");
});

// Create
app.post("/pokemon/", (req, res) => {
	pokemon.push(req.body);
	res.redirect("/pokemon/");
});

// Edit
app.get("/pokemon/:id/edit/", (req, res) => {
	res.render("edit.ejs", {
		pokemons: pokemon[req.params.id],
		index: req.params.id,
	});
});

// Show
app.get("/pokemon/:id/", (req, res) => {
	res.render("show.ejs", {
		pokemons: pokemon[req.params.id],
	});
});

app.listen(port, () => {
	console.log("listen on port", port);
});
