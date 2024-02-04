$("#postTextarea, #replypostTextarea").keyup(event =>{
    var textbox = $(event.target);
    var value = textbox.val().trim()

    var ismodal = textbox.parents(".modal").length == 1;


    var submitButton =ismodal ?$("#submitReplyButton"):$("#submitpostButton");

    if(submitButton.length == 0){
        return alert("baba no submit")
    }
    if(value == ""){
        submitButton.prop("disabled",true);
        return ;
    }
    submitButton.prop("disabled",false);
})

$("#ReplyModal").on("show.bs.modal",(event)=>{
    var button = $(event.relatedTarget);
    var postId  = getpostIdFreomElement(button);

    $("#submitReplyButton").data("id", postId); // storing id on the cache not the root itself

    $.get("/api/post/" + postId, results =>{
        // console.log(results);
        outputPosts(results.postData, $("#OriginalPostContainer"));
    })
})

$("#ReplyModal").on("hidden.bs.modal",()=>{
    $("#OriginalPostContainer").html("");
})

$("#deletePostModal").on("show.bs.modal",(event)=>{
    var button = $(event.relatedTarget);
    var postId  = getpostIdFreomElement(button);

    $("#deletePostButton").data("id", postId); // storing id on the cache not the root itself
})

$("#deletePostButton").click((event) =>{

    var postId = $(event.target).data("id");
    

    


    $.ajax({
        url : `/api/post/${postId}`,
        type : "DELETE",
        success:()=>{
           location.reload();
        }
    })
})

$("#submitpostButton , #submitReplyButton").click(event=>{
    var button = $(event.target);
    var ismodal = button.parents(".modal").length == 1;

    var textbox = ismodal ? $("#replypostTextarea") : $("#postTextarea");

    var data ={
        content : textbox.val()
    }

    if(ismodal){
        var id = button.data().id;
        // console.log("id is modal", id);
        if(id == null ) return alert('reply button id is null');
        data.replyTo = id;
    }

    $.post("/api/post",data,(postData, status ,xhr) =>{
        if(postData.replyTo){
            location.reload();
        }
        else{
            var html = createPost(postData);
            $(".PostmainContainer").prepend(html);
            textbox.val("");
            button.prop("disabled",true);
            }
})

})

$(document).on("click",".likeButton",(event)=>{

    var button = $(event.target);
    var postId  = getpostIdFreomElement(button);
    // console.log(postId);

    if(postId == undefined) return;

    $.ajax({
        url : `/api/post/${postId}/like`,
        type : 'PUT',
        success:(postData)=>{
            button.find("span").text(postData.likes.length || "");  
            
            if(postData.likes.includes(userLogIn._id)){
                button.addClass("active");
            }
            else{
                button.removeClass("active");
            }
        }
    })

})


$(document).on("click",".retweetbutt",(event)=>{
    var button = $(event.target);
    var postId  = getpostIdFreomElement(button);
    // console.log(postId);

    if(postId == undefined) return;

    $.ajax({
        url : `/api/post/${postId}/retweet`,
        type : 'POST',
        success:(postData)=>{
            button.find("span").text(postData.retweetUsers.length || "");  
            
            if(postData.retweetUsers.includes(userLogIn._id)){
                button.addClass("active");
            }
            else{
                button.removeClass("active");
            }
            // console.log(postData);  
        }
    })

})

$(document).on("click",".post",(event)=>{

    var element = $(event.target);
    var postId  = getpostIdFreomElement(element);

    if(postId !== undefined && !element.is("button")){
        window.location.href ='/post/' + postId;
    }
})

function getpostIdFreomElement(element){

    var isroot = element.hasClass("post");
    var rootElement = isroot == true? element: element.closest(".post");
    var postId = rootElement.data().id;

    if(postId == undefined) return alert("post id not found");

    return postId;
}


function createPost(postData){

    if(postData == null) return alert("post object is null bhai ji");

    var isRetwwet = postData.retweetData !== undefined;

    var retweetBy = isRetwwet ?  postData.postedby.username:null;

    postData = isRetwwet? postData.retweetData:postData;

    // console.log(isRetwwet);

    var postedby = postData.postedby;

    if(postedby._id === undefined){
       return console.log("user object is not populated")
    }

    var displayName = postedby.firstname + " " + postedby.lastname;
    var timeStamp  =  timeDifference(new Date(), new Date(postData.createdAt));

    var likeButtonActive = postData.likes.includes(userLogIn._id)?"active":"";
    var retweetButtonActive = postData.retweetUsers.includes(userLogIn._id)?"active":"";

    var retweetText =  "";

    if(isRetwwet){
        retweetText = `<span><i class ='fas fa-retweet'></i> Reconfessed by <a href ='/profile/${retweetBy}'>@${retweetBy}</a></span>`
    }

    var replyFlag =  "";

    if(postData.replyTo && postData.replyTo._id){
        
        if(!postData.replyTo._id){
            return alert("id no found populated reply")

        }
        if(!postData.replyTo.postedby._id){
            return alert("id no found populated posted")

        }
        var replyToUsername = postData.replyTo.postedby.username;

        replyFlag = `<div class ='replyFlag'> Replying to  <a href ='/profile/${replyToUsername}'>@${replyToUsername}</a></div>`


    }


    var buttons = "";

    if(postData.postedby._id == userLogIn._id){
        buttons = `<button data-id = "${postData._id}" data-toggle="modal" data-target ="#deletePostModal" >
        <i class ='fas fa-times'></i>
    </button>`
    }

    return `<div class ='post' data-id='${postData._id}' >
    <div class ='PostActionContainer'>
    ${retweetText}
    </div>
    <div class ='mainContentContainer'>
         <div class ='userImageContainer'>
            <img src='${postedby.profilePic}'>
            </div>
        <div class ='PostContainer'>
            <div class ='postheader'><a href='/profile/${postedby.username}'><span class="name">${displayName}</span>'</a>
            <span class="username">@${postedby.username}</span>
            <span class="date">${timeStamp}</span>
            ${buttons}
            </div>

            ${replyFlag}
            <div class ='PostBody'><span>${postData.content}</span></div>
            
            <div class ='Postfooter'>
            <div class ='mainButtoncontainer'>
            <button data-toggle='modal' data-target='#ReplyModal'>
                <i class ='far fa-comment'></i>
            </button>
            
            </div>
            <div class ='mainButtoncontainer green'>
            <button class ='retweetbutt ${retweetButtonActive}' >
                <i class ='fas fa-retweet'></i>
                <span>${postData.retweetUsers.length || ""}</span>
            </button>
            
            </div>
            <div class ='mainButtoncontainer red'>
            <button class ='likeButton ${likeButtonActive}' >
                <i class ='far fa-heart'></i>
                <span>${postData.likes.length || ""}</span>
            </button>
            
            </div>
            </div>
        </div>
    </div>`;
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000<30){
            return ' just now'; 
        }
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return  Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return  Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return  Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

async function outputPosts(results,container){

    container.html("");

    if(!Array.isArray(results)){
        results = [results];
    }
    results.forEach(result => {
        var html = createPost(result);
    container.append(html);

    });


    if(results.length == 0 ){
        container.append("<span class='noResults'>no result found</span>");
    }
    
}

async function outputPostswithReplies(results,container){
    container.html("");

    if(results.replyTo !== undefined && results.replyTo._id !== undefined){
        var html = createPost(results.replyTo);
        container.append(html);
    }
    var mainPosthtml = createPost(results.postData);
        container.append(mainPosthtml);

    results.replies.forEach(result => {
        var html = createPost(result);
        container.append(html);

    });
}


