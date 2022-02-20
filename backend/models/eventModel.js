const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    ime: { type: String, required: true },
    start: { type: String },
    end: { type: String },
    godine: { type: Number },
    email: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    mobitel: { type: String },
    rodendan: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
