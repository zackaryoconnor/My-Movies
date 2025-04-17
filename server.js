const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const Movie = require(`./model/movies.js`)
const apiKey = `&apikey=${process.env.OMDB_API_KEY}`

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride(`_method`))
app.use(morgan(`dev`))
app.use(express.static(`public`))




// Connect to database
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on(`connected`, () => { 
    console.log(`Conntected to Databse`)
})




// Display all movies
app.get(`/`, async (request, response) => {
    const allMovies = await Movie.find()
    response.render(`index.ejs`, {
        movies: allMovies
    })
})




// Create
app.post(`/`, async (request, response) => {
    const movieTitle = await request.body.title
    const movieData = await fetchData(movieTitle)

    await Movie.create(
        {
            title: movieData.Title,
            poster: movieData.Poster,
            year: movieData.Year,
            rated: movieData.Rated,
            runtime: movieData.Runtime,
            genre: movieData.Genre,
            director: movieData.Director,
            actors: movieData.Actors,
            plot: movieData.Plot
        }
    )

    response.redirect(request.get('referer'))
});




// Fetch API
const fetchData = async (movieTitle) => {
    const url = `http://www.omdbapi.com/?t=${movieTitle}${apiKey}`

    const response = await fetch(url)
    const data = await response.json()
    return data
}




// Read
app.get(`/movieDetails/:movieId`, async (request, response) => {
    const selectedMovie = await Movie.findById(request.params.movieId)
    response.render(`movieDetails.ejs`, {
        movie: selectedMovie
    })
})




// Update
app.put(`/movieDetails/:movieId`, async (request, response) => {
    await Movie.findByIdAndUpdate(request.params.movieId, request.body)

    response.redirect(request.get('referer'))
})




// Delete
app.delete(`/movieDetails/:movieId`, async (request, response) => {
    await Movie.findByIdAndDelete(request.params.movieId)
    response.redirect(`/`)
})




app.listen(3001, () => {
    console.log(`Listening on port 3001`)
})
