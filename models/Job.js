const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    company: {
        type: String,
        require: [true, 'Please provide company name'],
        maxlength: 50,
        trim: true
    },
    position: {
        type: String,
        require: [true, 'Please provide position'],
        maxlength: 50,
        trim: true
    },
    status: {
        type: String,
        enum: ['interview','declined','pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{timestamps: true});

module.exports = mongoose.model('Job', jobSchema);