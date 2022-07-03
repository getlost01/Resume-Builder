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
    if(userExists){
        var emptyData = null;
        if(userExists.jsonData ==="{}")
        emptyData = "yes";
        res.render('dashboard',{
            email : userExists.email,
            college: userExists.college,
            picture : req.user.picture,
            given_name : req.user.given_name,
            jsonData: JSON.parse(userExists.jsonData),
            emptyData
        });
        return;
     }
        res.render('firstlogin',{
            email : req.user.email,
            picture : req.user.picture,
            name : req.user.given_name
        });
    }catch(error){
        next(error);
    }
})













app.post('/submit-form',async(req,res)=>{
    try{
    const userExists =  await User.findOne({ email:req.user.email});
    if(!userExists){
        res.render('error');
        return;
     }
     await userExists.updateOne({ name: req.body.name });
     await userExists.updateOne({ jsonData:  JSON.stringify(req.body)});

     res.redirect('/dashboard/preview');
    }catch(error){
        next(error);
    }
})

app.get('/dashboard/preview',isloggedIn,async(req,res,next)=>{
    try{
    const user = await User.findOne({ email:req.user.email});
    var userData = JSON.parse(user.jsonData)
    res.render('template',{ userData });
    }catch(error){
        next(error);
    }
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
        jsonData: "{}"
    })
    const result = await user.save()
    res.redirect("/dashboard");
    }catch(error){
        next(error);
}
})