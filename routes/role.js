const express = require('express');
const Role = require('../modals/role-modal');
const middleware = require("../middleware/auth");

const router = express.Router()

//Post Method
router.post('/create', middleware, (req, res) => {
    try {
        const newRole = new Role({
            role: req.body.role,
        })
        const roleToSave = newRole.save();
        res.status(200).json({
            code: 200, 
            message: "Role created successfully!",
            //category: categoryToSave 
        })
    }
    catch (error) {
        res.status(400).json({code: 200, message: error.message})
    }
})

//Get all Method
router.get('/getAll', (req, res) => {
    let roles = Role.find({}, function(err, roles){
        if(err){
            console.log(err);
            res.status(400).json({message: error.message})
        }
        else {
            res.json(roles);
        }
    });
})

//Get by ID Method
router.get('/getOne/:id', middleware, (req, res) => {
    Role.findOne({ _id: req.params.id }).then((role) => {
        if (!role) {
            return res.status(404).send();
        }
        res.send(role);
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
    Role.updateOne({_id: req.params.id}, { $set: {
        role: req.body.role,
        }
    }).then((role) => {
        if (!role) {
            return res.status(404).send();
        }
        res.send(role);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Delete by ID Method
router.delete('/delete/:id', middleware, (req, res) => {
    Role.deleteOne({ _id: req.params.id }).then((role) => {
        if (!role) {
            return res.status(404).send();
        }
        res.send(role);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;