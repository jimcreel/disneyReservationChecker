
require('dotenv').config()
const mongoose = require('mongoose');
const mongodbUri = process.env.MONGODBURI;

// Create an immediately invoked async function.
// It will wait for Mongoose to connect to MongoDB Atlas
(async function () {
    await mongoose.connect(mongodbUri);
    console.log('Mongoose is connected');
})().catch(err => console.log('MongoDB connection error:\n' + err))

// Export models and API functions to `server.js`
module.exports = {
    
    User: require('./user'),
    Request: require('./request'),
}