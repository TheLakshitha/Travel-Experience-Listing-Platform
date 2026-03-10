require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const listingRoutes = require('./routes/listingRoutes')
const userRoutes = require('./routes/userRoutes')


//express app
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//connet to DB & listen for requests
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("listening on PORT 4000!!")
    })
})
.catch((error) => {
    console.log(error)
})

//Routes
app.use('/api/listings', listingRoutes)
app.use('/api/users', userRoutes)