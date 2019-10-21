module.exports = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Set the token
        req.token = bearerHeader.split(' ')[1];
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
};