var cardsAmount = 0;

var newCardFormDisplay = false;

$(document).ready(function () {

    var allCards = document.getElementsByClassName("noteCard");

    console.log("document ready function started. " + allCards.length);

    cardsAmount = allCards.length;
});

//draggable js
document.onmousedown = function (ev) {
    var id = ev.target.id;
    
    console.log("mouse donw: "+id);

    if (id != null) {
        if (id.includes("card")) {//drag only cards
           dragElement(document.getElementById(id).parentElement);
        }

        //get the selected note card div
    }
}

function dragElement(elmnt) {
    console.log("drag started.");
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    elmnt.addEventListener("mousedown", function (e) {
        
        console.log("element mouse down adding");
        
        e = e || window.event;
        e.preventDefault();

        // get the mouse cursor position at startup (x,y):
        pos3 = e.clientX;
        pos4 = e.clientY;

        //add mouse release function to the document
        document.onmouseup = closeDragElement;

        //add mouse move function to the document
        document.onmousemove = elementDrag;
    });


    function elementDrag(e) {
        e = e || window.event; // set default value to e if it is undefined
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
//draggable js

//add new card click event
function displayHowToIns(){
    var instructionCard = document.getElementsByClassName("instructionCard")[0];
    
    instructionCard.style.right = "62%";
    
     setTimeout(function(){
         console.log("timr up");
         instructionCard.style.right = "100vw";
     },4000);
   // instructionCard.style.right = "100vw";
    
}


function displayAddNewForm() {
    var newCardForm = document.getElementsByClassName("addNewForm")[0];

    var offSetTopOfNewBtn = document.getElementsByClassName("addNewCardBtn")[0].offsetTop;

    if (newCardFormDisplay) {
        newCardForm.style.left = "100vw";
        newCardFormDisplay = false;
    } else {
        newCardForm.style.left = "72vw";
        newCardFormDisplay = true;
    }

}


function saveCard() {

    var noteTitle = document.getElementsByClassName("titleInput")[0].value;
    var noteContent = document.getElementsByClassName("contentInput")[0].value;

    if (noteTitle.length > 0 && noteContent.length > 0) {
        //valid inputs
        addNewCard(noteTitle, noteContent);
    }
}

function addNewCard(title, content) {

    var newCardItem = '<div class="noteCard"><div class="noteCardHeader" id="card' + (cardsAmount + 1) + '">' + title + '</div><div class="noteCardBody">' + content + '</div></div>';//html string of not card

    document.getElementsByClassName("canvas")[0].innerHTML += newCardItem;
    
    var newlyCreatedCard = document.getElementById("card"+(cardsAmount+1)).parentElement;//get the parent element of newly created note card
    
    displayTheNewCardInRandomPosition(newlyCreatedCard);

    cardsAmount += 1; //increase the cards amount

    document.getElementsByClassName("addNewCardBtn")[0].click();//hide the form
}
//add new card click event

function displayTheNewCardInRandomPosition(element){
    //generate random number and set the position
    var randomValue =  Math.floor(Math.random() * 80 ) + 1;
    console.log("random : "+randomValue);
    
    element.style.position = "absolute";
    element.style.top = randomValue + "vh";
    element.style.left = randomValue + "vw";
}
