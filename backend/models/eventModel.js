const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    ime: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String },
    godine: { type: String },
    email: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
