var type = "";
var message = "";
var bgColor = "";
var fontColor = "";
var position = "";

var alertRunning = false;
var validPositions = ["top-left", "top-right", "center-left", "center-right", "bottom-left", "bottom-right"];

var iconAlerData = [
    {
        type: "default",
        iconBackgroundColor: "#006400",
        iconClassArray: ["far", "fa-bell"],
        messageBackgroundColor: "#008000"
    },
    {
        type: "success",
        iconBackgroundColor: "#008B8B",
        iconClassArray: ["far", "fa-check-circle"],
        messageBackgroundColor: "#20B2AA"
    },
    {
        type: "danger",
        iconBackgroundColor: "#DC381F",
        iconClassArray: ["fa", "fa-exclamation-circle"],
        messageBackgroundColor: "#FF0000"
    },
    {
        type: "fail",
        iconBackgroundColor: "#EAC117",
        iconClassArray: ["far", "fa-times-circle"],
        messageBackgroundColor: "#FDD017"
    }
]; //hold the data related to icon alerts


function getStylesNameForPosition(recPosition) {

    //validate the received position and return the position styles name
    if (validPositions.includes(recPosition)) {
        console.log("valid position");
        return "noti-" + recPosition;
    } else {
        console.error("invalid position for notification. Please use one of these " + validPositions);
        return null;
    }

}

function getAnimationDirection(positionStylesClassName) {
    //get the animation style class name by splitting the positionStylesClassName
    var type = positionStylesClassName.split("-")[2]; //get the third elem of the array
    var res = "rightToLeft";

    if (type == "left") {
        var res = "leftToRight";
    }

    return res;
}

function timeOutForRunningAlert(timeInSeconds) {
    //timeout function. Duration should be equal to notification s animate duration
    setTimeout(function () {
        alertRunning = false;
    }, timeInSeconds * 1000);
}

function notification(type, message, position, bgColor, fontColor) {
    //validate and set default values for the parameters if they are null
    console.log("first : " + this.type);
    this.type = type || "basic";
    this.message = message || "No message set";
    this.position = position || "bottom-right";
    this.bgColor = bgColor || "#008C8C";
    this.fontColor = fontColor || "#ffff";

    console.log("msg : " + this.type);
    console.log("msg : " + this.message);
    console.log("bgcolor : " + this.bgColor);
    console.log("font color : " + this.fontColor);
    console.log("position : " + this.position);

    if (!alertRunning) {
        //no alerts are running

        if (this.type == "basic") {
            basicNotification();
        } else if (this.type == "icon-default" || this.type == "icon-success" || this.type == "icon-fail" || this.type == "icon-danger") {
            iconNotification(this.type.split("-")[1]);
        }

    }
}

function addStylesAndAnimationsToTheOuterDiv(outerDivNode) {
    var styleClassForPosition = getStylesNameForPosition(this.position);
    outerDivNode.classList.add(styleClassForPosition);

    //adding animation styles
    var animationDirection = getAnimationDirection(styleClassForPosition);
    outerDivNode.style.animation = animationDirection + " 4s ease-out";
    outerDivNode.style.webkitAnimation = animationDirection + " 4s ease-out";
}

function basicNotification() {
    console.log("third : " + type);

    var divNode = document.createElement("DIV");
    divNode.classList.add("notification");

    addStylesAndAnimationsToTheOuterDiv(divNode);

    //add basic styles
    divNode.style.backgroundColor = this.bgColor;
    divNode.style.color = this.fontColor;

    // set the message
    divNode.innerHTML = this.message;

    //add created div to the body
    document.body.appendChild(divNode);

    //set up timeout for avoid notifications overflow
    alertRunning = true;
    timeOutForRunningAlert(4);

}

function getRelevantDataObjectToIconAlert(iconAlertType) {

    for (var i = 0; i < iconAlerData.length; i++) {
        if (iconAlerData[i].type == iconAlertType) {
            return iconAlerData[i];
        }
    }

}

function createTheIconNode(iconClassArray) {
    var iconNode = document.createElement("I");
    
    for(var i=0; i<iconClassArray.length; i++){
        iconNode.classList.add(iconClassArray[i]);
    }
    
    return iconNode;

}

function iconNotification(iconAlertType) {
    console.log("icon notification : " + this.type + " " + iconAlertType);
    var dataObject = getRelevantDataObjectToIconAlert(iconAlertType);

    //outer div
    var divNode = document.createElement("DIV");
    divNode.classList.add("notification-icon");

    //inner div
    var innerRow = document.createElement("DIV");
    innerRow.classList.add("row");

    //inner div children-------------------------------
    var childDivOneNode = document.createElement("DIV");
    childDivOneNode.classList.add("notification-icon-holder");
    childDivOneNode.style.backgroundColor = dataObject.iconBackgroundColor;

    childDivOneNode.appendChild(createTheIconNode(dataObject.iconClassArray));

    var childDivTwoNode = document.createElement("DIV");
    childDivTwoNode.classList.add("notification-icon-message");
    childDivTwoNode.style.backgroundColor = dataObject.messageBackgroundColor;

    childDivTwoNode.innerHTML = this.message;
    //inner div children--------------------------------

    //add children to inner div ("row")
    innerRow.appendChild(childDivOneNode);
    innerRow.appendChild(childDivTwoNode);
    //add children to inner div ("row")

    //add inner row div to outer div
    divNode.appendChild(innerRow);
    addStylesAndAnimationsToTheOuterDiv(divNode);
    //add inner row div to outer div

    //add created div to the body
    document.body.appendChild(divNode);

}
