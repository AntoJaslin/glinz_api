const mongoose = require('mongoose');
// const Product = require('./product-modal');
// const User = require('./user-modal');

const orderSchema = new mongoose.Schema({
  orderTotal: {
    required: true,
    type: String,
  },
  customerInfo: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  address1: {
    required: true,
    type: String,
  },
  address2: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  pincode: {
    required: true,
    type: String,
  },
  createdOn: {
    required: true,
    type: Date,
  },
  status: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('order', orderSchema)