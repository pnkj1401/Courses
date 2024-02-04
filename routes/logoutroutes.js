const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt"); 



app.use(bodyparser.urlencoded({extended:false}));

router.get("/",(req,res,next) =>{
      if(req.session){
        req.session.destroy(()=>{
            res.redirect("/login");
        });
      }
} )




module.exports = router;