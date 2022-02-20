const mongoose = require('mongoose')

const eventModel = mongoose.Schema(
  {
    ime: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String },
    godine: { type: String, required: true },
    email: { type: String, required: true, unique },
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventModel)
