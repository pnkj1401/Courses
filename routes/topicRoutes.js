const express = require("express");
const app = express();
const router = express.Router();
const Topic = require("../schemas/topicSchema");

router.post("/add",(req,res,next)=>{
    console.log(req.body);
    const topic = new Topic(req.body);
    try{
       topic.save(); 
    }catch(err){
        console.log("can't add topic");
        res.status(400).send("Can't add topic");
    }
    res.status(200).send("Topic added");
   
})

router.get("/",async (req,res,next)=>{
    try{
       let result = await Topic.find({});
       console.log(result);
       res.status(200).render("alltopics",{result});
    }catch(error){
        console.log("error in fetching topics");
        res.status(400).render("alltopics");
    }
    
})

module.exports= router;

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