const express = require('express');
const Category = require('../modals/category-modal');
const middleware = require("../middleware/auth");

const router = express.Router()

//Post Method
router.post('/createCategory', middleware, (req, res) => {
    try {
        const newCategory = new Category({
            category: req.body.category,
            description: req.body.description,
            products: req.body.products,
            status: req.body.status
        })
        const categoryToSave = newCategory.save();
        res.status(200).json({
            code: 200, 
            message: "Category created successfully!",
            //category: categoryToSave 
        })
    }
    catch (error) {
        res.status(400).json({code: 200, message: error.message})
    }
})

//Get all Method
router.get('/getAll', middleware, (req, res) => {
    let categories = Category.find({}, function(err, categories){
        if(err){
            console.log(err);
            res.status(400).json({message: error.message})
        }
        else {
            res.json(categories);
        }
    });
})

//Get by ID Method
router.get('/getOne/:id', middleware, (req, res) => {
    Category.findOne({ _id: req.params.id }).then((category) => {
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Update by ID Method
router.patch('/update/:id', middleware, (req, res) => {
    // var updateUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })
    Category.updateOne({_id: req.params.id}, { $set: {
        category: req.body.category,
        description: req.body.description,
        products: req.body.products,
        status: req.body.status 
        }
    }).then((category) => {
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Delete by ID Method
router.delete('/delete/:id', middleware, (req, res) => {
    Category.deleteOne({ _id: req.params.id }).then((category) => {
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;