$(document).ready(()=>{
    $.get("/api/post/" + postId, results =>{
        outputPostswithReplies(results,$(".PostmainContainer"));
        console.log(results);
    })
})

