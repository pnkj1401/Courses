const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    name:{type:String, trim:true},
    topics:[{type:mongoose.Schema.Types.ObjectId, ref:'topic'}]
});

var content = mongoose.model('content', contentSchema);
module.exports = content;