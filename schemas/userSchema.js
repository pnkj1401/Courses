const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userschema = new Schema({
    firstname :{type: String , required:true , trim:true},
    lastname :{type: String , required:true , trim:true},
    username :{type: String , required:true , trim:true,unique:true},
    email :{type: String , required:true , trim:true,unique:true},
    password :{type: String , required:true },
    // securityQuestion: { type: String, required: true },
    // securityAnswer: { type: String, required: true },
    profilePic:{type: String,default:"/images/profilePic.png"},
    // uploads:{type: String},
    likes:[{type:Schema.Types.ObjectId, ref :'Post'}],
    retweets:[{type:Schema.Types.ObjectId, ref :'Post'}],
    isAdmin:{type:Boolean}
    // following:[{type:Schema.Types.ObjectId, ref :'user'}],
    // followers:[{type:Schema.Types.ObjectId, ref :'user'}]
    
},{timestamps:true});

var user = mongoose.model('user',userschema);
module.exports = user;