const express = require('express');
const createHttpError = require('http-errors');
const passport = require('passport');
const session = require('express-session');
const router = express.Router()
const path = require('path');
const auth = require('./auth');
require('dotenv').config()

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.Router());
app.use(session({secret:"cats"}))
app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT || 9990,function(){
    console.log("➡️ APP is listening on port %d in %s mode 👍",  this.address().port, app.settings.env)
})


app.get('/',(req,res,next)=>{
    res.render('index',{
        value : "Login Page"
    });
})

app.post('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
}));
app.get('/auth/google/failure',(req,res)=>{
    res.send('something went wrong');
})
app.get('/logout',(req,res)=>{
    req.logOut(false,(err)=>{
        if(err)
        console.log(err.message);
    });
    // req.session.destroy();
    res.render('index',{
        value : "Sucessful Logout / Login again"
    });
})

function isloggedIn(req,res,next){
    req.user?next():res.sendStatus(401);
}

app.get('/protected',isloggedIn,(req,res)=>{
    // res.send(`Hello ${req.user.displayName} <a href='/logout'>Logout</a>`);
    res.render('dashboard',{
        email : req.user.email,
        picture : req.user.picture ,
        given_name : req.user.given_name
    });
})