const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listingSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true })

module.exports = mongoose.model('Listing', listingSchema)