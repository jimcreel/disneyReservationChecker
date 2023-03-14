/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/reviews`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */


// New Route: GET localhost:3000/requests/new
router.get('/new/:userId/:date', (req, res) => {
    db.User.findById(req.params.userId)
        .then(user =>{
        res.render('./request/request-new.ejs', { 
            user: user,
            date: req.params.date
         })

})
});

// Create Route: POST localhost:3000/requests/
router.post('/create/:userId', (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.userId,
        { $push: { requests: req.body } },
        { new: true }
    )
        .then(user =>
        res.redirect(`/`),
    ) 
});


// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    db.Item.find(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(item => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            res.json(item.reviews[0])
        })
});

// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.User.findOneAndUpdate(
        { 'requests._id': req.params.id },
        { $pull: { requests: { _id: req.params.id } } },
        { new: true }
    )
        .then(item =>
            res.redirect(`back`)
        )
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router