const express = require('express');
const Product = require('../modals/product-modal');
const middleware = require("../middleware/auth");
const multer = require('multer');

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/products');
    }, filename: (req, file, callback) => {
        callback(null, `gz_product_${Date.now()}.`+file.mimetype.split('/')[1]);
    }
})

var upload = multer({storage: storage});

//Post Method
router.post('/create',  (req, res) => {
    try {
        const newProduct = new Product({
            product: req.body.product,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            subCategory: req.body.subCategory,
            quantity: req.body.quantity,
            purity: req.body.purity,
            productType: req.body.productType,
            offerType: req.body.offerType,
            offerName: req.body.offerName,
            offer: req.body.offer,
            gender: req.body.gender,
            image: req.body.image,
            status: req.body.status
        })
        const productToSave = newProduct.save();
        res.status(200).json({
            code: 200, 
            message: "Product created successfully!",
        })
    }
    catch (error) {
        res.status(400).json({code: 200, message: error.message})
    }
})

//Get all Method
router.get('/getAll',  (req, res) => {
    Product.find({}).populate('category').then((products, err) => {
        if(err){
            console.log(err);
            res.status(400).json({message: err.message})
        }
        else {
            res.json({
                status: 200,
                message: "All products retrieved successfully!",
                data: products
            });
        }
    });
})

//Get by ID Method
router.get('/getOne/:id',  (req, res) => {
    Product.findOne({ _id: req.params.id }).populate('category').then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.json({
            status: 200,
            message: "Product retrieved successfully!",
            data: product
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Update by ID Method
router.patch('/update/:id',  (req, res) => {
    // var updateUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })
    Product.updateOne({_id: req.params.id}, { $set: {
            product: req.body.product,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            subCategory: req.body.subCategory,
            quantity: req.body.quantity,
            purity: req.body.purity,
            productType: req.body.productType,
            offerType: req.body.offerType,
            offerName: req.body.offerName,
            offer: req.body.offer,
            gender: req.body.gender,
            image: req.body.image,
            status: req.body.status
        }
    }).then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).json({
            code: 200, 
            message: "Product updated successfully!",
            data: product
        })
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Delete by ID Method
router.delete('/delete/:id',  (req, res) => {
    Product.deleteOne({ _id: req.params.id }).then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Image upload
router.post('/productImage/upload', upload.single('productImage'),(req, res) => {
    const file = req.file;
    if(!file) {
        res.status(400).json({
            code: 400,
            message: "File not found!",
        });
    }
    res.status(200).json({
        code: 200,
        message: "Image uploaded successfully!",
        file: file});
})

module.exports = router;