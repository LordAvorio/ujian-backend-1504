const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


// main app
const app = express()

// apply middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// main route
const response = (req, res) => res.status(200).send('<h1>REST API JCWM1504</h1>')
app.get('/', response)

const {
    userRouter,
    movieRouter
} = require('./routers')

app.use('/user', userRouter)
app.use('/movies', movieRouter)

// bind to local machine
const PORT = process.env.PORT || 2000
app.listen(PORT, () => `CONNECTED : port ${PORT}`)