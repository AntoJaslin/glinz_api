const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  price: {
    required: false,
    type: String
  },
  category: {
    required: true,
    type: String,
    ref: 'category'
  },
  subCategory: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number
  },
  purity: {
    required: true,
    type: Number
  },
  productType: {
    required: true,
    type: String,
  },
  offerType: {
    required: false,
    type: String
  },
  offerName: {
    required: false,
    type: String
  },
  offer: {
    required: false,
    type: Number
  },
  gender: {
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

module.exports = mongoose.model('product', productSchema)