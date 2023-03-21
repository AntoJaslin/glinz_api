const express = require('express');
const ProductType = require('../modals/product-type-modal');
const middleware = require("../middleware/auth");
const multer = require('multer');

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/product_types');
    }, filename: (req, file, callback) => {
        callback(null, `gz_product_type_${Date.now()}.`+file.mimetype.split('/')[1]);
    }
})

var upload = multer({storage: storage});

//Post Method
router.post('/create', (req, res) => {
    try {
        const newProductType = new ProductType({
            type: req.body.type,
            description: req.body.description,
            image: req.body.image,
            status: req.body.status
        })
        const productTypeToSave = newProductType.save();
        res.status(200).json({
            code: 200, 
            message: "Product type created successfully!",
        })
    }
    catch (error) {
        res.status(500).json({code: 500, message: error.message})
    }
})

//Get all Method
router.get('/getAll', (req, res) => {
    let productTypes = ProductType.find({}, function(err, productTypes){
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
                message: "All product types retrieved successfully!",
                data: productTypes
            });
        }
    });
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    ProductType.findOne({ _id: req.params.id }).then((productType) => {
        if (!productType) {
            return res.status(404).json({
                code: 404,
                message: "Product type not found!"
            });
        }
        res.json({
            status: 200,
            message: "Product type retrieved successfully!",
            data: productType
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    // var updateUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })
    ProductType.updateOne({_id: req.params.id}, { $set: {
        type: req.body.type,
        description: req.body.description,
        products: req.body.products,
        image: req.body.image,
        status: req.body.status 
        }
    }).then((productType) => {
        if (!productType) {
            return res.status(404).json({
                code: 404,
                message: "Product type not found!"
            });
        }
        res.json({
            status: 200,
            message: "Product type updated successfully!",
            data: productType
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    ProductType.deleteOne({ _id: req.params.id }).then((productType) => {
        if (!productType) {
            return res.status(404).json({
                code: 404,
                message: "Product type not found!"
            });
        }
        res.json({
            status: 200,
            message: "Product type deleted successfully!",
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Image upload
router.post('/productTypeImage/upload', upload.single('productTypeImage'),(req, res) => {
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