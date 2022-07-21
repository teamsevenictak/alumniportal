const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser')
const Postjob = require('./src/model/PostjobsModel');

const app = new express();

app.use(cors());
app.use(bodyParser.json());

app.get('/postajob',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    Postjob.find()
    .then(function(postajob){
        res.send(postajob);
    })
})

app.post('/addJob', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

    var jobs = {
        companyName:req.body.item.companyName ,
        jobRole: req.body.item.jobRole, 
        location: req.body.item.location,
        experience: req.body.item.experience,
        skills: req.body.item.skills,
        qualification: req.body.item.qualification,
        jobDescription: req.body.item.jobDescription,
        lastDate: req.body.item.lastDate,
        jobType: req.body.item.jobType
    }

    var job = new Postjob(jobs)
    job.save();
})

app.listen(3000);

