const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: {
    required: true,
    type: String
  },
})

module.exports = mongoose.model('role', roleSchema)