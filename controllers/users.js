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

// Show Route: shows the new user form
router.get ('/new', (req, res) => {
    res.render('./user/user-new.ejs')
})

// Create Route: creates a new user
router.post('/', (req, res) => {
    db.User.create(req.body)
    .then(user => {
        res.redirect(`/users/${user.id}`)
    })
    .catch(function(err){
    })
});

// Show Route: shows the user details and link to edit/delete
router.get('/:id', (req, res) => {
    db.User.findById(req.params.id)
        .then(user => {
	    res.render('./user/user-show.ejs', { user: user })
        })
});

// Show Route: shows the user edit form
router.get('/:id/edit', function (req, res) {
    db.User.findById(req.params.id)
    .then(user => {
    res.render('./user/user-edit.ejs',
    {user: user})
    })
    .catch(function(err){
    })
});

// UPDATE Route: updates the user details
// 
router.put('/:id', function (req, res) {
    db.User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true})
        .then(user => {
            res.redirect(`/users/${user.id}`)
        })
        .catch(function(err){
        })
});



// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/')
        })
        .catch(function(err){
        })
});



/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router