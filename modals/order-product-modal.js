const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    order_id: {
        required: true,
        type: String
    },
    product_id: {
        required: true,
        type: String
    },
    order_quantity: {
        required: true,
        type: Number
    },
    total: {
        required: true,
        type: String
    }  
})

module.exports = mongoose.model('order-product', orderProductSchema)