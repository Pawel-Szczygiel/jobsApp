require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if ( !authHeader || !authHeader.startsWith('Bearer') ) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) throw new UnauthenticatedError('Authentication invalid');
        const {userId, name} = user;
        
        req.user = {userId, name};
        next();

    });
        
}

module.exports = auth;