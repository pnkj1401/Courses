
$(document).ready(()=>{
})


for(let i=0;i<3;i++)
{
    var html = createCourseCard();
    $(".courseSection").append(html);
}


// let exploreBtn = document.getElementById();
// exploreBtn.onclick(()=>{
    
// })

let studyMaterial = document.getElementsByClassName("studyMaterial");
Array.from(studyMaterial).forEach(element => {
    element.addEventListener("click", () => {
        let id = element.getAttribute("id");
        console.log(id);
        window.location.href=`/content/?id=${id}`;
    });
});




function createCourseCard() {
    return `<div class="course">
            <img class="courseImg" src='https://th.bing.com/th/id/OIG1.exU30042Ax8.KOJUFf8h?pid=ImgGn'/>
            <h1>ABC</h1>
            <div class="courseHighlight"> 
                <span class="highlight"> abc </span>
                <span class="highlight"> abc </span>
                <span class="highlight"> abc </span>
                <span class="highlight"> abc </span>
            </div>
            <button id="exploreBtn"> Explore Now </button>
            </div>`;

}
