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
    pokemon.splice(req.params.id, 1)
	//redirect back to index route
	res.redirect("/pokemon/");
});

// Update
app.put("/pokemon/:id/", (req, res) => {
	let edittedPokemon = {
        img: req.body.img,
        name: req.body.name,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed,
        },
        type: req.body.type
    }
    pokemon[req.params.id] = edittedPokemon;
	//redirect to the index page
	res.redirect("/pokemon/");
});

// Create
app.post("/pokemon/", (req, res) => {
    let createdPokemon = {
        img: req.body.img,
        name: req.body.name,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed,
        },
        type: req.body.type
    }
	pokemon.unshift(createdPokemon);
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
