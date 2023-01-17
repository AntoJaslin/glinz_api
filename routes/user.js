const express = require('express');
const User = require('../modals/user-modal');
const bcrypt = require("bcryptjs");
const middleware = require("../middleware/auth");

const router = express.Router()

//Post Method
// router.post('/createCategory', middleware, (req, res) => {
//     try {
//         const newCategory = new Category({
//             category: req.body.category,
//             description: req.body.description,
//             products: req.body.products,
//             status: req.body.status
//         })
//         const categoryToSave = newCategory.save();
//         res.status(200).json({
//             code: 200, 
//             message: "Category created successfully!",
//             //category: categoryToSave 
//         })
//     }
//     catch (error) {
//         res.status(400).json({code: 200, message: error.message})
//     }
// })

//Get all Method
router.get('/getAll', middleware, (req, res) => {
    let users = User.find({}, function(err, users){
        if(err){
            console.log(err);
            res.status(400).json({message: error.message})
        }
        else {
            res.json(users);
        }
    });
})

//Get by ID Method
router.get('/getOne/:id', middleware, (req, res) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Update by ID Method
router.patch('/update/:id', middleware, async (req, res) => {
    // var updateUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })
    encryptedPassword = await bcrypt.hash(req.body.password, 10);

    User.updateOne({_id: req.params.id}, { $set: {
            name: req.body.name,
            role_id: req.body.role_id,
            email: req.body.email,
            password: encryptedPassword,
            phone: req.body.phone,
            status: req.body.status
        }
    }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Delete by ID Method
router.delete('/delete/:id', middleware, (req, res) => {
    User.deleteOne({ _id: req.params.id }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;