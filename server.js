const dotenv = require('dotenv')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

dotenv.config()
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride(`_method`))
app.use(morgan(`dev`))
app.use(express.static(`public`))


// connect to database
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on(`connected`, () => {
    console.log(`connected to mongodb ${ mongoose.connection.name }`)
})



app.get(`/`, async (request, response) => {
    response.send(`Hello World.`)
})


app.listen(3000, () => {
    console.log(`Listening on port 3000`)
})