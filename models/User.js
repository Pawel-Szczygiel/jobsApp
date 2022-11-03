const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true,'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'Please provide password'],
        minlength: 6
    }
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, Number(process.env.SALT) );
});

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {userId:this._id, name:this.name}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.EXPIRE_TOKEN}
    );
}

userSchema.methods.comparePassword = function (loginPassword) {
    const isMatch = bcrypt.compare(loginPassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', userSchema);

