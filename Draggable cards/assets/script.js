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

    if (id != null) {
        dragElement(document.getElementById(id).parentElement);
        //get the selected note card div
    }
}

function displayAddNewForm() {
    console.log("add new form btn clicked.");
    var newCardForm = document.getElementsByClassName("addNewForm")[0];

    var offSetTopOfNewBtn = document.getElementsByClassName("addNewCardBtn")[0].offsetTop;

    console.log("off set to new btn : " + offSetTopOfNewBtn);

//    newCardForm.style.position = "absolute";
//    newCardForm.style.top = "14vh";
//    newCardForm.style.right = "10px";

    if (newCardFormDisplay) {
        newCardForm.style.left = "100vw";
        newCardFormDisplay= false;
    } else {
        newCardForm.style.left = "72vw";
        newCardFormDisplay = true;
    }




}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    elmnt.addEventListener("mousedown", function (e) {
        e = e || window.event;
        e.preventDefault();

        // get the mouse cursor position at startup (x,y):
        pos3 = e.clientX;
        pos4 = e.clientY;

        //add mouse release function to the selected notecard
        document.onmouseup = closeDragElement;

        //add mouse move function to the selected notecard
        document.onmousemove = elementDrag;
    });


    function elementDrag(e) {
        e = e || window.event;
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
function addNewCard() {
    console.log("add new card clicked.");

    var newCardItem = '<div class="noteCard"><div class="noteCardHeader" id="card' + (cardsAmount + 1) + '"><input value="Put your title here" class="cardInput"/></div><div class="noteCardBody">Put your content here</div></div>';

    document.getElementsByClassName("canvas")[0].innerHTML += newCardItem;

    cardsAmount += 1;
}
//add new card click event
