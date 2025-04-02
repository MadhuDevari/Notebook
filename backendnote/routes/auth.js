const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "devariisagoodb$oy";

// Route 1: Create new user
router.post('/createuser', [
    body('name', 'Please enter name').isLength({ min: 5 }),
    body('email', 'Please enter email').isEmail(),
    body('password', 'Password must be atleast 5 char').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
    let user = await User.findOne({email: req.body.email});

    if(user){
        return res.status(400).json({success, error: "Sorry email with this id already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });

    const data = {
        user: {
            id: user.id
        }
    }

    const authtoken = await jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});
}
catch(error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
}

})


//Route 2: login

router.post('/login', [
    body('email', 'Please enter email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],    
    async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
    
    let user = await User.findOne({email});

    if(!user){
        success = false;
        return res.status(400).json({success, error: "Sorry email not exists"});
    }

    let pwcompare = await bcrypt.compare(password, user.password)

    if(!pwcompare){
        success = false;
        return res.status(400).json({success, error: "Sorry password not matched"});
    }

    const data = {
        user: {
            id: user.id
        }
    }

    const authtoken = await jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});
}
catch(error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
}

})


//Route 3: Get user

router.post('/getuser', fetchuser, async (req, res) => {

    try {
    
    const userid = req.user.id;

    const user = await User.findById(userid).select("-password");

    res.json(user);


}
catch(error) {
    res.status(401).send({error: "Please authenticate user"});
}

})
module.exports = router