const express = require('express');
let session = require('cookie-session');
let passport = require('passport');
const config = require('./helpers/config');
const app = express();
const port = process.env.PORT || 8000;


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
    name: 'session',
    keys: ['keyboard cat'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.redirect('./index.html');
});

app.use('/',require('./controllers/'));

passport.use(require('./helpers/localStrategy'));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.listen(port);
