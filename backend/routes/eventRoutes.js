const express = require('express')
const { getEvents, addEvent } = require('../controllers/eventControllers')
const router = express.Router()

router.route('/').get(getEvents).post(addEvent)

module.exports = router
