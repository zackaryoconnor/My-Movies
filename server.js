const dotenv = require('dotenv')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const Movie = require(`./model/movies.js`)

dotenv.config()
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride(`_method`))
app.use(morgan(`dev`))
app.use(express.static(`public`))




// Connect to database
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on(`connected`, () => {
    console.log(`connected to mongodb ${ mongoose.connection.name }`)
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
    await Movie.create(request.body)
    response.redirect(request.get('referer'))
});




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


app.listen(3000, () => {
    console.log(`Listening on port 3000`)
})