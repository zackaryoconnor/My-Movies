const mongoose = require(`mongoose`)

const movieSchema = new mongoose.Schema({
    title: String,
    poster: String,
    year: String,
    rated: String,
    runtime: String,
    genre: String,
    director: String,
    actors: String,
    plot: String,
    comment: String
})

const Movie = mongoose.model(`Movie`, movieSchema)

module.exports = Movie
