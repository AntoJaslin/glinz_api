const express = require('express');
const Category = require('../modals/category-modal');
const middleware = require("../middleware/auth");
const multer = require('multer');

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/categories');
    }, filename: (req, file, callback) => {
        callback(null, `gz_category_${Date.now()}.`+file.mimetype.split('/')[1]);
    }
})

var upload = multer({storage: storage});

//Post Method
router.post('/create', (req, res) => {
    try {
        const newCategory = new Category({
            category: req.body.category,
            description: req.body.description,
            subCategories: req.body.subCategories,
            products: req.body.products,
            image: req.body.image,
            status: req.body.status
        })
        const categoryToSave = newCategory.save();
        res.status(200).json({
            code: 200, 
            message: "Category created successfully!",
        })
    }
    catch (error) {
        res.status(500).json({code: 500, message: error.message})
    }
})

//Get all Method
router.get('/getAll', (req, res) => {
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

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    Category.findOne({ _id: req.params.id }).then((category) => {
        if (!category) {
            return res.status(404).json({
                code: 404,
                message: "Category not found!"
            });
        }
        res.json({
            status: 200,
            message: "Category retrieved successfully!",
            data: category
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
    Category.updateOne({_id: req.params.id}, { $set: {
        category: req.body.category,
        description: req.body.description,
        subCategories: req.body.subCategories,
        products: req.body.products,
        image: req.body.image,
        status: req.body.status 
        }
    }).then((category) => {
        if (!category) {
            return res.status(404).json({
                code: 404,
                message: "Category not found!"
            });
        }
        res.json({
            status: 200,
            message: "Category updated successfully!",
            data: category
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    Category.deleteOne({ _id: req.params.id }).then((category) => {
        if (!category) {
            return res.status(404).json({
                code: 404,
                message: "Category not found!"
            });
        }
        res.json({
            status: 200,
            message: "Category deleted successfully!",
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Image upload
router.post('/categoryImage/upload', upload.single('categoryImage'),(req, res) => {
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