const express = require('express');
const User = require('../modals/user-modal');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require('../modals/role-modal');
//const middleware = require("../middleware/auth");

const router = express.Router()

//Post Method
router.post('admin/register', async (req, res) => {
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

      console.log("Before find");
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      console.log("After find", user);
  
      if (user && (await bcrypt.compare(password, user.password))) {
        console.log("valid password");
        if(user.role_id == '63c6917642c4fd106d7599b5') {
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
          res.status(200).json( {
            code: 200,
            message: "Logged in successfully",
            data: {
              user: user,
              token: token}
            }
          );
          }
          res.status(400).
          json({
          code: 400, 
          message: "Invalid Credentials",
          })
        } else {
          res.status(400).
          json({
          code: 400, 
          message: "Invalid Credentials",
          })
        }
        
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
});

router.post("/user-exist", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email } = req.body;

    // Validate user input
    if (!(email)) {
      res.status(400).json({
        code: 400, 
        message: "Something went wrong!",

      })
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log("User exist?", user);
    if (user) {
      if(user.role_id == '63c6917642c4fd106d7599b5') {

        // user
        res.status(200).json( {
            code: 200,
            message: "User exist",
          });
        } else {
          res.status(404).json({
            code: 404, 
            message: "User not found",
    
          })
        }
    } else {
      res.status(404).json({
        code: 404, 
        message: "User not found",

      })
    }
      
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.post("/reset-password", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email } = req.body;

    // Validate user input
    if (!(email)) {
      res.status(400).json({
        code: 400, 
        message: "Something went wrong!",

      })
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log("User exist?", user);
    if (user) {
      if(user.role_id == '63c6917642c4fd106d7599b5') {

        encryptedPassword = await bcrypt.hash(req.body.password, 10);
        // user
        User.updateOne({email: email}, {
          $set: {
            password: encryptedPassword
          }
        }).then((user) => {
          if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User not found!"
            });
          }
          res.json({
              status: 200,
              message: "Password resetted successfully!",
          });
        });
      } else {
        res.status(404).json({
          code: 404, 
          message: "User not found",
        })
      }
    } else {
      res.status(404).json({
        code: 404, 
        message: "User not found",

      })
    }
      
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.post("/signup", async (req, res) => {

  try {
    const oldUser = await User.findOne({email: req.body.email});

    if (oldUser) {
      return res.status(409).json({
        code: 409, 
        message: "User Already Exist.",
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
            message: "Your account has created successfully!",
            //category: categoryToSave 
        })
    }
  }
  catch (error) {
      res.status(400).json({code: 200, message: error.message})
  }
});

router.post("/admin/login", async (req, res) => {

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
      if(user.role_id == '63c6911c2ed75eba5d72c924') {
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
          res.status(200).json( {
            code: 200,
            message: "Logged in successfully",
            data: {
              user: user,
              token: token}
            }
          );
        } else {
          res.status(404).json( {
            code: 404,
            message: "User not found!",
          });
        }
      // Role.findOne({ _id: user.role_id }).then((role) => {
        
      // }).catch((error) => {
      //   res.status(500).
      //   json({
      //     code: 500, 
      //     message: "Something went wrong!",
      //   });
      // });
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

async function isAdmin(id) {
  
  Role.findOne({ _id: id }).then((role) => {
      if(role.role == 'admin') {
        console.log("hey 2");
        return true;
      }
  }).catch((error) => {
    return false;
  })
};

module.exports = router;