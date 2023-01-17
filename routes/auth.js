const express = require('express');
const User = require('../modals/user-modal');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const middleware = require("../middleware/auth");

const router = express.Router()

//Post Method
router.post('/register', async (req, res) => {
    try {
      
        const oldUser = await User.findOne({email: req.body.email});
  
        if (oldUser) {
          return res.status(409).json({
            code: 409, 
            message: "User Already Exist. Please Login",
  
          })
        } else {
          encryptedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = new User({
            name: req.body.name,
            role_id: req.body.role_id,
            email: req.body.email,
            password: encryptedPassword,
            phone: req.body.phone,
            status: req.body.status
          });
          const userToSave = newUser.save();
          res.status(200).json({
              code: 200, 
              message: "User registered successfully!",
    
          })
        }
    }
    catch (error) {
        res.status(400).json({code: 200, message: error.message})
    }
});

router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).json({
          code: 400, 
          message: "All input is required",

        })
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json({
            user: user,
            token: token
        });
      }
      res.status(400).
      json({
        code: 400, 
        message: "Invalid Credentials",
      })
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
});

module.exports = router;