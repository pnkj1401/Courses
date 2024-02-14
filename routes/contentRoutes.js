const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const content = require("../schemas/content")

app.set("view engine","pug");
app.set("views","views");

router.get("/",(req,res,next)=>{
    console.log(req.query.id);
    content.findById(req.query.id)
    .then(result=>{
        console.log(result.name);
        res.status(200).render("content",result); 
    })
    .catch(error=>{
        console.log(error);
        res.status(500).render("home"); 
    })
    
})

module.exports = router;