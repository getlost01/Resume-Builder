const session = require('express-session');
const router = require('express').Router();
const passport = require('passport');
const auth = require('./auth');
require('dotenv').config();
router.use(passport.initialize());
router.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true}));
router.use(passport.session());

router.post('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/google/failure'
}));

router.get('/auth/google/failure',(req,res)=>{
    res.send('something went wrong');
})


module.exports = router;