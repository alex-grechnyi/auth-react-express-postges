const express = require ('express');
const router = express.Router();
const User = require ('../models/User');
const bcrypt = require('bcrypt');
const verifyToken = require('../utility/verifyToken');
const jwtSign = require('../utility/jwtSign');
const jwtVerify = require('../utility/jwtVerify');

//Add a user
router.post('/add', (req, res) => {
    let {username, email, password} = req.body;

    // Make lowercase
    email = email.toLowerCase();

    //Hash password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {

        // Insert into table
        User.create({
            username,
            email,
            password: hash
        })
            .then(user => res.send(user))
            .catch(err => res.status(400).json({errors: err}));
    });
});

//Login user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    result ? jwtSign(user, res) : res.status(400).json({errors: 'Incorrect password'})

        })})
        .catch((err) => {
            res.status(400).json({errors: err});
        })
});

// User page
router.get('/', verifyToken, (req, res) => {
    jwtVerify(req.token, res);
});

module.exports = router;