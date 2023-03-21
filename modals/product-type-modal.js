const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  type: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  image: {
    required: true,
    type: String
  },
  status: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('product_type', productTypeSchema)