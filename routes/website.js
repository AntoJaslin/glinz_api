const express = require('express');
const Category = require('../modals/category-modal');
const Product = require('../modals/product-modal');
const Order = require('../modals/order-modal');
const OrderProduct = require('../modals/order-product-modal');

const router = express.Router();

//get all categories
router.get('/getCategories', (req, res) => {
    let categories = Category.find({}, function(err, categories){
        if(err){
            console.log(err);
            res.status(400).json({
                code: 400,
                message: err.message
            })
        }
        else {
            res.json({
                status: 200,
                message: "All categories retrieved successfully!",
                data: categories
            });
        }
    });
})

router.get('/products/:id', (req, res) => {
    Product.find({category: req.params.id}, function(err, products) {
        if(err){
            console.log(err);
            res.status(400).json({
                code: 400,
                message: err.message
            })
        } else {
            res.json({
                status: 200,
                message: "All products of the category retrieved successfully!",
                data: products
            });
        }
    }) 
})

router.get('/productDetails/:id', (req, res) => {
    Product.findOne({_id: req.params.id}, function(err, product) {
        if(err){
            console.log(err);
            res.status(400).json({
                code: 400,
                message: err.message
            })
        } else {
            res.json({
                status: 200,
                message: "Products Details retrieved successfully!",
                data: product
            });
        }
    }) 
})

router.post('/create-order', (req, res) => {
    try {
        const newOrder = new Order({
            //products: req.body.products,
            orderTotal: req.body.orderTotal,
            customerInfo: req.body.customerInfo,
            address1: req.body.address1,
            address2: req.body.address2,
            state: req.body.state,
            pincode: req.body.pincode,
            createdOn: Date.now(),
            status: 'Pending'
        });
        const orderToSave = newOrder.save((error, result) => {
            if(error) {
                console.log("error", error);
            } 
            if(result) {
                console.log(result);
                let orderProducts = [];
                let products = req.body.products;
                products.forEach((element, index) => {
                    orderProducts.push({
                        order_id: result._id,
                        product_id: element._id,
                        order_quantity: element.orderQuantity,
                        total: element.total
                    })
                    if(index == (products.length - 1)) {
                        console.log(orderProducts);
                        const orderProductsToSave = OrderProduct.insertMany(orderProducts, (error, result) => {
                            if(error) {
                                console.log("error", error);
                                res.status(error.code).json({
                                    code: error.code, 
                                    message: error.message,
                                })
                            }
                            if(result) {
                                res.status(200).json({
                                    code: 200, 
                                    message: "Order created successfully!",
                                })
                            }
                        })
                    }
                });
            }
        },
        // (result) => {
        //     res.status(200).json({
        //         code: 200, 
        //         message: "Order created successfully!",
        //     })
        // }
        );
        
    } catch (error) {
        res.status(400).json({code: 200, message: error.message})
    }
});

module.exports = router;