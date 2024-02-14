const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    name:{type:String, trim:true},
    topics:[{
        topicName:{type:String, trim:true},
        topicDesc:{type:String, trim:true}
    }]
});

var content = mongoose.model('content', contentSchema);
module.exports = content;