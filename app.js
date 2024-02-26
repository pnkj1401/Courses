const express = require("express");
const app = express();
const port = 3001;
const middleware = require('./middleware');
const path = require('path');
const bodyparser = require("body-parser");
const mongoose = require("./database");
const multer = require('multer');
const session = require("express-session");
const content = require("./schemas/contentSchema");
const Topic = require("./schemas/topicSchema")

app.set("view engine","pug");
app.set("views","views");

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());

  

app.use(session({
    secret:"mama love",
    resave:true,
    saveUninitialized:false
}))

//routes
const homeroutes = require('./routes/homeroutes');
const loginRoute = require('./routes/loginroutes');
const registerRoute = require('./routes/registerroutes');
const logoutRoute = require('./routes/logoutroutes');
const postpageroute = require('./routes/postroutes');
const profilepageroute = require('./routes/profileRoutes');
const resetpassword = require('./routes/resetpassworsroute');
const settingroute = require('./routes/settingroutes'); 
const uploadrouter = require('./routes/upload');
const contentRouter = require('./routes/contentRoutes');
const addTopic = require('./routes/topicRoutes');
//api routes
const postApiRoute = require('./routes/api/post');
// const followApiRoute = require('./routes/followhandler');
// const upload = require('./routes/upload');

// app.use("/",homeroutes);
app.use("/login",loginRoute);
app.use("/register",registerRoute);
app.use("/logout",logoutRoute);
app.use("/reset-password",resetpassword);
app.use("/setting",settingroute);
app.use("/fileupload",uploadrouter);
app.use("/post",middleware.requireLogin,postpageroute);
app.use("/profile",middleware.requireLogin,profilepageroute);
app.use("/api/post",postApiRoute);
app.use("/content",contentRouter)
app.use("/topic",addTopic);
// app.use("/upload",upload.single('image'), upload);

const server = app.listen(port,()=>
    console.log("server is running at port ::" + port)
);

app.get("/",(req,res,next)=>{
    content.find({})
        .then(result=>{
            res.status(200).render("home",{result});
        })
        .catch(error=>{
            res.status(300).render("home",{error});
        })
   
       
})
