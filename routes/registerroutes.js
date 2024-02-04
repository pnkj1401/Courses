const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const bcrypt = require("bcrypt"); 

const User = require("../schemas/userSchema"); 



app.set("view engine","pug");
app.set("views","views");

app.use(bodyparser.urlencoded({extended:false}));



router.get("/",(req,res,next) =>{
    res.status(200).render("register");
} )


router.post("/",async (req,res,next) =>{
    
    var firstname = req.body.firstname.trim();
    var lastname = req.body.lastname.trim();
    var username = req.body.username.trim();
 
    var email = req.body.email.trim();
    var password = req.body.password;
    var securityQuestion = req.body.securityQuestion;
    var securityAnswer = req.body.securityAnswer;

    
    var payload = req.body ;
    
    if(req.file){
        user.image = req.file.path;
    }

    if(firstname && lastname && username && email && password){
      var user = await User.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
       }) 
       .catch((error)=>{
            console.log(error);
            payload.errorMessage ="Something went wrong";
            res.status(200).render("register",payload);

       })

       if(user == null){
        //  enter to database cuz no user found
        var data = req.body;

        //bcrypt password
        // data.password = await bcrypt.hash(password,10); 

        // console.log(password)
        User.create(data)
        .then((user)=>{
                console.log(user);
                req.session.user = user;
                return res.redirect("/");
        })
       }

       else{
        // user found
       if(email ==user.email){
           
                payload.errorMessage ="email already exist";
            }
            else
            {
                payload.errorMessage ="username already exist";
            }
            res.status(200).render("register",payload);
       }
    }
    else{
        payload.errorMessage ="make sure to enter only valid values in fields:";
        res.status(200).render("register",payload);
    }
} )



module.exports = router;