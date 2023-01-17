const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  products: {
    required: true,
    type: Number
  },
  status: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('category', categorySchema)