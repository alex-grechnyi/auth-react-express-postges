const jwt = require('jsonwebtoken');

// Use jwt token to verify user
module.exports = (token, res) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            authData.user.password = undefined;
            res.json({
                authData
            });
        }
    });
};
