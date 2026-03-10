require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


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

app.get('/', (req, res) => {
    res.json({message:"api is running wild"})
})
