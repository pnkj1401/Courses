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




 // const newTopic = new Topic({
    //     topicName: "Introduction",
    //     topicDesc: "Overview of Operating Systems",
    //     sections: [{
    //         sectionName: 'Section 1',
    //         sectionDesc: 'Description for section 1'
    //     }]
    // });

    // const newTopic1 = new Topic({
    //     topicName: "Operating system tutorial",
    //     topicDesc: `Operating System Tutorial provides the basic and advanced concepts of operating system . Our Operating system tutorial is designed for beginners, professionals and GATE aspirants. We have designed this tutorial after the completion of a deep research about every concept
    //                 The content is described in detailed manner and has the ability to answer most of your queries. The tutorial also contains the numerical examples based on previous year GATE questions which will help you to address the problems in a practical manner.
    //                 Operating System can be defined as an interface between user and the hardware. It provides an environment to the user so that, the user can perform its task in convenient and efficient way.
    //                 The Operating System Tutorial is divided into various parts based on its functions such as Process Management, Process Synchronization, Deadlocks and File Management`,
    //     sections: [{
    //         sectionName: 'Section 1',
    //         sectionDesc: 'Description for section 1'
    //     }]
    // });

    
    // newTopic.save()
    // .then(topic=> {
    //     console.log("topic added");
    // })
    // .catch(error => {
    //     console.log("Error adding sample content:")
    // });

    // newTopic1.save()
    // .then(topic=> {
    //     console.log("topic added");
    // })
    // .catch(error => {
    //     console.log("Error adding sample content:")
    // });


    // const sampleContent = new content({
    //     name: "Operating System",
    //     topics: [newTopic._id,newTopic1._id]
    // });
    
    // sampleContent.save()
    // .then(savedContent => {
    //     console.log("Sample content added:", savedContent);
    // })
    // .catch(error => {
    //     console.error("Error adding sample content:", error);
    // });