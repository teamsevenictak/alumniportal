const resumeupload = require("express-fileupload");
const express = require ('express');

const Postjob = require('./src/model/PostjobsModel');
const UserDetail = require("./src/model/UserModel");
const cors = require ('cors');
const bodyParser = require ('body-parser');
const nodemailer = require("nodemailer");

const app = new express();

app.use(cors());
const jwt = require('jsonwebtoken');
app.use(resumeupload());
//app.use(express.static("files"));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
 // res.send('i am divs dddd')
})
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    var newuser = {
    firstname : req.body.user.firstname,
    email     : req.body.user.email,
    phoneno   : req.body.user.phoneno,
    password  : req.body.user.password,
    userrole  : req.body.user.userrole,
    terms     : req.body.user.terms

  }
  let users = new UserDetail(newuser);
  userExists = 0;
  UserDetail.findOne ({"email":users.email})
  .then(function (userExists) {     

    if(userExists){  
     return res.status(400).send({message:'Email Already exists in our system'});
     res.end();
    }
  });
  if(!userExists){
    users.save()
    .then(newuser => {
       res.status(200).json({'user': 'user registration completed successfully'});
    })
    .catch(err => {
        res.status(400).send({message:'user registration failed'});
    });
  }
  
    
 
})
app.post("/resume-upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;
  console.log(file);
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
});
//username= "admin";
//password = "123456";

function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if(token=='null')
  {
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token,'secretKey');
  
  if(!payload){
    return res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject
  next()

}

function LoggedUserID(req,res){
  let token = req.headers.authorization.split(' ')[1];
  if(token=='null'){
    let payload = jwt.verify(token,'secretKey');
    return req.userId = payload.subject.id;
  }
}
app.post('/login', (req, res) => {
    let userData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
   
    if(!userData.email){
        res.status(401).send("invalid username");
    }
    else if(!userData.password){
      res.status(401).send("invalid password");
    }
    else {        
      UserDetail.findOne ({"email":userData.email,"password":userData.password})
        .then(function (user) {
          if(user){
            let payload = {subject:userData.email+userData.password,user_role:user.userrole,id:user._id}
            let token = jwt.sign(payload,'secretKey');
           /*  let LoggedUser = {
              'token':token,
              'userrole':user.userrole
            } */
            res.status(200).send({'token':token,
            'userrole':user.userrole});
          }
          else{
            return res.status(400).send({msg:`Invalid Login credentials`});
          }
          
        })
        .catch(err => {              
          res.status(400).send({msg:`Login failed`});
        });           
      
    }  
})
app.get('/postajob',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    
    Postjob.find()
    .then(function(postajob){
        res.send(postajob);
    })
})
app.get('/postsbyuser',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
  id = LoggedUserID();
  Postjob.findById({"_id":id})
  .then(function(posts){
    console.log(posts);
      res.send(posts);
  })
})
app.post('/addJob',verifyToken, function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

    var jobs = {
        companyName:req.body.item.companyName ,
        jobRole: req.body.item.jobRole, 
        companydetail: req.body.item.companydetail,
        jobcategory: req.body.item.jobcategory,
        location: req.body.item.location,
        experience: req.body.item.experience,
        skills: req.body.item.skills,
        qualification: req.body.item.qualification,
        jobDescription: req.body.item.jobDescription,
        lastDate: req.body.item.lastDate,
        jobType: req.body.item.jobType,

    }

    var job = new Postjob(jobs)
    job.save()
    .then(job => {
        
        res.status(200).json({'job': 'New job added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new job failed');
    });
})
app.get('/jobdetail/:id',(req, res) => {
    id  = req.params.id;
    Postjob.findById({"_id":id})
    .then(function (jobdetail) {
      res.send(jobdetail);
  })
  .catch(err => {
      res.status(400).send('fetching job detail failed');
  });

})
app.post('/sendEmail', function (req, res) {
    // async..await is not allowed in global scope, must use a wrapper
async function main() {
  
 var visitor = {
    name       : req.body.visitor.name,
    subject    : req.body.visitor.subject,
    email      : req.body.visitor.email,
    message    : req.body.visitor.message
    }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",   
    auth: {
      user: 'teamsevenictak@gmail.com',
      pass: 'mckfxowcmhxcjpcd'
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'teamsevenictak@gmail.com', // sender address
    to: visitor.name+visitor.email, // list of receivers
    subject: visitor.subject, // Subject line
    text: visitor.message
  });
  console.log("Message sent: %s", info.messageId);
  res.status(200).json({'message': 'Mail sent successfully'});
}

main().catch(console.error);
    
    });

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server up in Port 5000 ");
});

