const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema ({
    resort: {
        type: String,
        enum: ['WDW', 'DLR'],
        required: true
    },
    park: {
        type: String,
        enum: ['DP', 'CA', 'MK', 'EP', 'AK', 'HS', 'ANY'],
        required: true,
        default: 'ANY'
    },
    
    date: {
        type: String, 
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: false
    },
    users: {
        type: Number
    }
});

module.exports = requestSchema;