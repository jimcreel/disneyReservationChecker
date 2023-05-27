//require models.

require('dotenv').config()
const path = require('path');
const express = require('express');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const passport = require('passport');
const ensureLoggedIn = require('./config/ensureLoggedIn');
const cors = require('cors');


const db = require('./models');
require('./config/passport');
const requestsCtrl = require('./controllers/requests')
const usersCtrl = require('./controllers/users')
const { createProxyMiddleware } = require('http-proxy-middleware');
let cors = require('cors')
const app = express();
let userProfile;
// Require the auth middleware


// refresh the browser when nodemon restarts





/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
  });
app.use('/api/requests', require('./controllers/requests'))
app.use('/api/users', require('./controllers/users'))








/* Mount routes/
--------------------------------------------------------------- */
app.get('/auth/google', passport.authenticate(
    'google', 
    { scope: ['profile', 'email'], 
    prompt: 'select_account'    
    }
));


app.get ('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/success',
        failureRedirect: '/error'
    }
));

app.get('/success', (req, res) => {    
    res.render('index')
    });
    




app.get('/error', (req, res) => res.send("error logging in"));


app.get('/', function (req, res) {
    
    res.render('index', {user: req.user});
})

app.get('/home/:resort', ensureLoggedIn, function (req, res) {
    let resort = req.params.resort;
    db.api.getResorts(req, res, resort)
    .then(availabilities => {
        res.render('home', 
        {availabilities: availabilities,
        resort: resort})
    })
})



app.get('/seed', function (req, res) {
    db.User.findByIdAndUpdate(userID,
    { $push: { requests: testRequests } },
        { new: true }
    )
    .then(result => res.json(result))
    .catch(err => console.log(err))
}
)

app.get('/logout', function(req, res){
    req.logout(function() {
      res.render('index');
    });
  });


app.use('/requests', requestsCtrl)
app.use('/users', usersCtrl)



app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});