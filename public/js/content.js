let topics = document.getElementsByClassName("topicName");

let childNode = topics[0].childNodes;
topics[0].classList.add("active");
let firstid = childNode[1].getAttribute('id');

let req = new XMLHttpRequest();
req.open("GET",`/content/topic?id=${firstid}`);
req.send();
req.onload = ()=>{
    let res = JSON.parse(req.responseText);
    showContent(res);
}

let previousActiveElement = topics[0];

for(let i=0;i<topics.length;i++){

    topics[i].addEventListener("click", function (){

        if (previousActiveElement) {
            previousActiveElement.classList.remove("active");
        }

        this.classList.add("active");
        previousActiveElement = this;

        let childNode = this.childNodes;
        let id = childNode[1].getAttribute("id");

        let request = new XMLHttpRequest();

        request.open("GET",`/content/topic?id=${id}`);
        request.send();
        request.onload = ()=>{
            const result = JSON.parse(request.responseText);
            showContent(result);
        }
    })
}


function showContent(result){
    console.log(result);
    let contentSection = document.querySelector(".content");
    contentSection.innerHTML='';
    let topicDesc = document.createElement('div');
    topicDesc.class = "topicDesc";
    topicDesc.innerText = result.topicDesc;
    let sectionHeading = document.createElement('h3');
    let sectionDesc = document.createElement('p');

    result.sections.forEach(item =>{
        sectionHeading.innerText = `${item.sectionName}`;
        sectionDesc.innerText = `${item.sectionDesc}`;
    })

    contentSection.appendChild(topicDesc);
    contentSection.appendChild(sectionHeading);
    contentSection.appendChild(sectionDesc);

}