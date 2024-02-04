const express = require("express");
const multer = require("multer");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const User = require("../../schemas/userSchema");
const Post = require("../../schemas/PostSchema");

app.use(bodyparser.urlencoded({extended:false}));

// storage setting

      

router.get("/",async (req,res,next) =>{

        var searchObj  = req.query;

        if(searchObj.isReply !== undefined){
                var isReply = searchObj.isReply =="true";
                searchObj.replyTo = {$exists:isReply};  
                delete searchObj.isReply; 
                console.log(searchObj);
        }

        var results = await getposts(searchObj);
        res.status(200).send(results);
} )

router.get("/:id",async (req,res,next) =>{
     
        var postId = req.params.id;
        var postData = await getposts({_id : postId});
        postData = postData[0];

        var results ={
                postData : postData
        }
        if(postData.replyTo !== undefined){
                results.replyTo = postData.replyTo; 
        }

        results.replies = await getposts({replyTo:postId});
        return res.status(200).send(results);
      
} )

router.post("/",async (req,res,next) =>{

      

    if(!req.body.content){
            console.log("content parameter not found")
            return res.sendStatus(400);
         }
    
      var postData ={
        content : req.body.content,
        postedby : req.session.user
      }
      if(req.body.replyTo){
        postData.replyTo = req.body.replyTo; 
}
    

      Post.create(postData)
      .then(async newPost=>{
       newPost = await User.populate(newPost,{path:"postedby"});

        res.status(201).send(newPost);
      })
      .catch((error)=>{
        console.log(error);
        res.sendStatus(400);
      })

} )

router.put("/:id/like",async (req,res,next) =>{
        // console.log(req.params.id);
        var postId =  req.params.id;
        var userId = req.session.user._id;

        var isliked = req.session.user.likes && req.session.user.likes.includes(postId);
        // console.log("is liked" + isliked);
        var option = isliked ?"$pull":"$addToSet";
        // insert user likes
         req.session.user =await User.findByIdAndUpdate(userId,{[option]:{likes:postId }},{new:true})
        .catch(error=>{
                console.log(error)
                res.sendStatus(400);
        })

        
        // insert post likess
        var post =await Post.findByIdAndUpdate(postId,{[option]:{likes:userId }},{new:true})
        .catch(error=>{
                console.log(error)
                res.sendStatus(400);
        })

        
        
        res.status(200).send(post);
    
    } )

router.post("/:id/retweet",async (req,res,next) =>{
        // console.log(req.params.id);
        var postId =  req.params.id;
        var userId = req.session.user._id;

        var deletepost = await Post.findOneAndDelete({postedby:userId, retweetData: postId })
        .catch(error=>{
                console.log(error)
                res.sendStatus(400);
        })
        
        var option = deletepost != null ?"$pull":"$addToSet";

        // return res.status(200).send(option);


        var repost = deletepost;
        
        if(repost == null){
                repost = await Post.create({postedby:userId, retweetData: postId })
                .catch(error=>{
                        console.log(error)
                        res.sendStatus(400);
                })
        }
         req.session.user =await User.findByIdAndUpdate(userId,{[option]:{retweets:repost._id }},{new:true})
        .catch(error=>{
                console.log(error)
                res.sendStatus(400);
        })

        
        
        var post =await Post.findByIdAndUpdate(postId,{[option]:{retweetUsers:userId }},{new:true})
        .catch(error=>{
                console.log(error)
                res.sendStatus(400);
        })

        
        
       return res.status(200).send(post);
    
    } )

    
router.delete("/:id", (req,res,next) =>{
        Post.findByIdAndDelete(req.params.id)
        .then(()=>res.sendStatus(202))
        .catch(error=>{
                console.log(error)
                res.sendStatus(400);
        })
} )

async function getposts(filter){
       var results = await Post.find(filter)
        .populate("postedby")
        .populate("retweetData")
        .populate("replyTo")
        .populate("uploads")
        .sort({"createdAt":-1})
        .catch((error)=>{
        console.log(error);
      })
      var results = await User.populate(results,{path:"replyTo.postedby"})

      return await User.populate(results,{path:"retweetData.postedby"});
}
    
module.exports = router;