const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const bcrypt = require("bcrypt"); 
const multer = require('multer');
const User = require("../schemas/userSchema");



app.set("view engine","pug");
app.set("views","views");

app.use(bodyparser.urlencoded({extended:false}));



router.get("/",(req,res,next) =>{

        var payload = {
        pagetitle : req.session.user.username,
        userLogIn : req.session.user,
        userLogInJS :JSON.stringify(req.session.user),
        profileUser : req.session.user   

    }
    res.status(200).render("profilePage",payload);
} )

router.get("/:username",async (req,res,next) =>{

    var payload = await getpayload(req.params.username, req.session.user);
    // console.log(payload);
res.status(200).render("profilePage",payload);
} )


router.get("/:username/replies",async (req,res,next) =>{

    var payload = await getpayload(req.params.username, req.session.user);

    payload.selectedTab = "replies";
    // console.log(payload);
res.status(200).render("profilePage",payload);
} )



async function  getpayload(username,userLogIn){
    var user = await User.findOne({username:username});

    if(user == null){
        // user = await User.findById(username);

        // if(user == null){
            return{
                pagetitle : "User not found",
                userLogIn : userLogIn,
                userLogInJS :JSON.stringify(userLogIn),

            }
        // }

    }
            return {
                pagetitle : user.username,
                userLogIn : userLogIn,
                userLogInJS :JSON.stringify(userLogIn),
                profileUser : user 
            }
}


module.exports = router;