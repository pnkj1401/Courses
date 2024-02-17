const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name:{type:String,trim:true},
    duration:{type:Number},
    topics:[{type:mongoose.Schema.Types.ObjectId, ref:'topic'}]
})