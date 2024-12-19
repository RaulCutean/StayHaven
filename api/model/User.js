const mongoose = require('mongoose');
const {Schema} = require("mongoose");


const User = new Schema({
    firstname: {
        type: String ,
        required : true ,
    } ,
    lastname: {
        type: String ,
        required : true  ,
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true ,
    }

})
module.exports = mongoose.model('User' , User) ;
