const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema;

const Usermodels= new Schema({
    firstname: String,
    lastname: String,
    email: String
});

Usermodels.plugin(passportLocalMongoose)



module.exports =  mongoose.model('Usermodels',Usermodels);;