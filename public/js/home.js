$(document).ready(()=>{
    $.get("/api/post",results =>{
        outputPosts(results,$(".PostmainContainer"));
        console.log(results);
    })
   

})

