const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.js');
const port = 3000;

// Index

app.get("/pokemon/", (req, res) => {
    res.render("index.ejs", {
        allPokemon: pokemon,
    });
});

// Show

app.get("/pokemon/:id/", (req, res) => {
    res.render("show.ejs", {
        pokemons: pokemon[req.params.id],
    })
})

app.listen(port, () => {
    console.log("listen on port", port);
})