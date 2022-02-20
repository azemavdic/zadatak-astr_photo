const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT

const app = express()

//Body parser middleware
app.use(express.json())
//URL encoded
app.use(express.urlencoded({ extended: false }))
//Custom error handler
app.use(errorHandler)

//ROUTES
app.use('/api/events', require('./routes/eventRoutes'))

app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`))
