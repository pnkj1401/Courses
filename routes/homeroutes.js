const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 


app.set("view engine","pug");
app.set("views","views");

app.use(bodyparser.urlencoded({extended:false}));





module.exports = router;