const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router()
const path = require('path');
const os = require('os');
const app = express();
require('dotenv').config();


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const connectdb=require('./config/db')
connectdb();
const User = require('./models/user')
const Visitor = require('./models/visit')

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
    req.user?next():res.render('error',{errorName:"User has logged out, Login now."});
}

app.get('/dashboard',isloggedIn,async(req,res)=>{
    try{
    const userExists =  await User.findOne({ email:req.user.email});
    const visitorDetails =  await Visitor.findOne({ email:req.user.email});
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
            visitorData: JSON.stringify(visitorDetails),
            username: userExists.username, 
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
    const result = await user.save();
    res.redirect("/dashboard");
    }catch(error){
        next(error);
}
})



app.post('/dashboard/preview',async(req,res,next)=>{
    try{
    const userExists =  await User.findOne({ email:req.user.email});
    if(!userExists){
        res.render('error',{errorName:"User has logged out, Login now."});
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
    res.render('template',{ userData ,updatetime: new Date().toISOString().slice(0, 10) });
    }catch(error){
        next(error);
    }
})



app.get('/user/:username', async (req, res, next) => {
    try {
      const { username } = req.params;
      const userExists = await User.findOne({ username });
      var currIP = req.ip;
      if (!userExists) {
        res.render('error404');
        return;
      }
      if(userExists.jsonData === '{}'){
        res.render('error',{errorName:"This user have incomplete data / unverified user."});
        return;
      }
      const visitorDetails = await Visitor.findOne({ email: userExists.email });
      var userData = JSON.parse(userExists.jsonData)
      var visRenderData = 0, uniqRenderData = 0;

      if(!visitorDetails){
            const vistorDet = new Visitor({ 
            username: userExists.username, 
            email: userExists.email, 
            count: 1,
            uniqueCount: 1,
            weekCount: `{"${new Date().toISOString().slice(0, 10)}":1}`,
            uniqueVistors: `["${currIP}"]`,
            weeklyUniqueVistors: `{"${new Date().toISOString().slice(0, 10)}":1}`,
            regCount:(req.user)?1:0,
            unregCount:(req.user)?0:1,
            os: `{"MacOS":0,"Windows":0,"Linux":0 ,"OtherOS": 1}`
        })
        visRenderData = 1;
        uniqRenderData = 1;
        const result = await vistorDet.save();
      }
      else{
        var ip = JSON.parse(visitorDetails.uniqueVistors);
        var weekCount = JSON.parse(visitorDetails.weekCount);
        var weeklyUniqueVistors = JSON.parse(visitorDetails.weeklyUniqueVistors);
        var diffIP = ip.includes(currIP),uCount = 0,rCount=0;currDate = new Date().toISOString().slice(0, 10);
        var dayBack = new Date(new Date().getTime()-30*24*60*60*1000).toISOString().slice(0, 10);
        
        if(!diffIP){ uCount = 1; ip.push(currIP); };
        
        if(weekCount[currDate]){ weekCount[currDate] = weekCount[currDate]+1; }
        else{ weekCount[currDate] = 1;}

        if(weeklyUniqueVistors[currDate]){ weeklyUniqueVistors[currDate] = weeklyUniqueVistors[currDate] + uCount; }
        else{ weeklyUniqueVistors[currDate] = uCount; }

        if(weeklyUniqueVistors[dayBack]){ delete weeklyUniqueVistors[dayBack]; }

        if(weekCount[dayBack]){ delete weekCount[dayBack]; }
        if(weeklyUniqueVistors[dayBack]){ delete weeklyUniqueVistors[dayBack]; }
        if(req.user){ rCount = 1; }

        var type = os.type();
        var clientOS = JSON.parse(visitorDetails.os);
        switch(type) {
            case 'Darwin': clientOS.MacOS += 1; break;
            case 'Linux': clientOS.Linux += 1; break;
            case 'Windows_NT': clientOS.windows += 1 ; break;    
            default: clientOS.OtherOS += 1;
        }
        const result =  await visitorDetails.updateOne(
            { count: visitorDetails.count+1 , 
             uniqueCount: visitorDetails.uniqueCount + uCount,
             regCount: visitorDetails.regCount + rCount,
             unregCount: visitorDetails.unregCount + 1-rCount,
             os: JSON.stringify(clientOS),
             weekCount: JSON.stringify(weekCount) ,
             uniqueVistors: JSON.stringify(ip),
             weeklyUniqueVistors: JSON.stringify(weeklyUniqueVistors)}
        )
        visRenderData = visitorDetails.count+1;
        uniqRenderData =  visitorDetails.uniqueCount + uCount;
      }

      res.render('template',{ userData , updatetime: userExists.updatedAt.toISOString().slice(0, 10), visRenderData ,uniqRenderData});
    } catch (error) {
      next(error)
    }
  })


  app.use((err, req, res, next) => {
    res.render('error404');
  })

  app.get('*', (req, res, next) => {
    res.render('error404');
  });