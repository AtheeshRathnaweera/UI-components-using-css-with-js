$(document).ready(function () {
    console.log("ready started");
});


document.getElementById("bottomRightLaunch").onclick = function () {
    notification("Bottom left notification.","darkblue","white","bottom-right");
}

document.getElementById("centerRightLaunch").onclick = function () {
    notification("Center right notification.","darkblue","white","center-right");
}

document.getElementById("topRightLaunch").onclick = function(){
     notification("Top right notification.","darkgreen","white","top-right");
}

function getStylesNameForPosition(recPosition) {
    var validPositions = ["top-left", "top-right", "center-left", "center-right", "bottom-left", "bottom-right"];

    if (validPositions.includes(recPosition)) {
        console.log("valid position");
        return "noti-" + recPosition;
    } else {
        console.error("invalid position for notification. Please use one of these " + validPositions);
        return null;
    }

}

function getAnimationDirection(positionStylesClassName) {
    var type = positionStylesClassName.split("-")[2];
    var res = "rightToLeft";

    if (type == "left") {
        var res = "leftToRight";
    }
    
    return res;
}

function notification(message, bgColor, fontColor, position) {
    message = message || "No message set";
    bgColor = bgColor || "#008C8C";
    fontColor = fontColor || "#ffff";
    position = position || "bottom-right";

    console.log("msg : " + message);
    console.log("bgcolor : " + bgColor);
    console.log("font color : " + fontColor);
    console.log("position : " + position);

    var notificationHtml = '<div class="notification">This is a test notification.</div>';

    var divNode = document.createElement("DIV"); // Create a <li> node
    divNode.classList.add("notification");

    var styleClassForPosition = getStylesNameForPosition(position);
    divNode.classList.add(styleClassForPosition);

    divNode.style.backgroundColor = bgColor;
    divNode.style.color = fontColor;

    var animationDirection = getAnimationDirection(styleClassForPosition);
    console.error(animationDirection);

    divNode.style.animation = animationDirection+" 4s ease-out";
    divNode.style.webkitAnimation = animationDirection+" 4s ease-out";

    divNode.innerHTML = message; // Create a text node
    document.body.appendChild(divNode);


    //    
    //    setTimeout(function () {
    //        console.log("timr up");
    //        divNode.style.right = "-50vw";
    //        divNode.style.display = "none";
    //    }, 2000);
}
