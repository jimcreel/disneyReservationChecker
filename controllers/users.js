/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/users`
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


// New Route: GET localhost:3000/reviews/new
router.get('/new/:userId/:date', (req, res) => {
    db.User.findById(req.params.userId)
        .then(user =>{
        res.render('./use/user-new.ejs', { 
            user: user,
         })

})
});
router.get('/:id/edit', function (req, res) {
    db.User.findById(req.params.id)
    .then(user => {
    res.render('./user/user-edit.ejs',
    {user: user})
    })
    .catch(function(err){
    })
});

router.put('/:id', function (req, res) {
    db.User.findByIdAndUpdate(req.params.id,
        req.body,{new: true})
        .then(user => {
            res.redirect(`/users/${user.id}`)
        })
        .catch(function(err){
        })
});
// Create Route: POST localhost:3000/reviews/
router.post('/create/:userId', (req, res) => {
    db.User.updateMany(
        {},
        { $pull: { requests: { available: false} }})
    
    /* db.User.findByIdAndUpdate(
        req.params.userId,
        { $push: { requests: req.body } },
        { new: true }
    )
        .then(item =>
        res.redirect(`/`),
    ) */
});


// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    db.User.findById(req.params.id)
        .then(user => {
	    res.render('./user/user-show.ejs', { user: user })
        })
});

// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.Item.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(item =>
            res.redirect(`/items/${item.id}`),
        )
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router