const jwt = require('jsonwebtoken');
const admin = require('../model/admin.model');
const asyncHandler = require('express-async-handler')

const validateToken = asyncHandler( async(req, res, next) => {
    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied, redirecting to signin'});
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = await admin.findById(decoded.id);
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token validation not successfull' });
        }
        else{
            return res.status(401).json({ message: 'Invalid Token' });
        }
    }

})

module.exports = validateToken