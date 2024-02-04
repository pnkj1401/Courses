const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt"); 

app.set("view engine","pug");
app.set("views","views");

app.use(bodyparser.urlencoded({extended:false}));

router.get("/",(req,res,next) =>{
      res.status(200).render("setting");
} )


module.exports = router;