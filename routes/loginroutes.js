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
      res.status(200).render("login");
} )

router.post("/",async (req,res,next) =>{
      var email = req.body.logusername.trim();
      var password = req.body.logpassword;
      var payload = req.body ;
      
      if(req.body.logusername && req.body.logpassword){
            var user = await User.findOne({
                  $or:[
                      {email:email},
                      {password:password}
                  ]
                 }) 
                 .catch((error)=>{
                      console.log(error);
                      payload.errorMessage ="Something went wrong";
                      res.status(200).render("login",payload);
          
                 });

            if(user != null){
                  var result = await bcrypt.compare(req.body.logpassword,user.password);

                  if(result === true){
                        req.session.user = user;
                        return res.redirect("/");
                  }
                  else{
                        payload.errorMessage ="please check your email or password";
                        res.status(200).render("login",payload);
                  }
            
            }
            payload.errorMessage ="Make Sure each field has specific value";
            res.status(200).render("login",payload);
      }
} )



module.exports = router;