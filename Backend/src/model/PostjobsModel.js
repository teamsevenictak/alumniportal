const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/AlumniPortal');
const Schema = mongoose.Schema;

const Postajob = new Schema ({
    companyName: String,
    jobRole: String, 
    location: String,
    experience: String,
    skills: String,
    qualification: String,
    jobDescription: String,
    lastDate: String,
    jobType: String
})

const Postjob = mongoose.model('postjob', Postajob);
module.exports = Postjob;