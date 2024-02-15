const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    topicName: { type: String, trim: true },
    topicDesc: { type: String, trim: true },
    sections: [{
        sectionName: { type: String },
        sectionDesc: { type: String }
    }]
});

var topic = mongoose.model('topic', topicSchema);
module.exports = topic;