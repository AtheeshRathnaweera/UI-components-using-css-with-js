var type = "";
var message = "";
var bgColor = "";
var fontColor = "";
var position = "";

var alertRunning = false;
var validPositions = ["top-left", "top-right", "center-left", "center-right", "bottom-left", "bottom-right"];

function getStylesNameForPosition(recPosition) {

    //validate the received position and return the position styles name
    if (validPositions.includes(recPosition)) {
        var resultString = "";
        console.log("valid position");

        if (this.type == "basic") {
            resultString = "noti-" + recPosition;
        } else if (this.type == "icon-default" || this.type == "icon-success" || this.type == "icon-fail" || this.type == "icon-danger") {
            resultString = "noti-icon-" + recPosition;
        }

        console.log("this is the position styles name: " + resultString);
        return resultString;

    } else {
        console.error("invalid position for notification. Please use one of these " + validPositions);
        return null;
    }

}

function getAnimationDirection(positionStylesClassName) {
    //get the animation style class name by splitting the positionStylesClassName
    var notiPosition = ""; //get the third elem of the array
    var customizeTypeString = "";
    var res = "";

    if (this.type == "basic") {
        notiPosition = positionStylesClassName.split("-")[2];
        customizeTypeString = "";
    } else if (this.type == "icon-default" || this.type == "icon-success" || this.type == "icon-fail" || this.type == "icon-danger") {
        notiPosition = positionStylesClassName.split("-")[3];
        customizeTypeString = "icon-";
    }

    if (notiPosition == "left") {
        res = customizeTypeString+"leftToRight";
    }else{
        res = customizeTypeString+"rightToLeft";
    }
    console.error("anim directions : " + res + " " + notiPosition);
    return res;
}

function timeOutForRunningAlert(timeInSeconds) {
    //timeout function. Duration should be equal to notification s animate duration
    setTimeout(function () {
        alertRunning = false;
    }, timeInSeconds * 1000);
}

function addStylesAndAnimationsToTheOuterDiv(outerDivNode) {
    var styleClassForPosition = getStylesNameForPosition(this.position);
    outerDivNode.classList.add(styleClassForPosition);

    //adding animation styles
    var animationDirection = getAnimationDirection(styleClassForPosition);
    outerDivNode.style.animation = animationDirection + " 4s ease-out";
    outerDivNode.style.webkitAnimation = animationDirection + " 4s ease-out";
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
