$(document).ready(()=>{
    
})

    for(let i=0;i<3;i++)
    {
        var html = createCourseCard();
        $(".courseSection").append(html);
    }


    function createCourseCard() {
        return `<div class="course">
                <img class="courseImg" src='https://th.bing.com/th/id/OIG1.exU30042Ax8.KOJUFf8h?pid=ImgGn'/>
                <div class="courseHighlight"> 
                    <span class="highlight"> abc </span>
                    <span class="highlight"> abc </span>
                    <span class="highlight"> abc </span>
                    <span class="highlight"> abc </span>
                </div>
                <button class="exploreBtn"> Explore Now </button>
                </div>`;

    }
