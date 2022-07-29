const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');

//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connect('mongodb+srv://alumniportal:PfR1cnUoGzrhQBhr@alumni.dmlb0.mongodb.net/jobportal?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
const User = new Schema({
    firstname   : String,
    email       : String,
    phoneno     : String,
    password    : String,
    userrole    : String,
    terms       : Boolean
})
const userdetail = mongoose.model('user',User);
module.exports = userdetail;