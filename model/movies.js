const mongoose = require(`mongoose`)

const movieSchema = new mongoose.Schema({
    title: String,
    comment: String
})

const Movie = mongoose.model(`Movie`, movieSchema)

module.exports = Movie