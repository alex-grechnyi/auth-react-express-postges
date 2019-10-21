const jwt = require('jsonwebtoken');

//Use jwt token to sign user
module.exports = (user, res) => {
    return jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
        res.json({token});
    });
};
