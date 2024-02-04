const express = require("express");
const multer = require("multer");
const app = express();
const router = express.Router();



router.get('/',  function (req, res, next) {
        
    res.render('fileupload', {title:'fileupload in js ', message  : request.flash('success')});
 })

 router.post('/',  function (req, res, next) {
        
   var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./public/uploads');
    },
    filename :function(req,file,cb){
            var temp_file_arr = file.originalname.split(".");
            var temp_file_name = temp_file_arr[0];
            var temp_file_extension = temp_file_arr[1];

            cb(null ,temp_file_name + '-' + Date.now() + '.' + temp_file_extension);

    }
   });

   var upload = multer({
    storage:storage
   }).single('avatar');

   upload(req, res , function(error){
    if(error){
        return res.end("error")
    }
    else{
        return res.end("uploaded")
    }
   });
 })

 module.exports = router;