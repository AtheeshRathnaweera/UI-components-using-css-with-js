var currentElement = null;//hold the currentElement
var depthCardNames = ["depthCard", "depthCard-content", "depthCard-title", "depthCard-body"];
//div class names related to depthCards


$(document).ready(function () {
    var depthCardsList = document.getElementsByClassName("depthCard");
    //get all the depth cards

    for (var i = 0; i < depthCardsList.length; i++) {
        depthCardsList[i].classList.add("card");//add "card" class to depthCards
        var backgroundImageUrl = depthCardsList[i].getAttribute("depth-background-image");
        depthCardsList[i].style.backgroundImage = "url("+backgroundImageUrl+")";
        console.log("url : "+backgroundImageUrl);
    }
});

window.onmouseover = function (e) {

    if (depthCardNames.includes(e.target.classList[0])) {
        //if target is related to depthCard
        hoverEvent(e.target);//call the hoverEvent
    } else {
        //if target is not related to depthCard
        hideThePreviousElement();
    }
};


function hoverEvent(elem) {

    if (currentElement != elem) {
        
        if (elem.classList[0] == "depthCard-title" || elem.classList[0] == "depthCard-body") {
            elem = elem.parentElement.parentElement; //get the main parent --> depthCard
        } 
        
        elem.getElementsByClassName("depthCard-content")[0].getElementsByClassName("depthCard-body")[0].style.display = 'block';//display the card body div

        currentElement = elem; //set the received element as the currentElement
    }

}


function hideThePreviousElement() {
    if (currentElement != null) {
        currentElement.getElementsByClassName("depthCard-content")[0].getElementsByClassName("depthCard-body")[0].style.display = "none";//hide the currentElement
        currentElement = null;//remove the currentElement
    }
}
