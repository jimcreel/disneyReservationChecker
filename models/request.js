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
    pass: {
        type: String,
        enum: ['inspire-key-pass', 'believe-key-pass', 'enchant-key-pass', 'dream-key-pass', 'imagine-key-pass',
                'disney-incredi-pass', 'disney-sorceror-pass', 'disney-pirate-pass', 'disney-pixie-dust-pass'],
        required: true
    },
    date: {
        type: Date, 
        required: true
    }
});

module.exports = requestSchema;