const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')

//opis Učitaj evente
//@route /api/events
//nivo Javno
const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find({})
    if (!events) {
      res.status(404).json({ poruka: 'Nema korisnika.' })
      return
    }
    res.status(200).json({ events })
  } catch (error) {
    res.status(401).json({ error })
  }
  res.json({ poruka: 'pozz' })
})

//opis Dodaj novi event
//@route /api/events
//nivo Javno
const addEvent = asyncHandler(async (req, res) => {
  const { ime, email, start, thumbnail, mobitel } = req.body

  //Validacija
  if (!ime || !email || !start || !thumbnail || !mobitel) {
    res.status(400).json({ poruka: 'Molimo popunite sva polja.' })
    return
  }

  //Da li korisnik već ima u bazi
  const userExist = await Event.findOne({ email })
  if (userExist) {
    res.status(400).json({ poruka: 'Korisnik sa tim emailom već postoji.' })
    return
  }

  const noviEvent = await Event.create(req.body)
  if (noviEvent) {
    res.status(201).json({ poruka: 'Uspješno dodan korisnik.', noviEvent })
  } else {
    res.status(400).json({ poruka: 'Došlo je do greške.' })
    return
  }
})

//opis Izbrisi event
//@route /api/events/:id
//nivo Javno
const izbrisiEvent = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) {
      res.status(404).json({ poruka: 'Nema evenata.' })
      return
    }
    await Event.findByIdAndDelete(id)
    res.status(200).json({ poruka: `${event.ime}` })
  } catch (error) {
    res.status(401).json({ poruka: 'Došlo je do greške.' })
  }
})

//opis Edituj event
//@route /api/events/:id
//nivo Javno
const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) {
      res.status(404).json({ poruka: 'Nema evenata.' })
      return
    }
    await Event.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ poruka: `Uspješno editovan korisnik ${event.ime}` })
  } catch (error) {
    res.status(401).json({
      poruka: 'Došlo je do greške, ili korisnik već postoji sa tim emailom.',
    })
  }
})

module.exports = { getEvents, addEvent, izbrisiEvent, updateEvent }
