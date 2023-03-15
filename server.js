//require models

require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const db = require('./models');
const requestsCtrl = require('./controllers/requests')
const usersCtrl = require('./controllers/users')
const methodOverride = require('method-override');
const { abort } = require('process');
const { api } = require('./models');
const app = express();

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


/* Mount routes/
--------------------------------------------------------------- */

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/home/:resort', function (req, res) {
    let resort = req.params.resort
    db.api.getResorts(req, res, resort)
    .then(availability => {
        res.render('home', 
        {availability: availability,
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


app.use('/requests', requestsCtrl)
app.use('/users', usersCtrl)



app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});