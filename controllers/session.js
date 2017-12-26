const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth')
let User = require('./../helpers/users');
let router = express.Router();

router.post('/login', auth.isLogged,function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).send({
                    err: 'Could not log in user'
                });
            }
            res.status(200).send({
                status:200
            });
        });
    })(req, res, next);
});


router.post('/signup',auth.isLogged, function (req, res, next) {
         User.add_user(req.body.username, req.body.email, req.body.password);
         res.send({status:200});
});

router.get('/value',auth.isAuth ,(req,res)=>{
    res.send({session:req.session.passport});
});

router.get('/logout',auth.isAuth , function(req, res) {
    req.logout();
    res.status(200).send({
        status: 'Bye!'
    });
});

module.exports = router;
