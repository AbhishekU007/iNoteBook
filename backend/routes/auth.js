const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');
var bcrypt = require('bcryptjs'); //for password hashing
var jwt = require('jsonwebtoken'); //for token generation
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = 'HonorDiedOnTheBeach';

router.post('/createUser', [
    // Validation rules are defined in an array
    body('name', 'Enter a valid name').isLength({min: 3, max: 15}), // Name should be between 3 and 15 characters
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({min: 5}) ],
   async (req, res) => {
       let success = false;
    //If there are error Return Bad request along with the error
   const errors = validationResult(req); // The validationResult function is used to check if there are any validation errors based on the defined rules
    if (!errors.isEmpty()) {
        return res.status(400).json({success , errors: errors.array()});
    }

    // Inside try  Check whether a user with the same email already exists if not then create a new
    try {
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({success , error: 'A user with the same email already exists'});
        }
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a NEW USER and save it to the database ----------
        user = await User.create(
            {name: req.body.name, password: secPass, email: req.body.email}
        );
        const data = {
            user: { id: user.id }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
      }
       catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'some server error occured'});
    }
});

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
        let success = false;
    const errors = validationResult(req);  // if there is any error resturn bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            success = false;
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) { //if password not matched
            success =false;
            return res.status(400).json({success , error: "Please try to login with correct credentials"});
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success , authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }

});

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }
});

module.exports = router