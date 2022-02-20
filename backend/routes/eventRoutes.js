const express = require('express')
const {
  getEvents,
  addEvent,
  izbrisiEvent,
} = require('../controllers/eventControllers')
const router = express.Router()

router.route('/').get(getEvents).post(addEvent)

router.route('/:id').delete(izbrisiEvent)

module.exports = router
