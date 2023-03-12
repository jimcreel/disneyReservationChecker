const mongoose = require('mongoose');
const requestSchema = require('./request');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    requests: {
        type: [requestSchema]
    },
    notifications: {
        type: [String]
    },
    subscription: {
        type: Boolean,
        required: true
    }
});



module.exports = mongoose.model('User', userSchema);