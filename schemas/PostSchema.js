const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content :{type: String , trim:true},
    postedby:{type:Schema.Types.ObjectId, ref :'user'},
    // pinned:Boolean,
    // uploads:{type: String},
    likes:[{type:Schema.Types.ObjectId, ref :'user'}],
    retweetUsers:[{type:Schema.Types.ObjectId, ref :'user'}],
    retweetData:{type:Schema.Types.ObjectId, ref :'Post'},
    replyTo:{type:Schema.Types.ObjectId, ref :'Post'}
  
},{timestamps:true});

var Post = mongoose.model('Post',PostSchema);
module.exports = Post;