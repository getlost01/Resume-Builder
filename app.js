const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router()
const path = require('path');
const app = express();
require('dotenv').config();


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const connectdb=require('./config/db')
connectdb();
const User = require('./models/user')

app.use('/',require('./config/passport'))


app.listen(process.env.PORT || 9990,function(){
    console.log("➡️ APP is listening on port %d in %s mode 👍",  this.address().port, app.settings.env)
})


app.get('/',(req,res,next)=>{
    res.render('index',{
        value : "Login Page"
    });
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
    req.user?next():res.render('error');
}

app.get('/dashboard',isloggedIn,async(req,res)=>{
    try{
    const userExists =  await User.findOne({ email:req.user.email});
    console.log(userExists);
    if(userExists){
        res.render('dashboard',{
            email : req.user.email,
            picture : req.user.picture,
            given_name : req.user.given_name
        });
        return;
    }
        res.render('firstlogin',{
            email : req.user.email,
            picture : req.user.picture,
            given_name : req.user.given_name
        });
    }catch(error){
        next(error);
    }
})












app.get('/test',(req,res,next)=>{
    var idAddress = req.connection.remoteAddress;
    console.log(idAddress);
    res.render('form');
})

app.post('/submit-form',(req,res,next)=>{
    // console.log(req.body);
    res.render('template');
})
app.get('/submit-form',(req,res,next)=>{
    // console.log(req.body);
    res.render('template');
})





app.post('/dashboard',async(req,res)=>{
    try{
    const user = new User({ 
        username: req.body.username, 
        email: req.body.email, 
        name: req.body.name,
        college: req.body.college, 
        branch: "-", 
        yearOfGrad: req.body.yearOfGrad,
        jsonData: "-"
    })
    console.log(user)
    const result = await user.save()
    res.redirect("/");
    }catch(error){
        next(error);
}
})