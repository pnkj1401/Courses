$(document).ready(()=>{
  
    if(selectedTab === "replies" )
    {
        loadreplies();
    }
    else{    loadposts();}
});

function loadposts(){
    
    $.get("/api/post",{ postedby:profileUserId ,isReply:false}, results =>{
        outputPosts(results,$(".PostmainContainer"));
         console.log(profileUserId);
    })
   
}
function loadreplies(){
    
    $.get("/api/post",{ postedby:profileUserId ,isReply:true}, results =>{
        outputPosts(results,$(".PostmainContainer"));
         console.log(profileUserId);
    })
   
}

function followhandler(e,profileUserId1){
    // console.log("profileuserid",profileUserId);
    const url =`${window.location.origin}/profile/${profileUserId1}/follow`;
    fetch( url, {
        method:"PUT",
    })
     .then((r) => r.json())
     .then((data) => {

        const followBtn = e.target;
        const isFollowing = data.followers.includes(user._id);

        const following = document.querySelector("a.following span");
        const followers = document.querySelector("a.follower span");

        if(isFollowing){
            followBtn.classList.add("active");
            followBtn.textContent = "following";
            following.textContent = data.following.length;
            followers.textContent = data.folllowers.length;

        }
        else{
            followBtn.classList.remove("active");
            followBtn.textContent = "follow";
            following.textContent = data.following.length;
            followers.textContent = data.folllowers.length;
        }
        


     });
}