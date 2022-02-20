const path = require('path')
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const cors = require('cors')

const PORT = process.env.PORT

//Konekcija na bazu
connectDB()

const app = express()

app.use(cors())
//Body parser middleware
app.use(express.json())
//URL encoded
app.use(express.urlencoded({ extended: false }))
//Custom error handler
app.use(errorHandler)

//ROUTES
app.use('/api/events', require('./routes/eventRoutes'))

// Uvezivanje frontenda
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  )
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ poruka: 'Astromy photo of the day API' })
  })
}

app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`))
