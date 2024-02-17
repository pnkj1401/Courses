const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const content = require("../schemas/contentSchema");
const topic = require("../schemas/topicSchema");

app.set("view engine","pug");
app.set("views","views");

router.get('/', async (req, res) => {
    try {
        let data = [];
        const result = await content.findById(req.query.id);

        for (const item of result.topics) {
            const topicResult = await topic.findById(item._id);
            data.push(topicResult);
        }

        res.status(200).render("content", { data,result });
    } catch (error) {
        console.log("Internal Server Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/topic",async (req,res,next)=>{
    try{
        const id = req.query.id;
        const result =await topic.findById(id)
        console.log(result);
        res.status(200).send(result);
    }
    catch(error){
        console.log("Internal Server Error:", error);
        res.status(500).send("Internal Server Error");
    }
    
    
})



module.exports = router;