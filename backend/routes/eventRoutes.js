const express = require('express')
const {
  getEvents,
  addEvent,
  izbrisiEvent,
  updateEvent,
} = require('../controllers/eventControllers')
const router = express.Router()

router.route('/').get(getEvents).post(addEvent)

router.route('/:id').delete(izbrisiEvent).put(updateEvent)

module.exports = router
