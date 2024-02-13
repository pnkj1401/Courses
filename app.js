const express = require("express");
const app = express();
const port = 3001;
const middleware = require('./middleware');
const path = require('path');
const bodyparser = require("body-parser");
const mongoose = require("./database");
const multer = require('multer');
const session = require("express-session");


app.set("view engine","pug");
app.set("views","views");

app.use(bodyparser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,"public")));

  

app.use(session({
    secret:"mama love",
    resave:true,
    saveUninitialized:false
}))

//routes
const loginRoute = require('./routes/loginroutes');
const registerRoute = require('./routes/registerroutes');
const logoutRoute = require('./routes/logoutroutes');
const postpageroute = require('./routes/postroutes');
const profilepageroute = require('./routes/profileRoutes');
const resetpassword = require('./routes/resetpassworsroute');
const settingroute = require('./routes/settingroutes');
const uploadrouter = require('./routes/upload');
//api routes
const postApiRoute = require('./routes/api/post');
// const followApiRoute = require('./routes/followhandler');
// const upload = require('./routes/upload');


app.use("/login",loginRoute);
app.use("/register",registerRoute);
app.use("/logout",logoutRoute);
app.use("/reset-password",resetpassword);
app.use("/setting",settingroute);
app.use("/fileupload",uploadrouter);
app.use("/post",middleware.requireLogin,postpageroute);
app.use("/profile",middleware.requireLogin,profilepageroute);
app.use("/api/post",postApiRoute);

// app.use("/upload",upload.single('image'), upload);


const server = app.listen(port,()=>
    console.log("server is running at port ::" + port)
);


app.get("/",(req,res,next) =>{
    res.status(200).render("home");
} )