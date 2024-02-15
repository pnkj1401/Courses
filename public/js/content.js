let topics = document.getElementsByClassName("topicName");

Array.from(topics).forEach(element => {
    console.log(element.children)
    element.children[0].addEventListener("click", () => {
        let childNode = element.childNodes;
        let id = childNode[1].getAttribute("id");
        window.location.href = `/content/topic?id=${id}`;
    });
});