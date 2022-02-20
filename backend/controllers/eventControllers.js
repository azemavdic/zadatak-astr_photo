const asyncHandler = require('express-async-handler')

//opis Učitaj evente
//@route /api/events
//nivo Javno
const getEvents = asyncHandler(async (req, res) => {
  res.json({ poruka: 'pozz' })
})

//opis Dodaj novi event
//@route /api/events
//nivo Javno
const addEvent = asyncHandler(async (req, res) => {
  const { ime, email, start, thumbnail } = req.body
  if (!ime || !email || !start || !thumbnail) {
    res.status(400).json({ poruka: 'Molimo upišite sva polja' })
    return
  }
  res.json({ poruka: 'dodaj' })
})

module.exports = { getEvents, addEvent }
