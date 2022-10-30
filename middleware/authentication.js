require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/unauthenticated');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const {userId, name} = payload;

        req.user = {userId, name};
        next();
        
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = auth;