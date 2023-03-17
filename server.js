//require models

require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const passport = require('passport');


const db = require('./models');
require('./config/passport');
const requestsCtrl = require('./controllers/requests')
const usersCtrl = require('./controllers/users')
const methodOverride = require('method-override');
const { abort } = require('process');
const { api } = require('./models');
const app = express();
let userProfile;
// Require the auth middleware


// refresh the browser when nodemon restarts
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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
        res.render('index', {user: req.user})
    });
    




app.get('/error', (req, res) => res.send("error logging in"));


app.get('/', function (req, res) {
    
    res.render('index', {user: req.user});
})

app.get('/home/:resort', function (req, res) {
    let resort = req.params.resort
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