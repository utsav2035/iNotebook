const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users')  // Model (Schema) hai
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "TokenString";
var fetchuser = require('../middleware/fetchuser');

router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ success, error: errors.array() });
    }
    try {
        // async function getUser() {
        //     let users = await User.findOne({ email: req.body.email });
        //     if (users) {
        //         return res.status(400).json({ error: "Sorry a user with same email already exists" });
        //     }
        //     return users;
        // }


        // IMPORTANT[
        // var done = 0;

        // User.findOne({ email: req.body.email }, function (err, uemail) {
        //     if (uemail) {
        //         console.log(uemail);
        //         return res.status(400).json({ error: "Sorry a user with same email already exists" });
        //     }
        //     done += 2;
        //     // console.log(uemail);
        // });
        // ]
        //IMPORTANT[ 
        //require('deasync').loopWhile(function () { return (done != 2); });
        // if (user) {
        //     return res.status(400).json({ error: "Sorry a user with same email already exists" });
        // }
        // ]

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false
            return res.status(400).json({ success, error: "Sorry a user with same email already exists" });
        }

        const Salt = bcrypt.genSaltSync(4);

        const SecPass = bcrypt.hashSync(req.body.password, Salt);

        // let user = User.create({
        user = User.create({
            name: req.body.name,
            password: SecPass,
            // password: req.body.password,
            email: req.body.email
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        // .then(user => res.json(user))
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
        res.status(500).send("Internal Server Error");
    }
})

// Authenticate a User using: POST "/api/auth/login". No login required

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = await req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;

