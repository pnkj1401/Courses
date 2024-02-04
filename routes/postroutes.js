const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const bcrypt = require("bcrypt"); 
const User = require("../schemas/userSchema");

app.set("view engine","pug");
app.set("views","views");

app.use(bodyparser.urlencoded({extended:false}));


router.get("/:id",(req,res,next) =>{

        var payload = {
        pagetitle : 'View Post',
        userLogIn : req.session.user,
        userLogInJS :JSON.stringify(req.session.user),
        postId : req.params.id

    }
    res.status(200).render("postpage",payload);
} )




module.exports = router;