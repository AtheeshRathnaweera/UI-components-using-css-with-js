function notification(message, bgColor, fontColor, position) {
    //validate and set default values for the parameters if they are null
    message = message || "No message set";
    bgColor = bgColor || "#008C8C";
    fontColor = fontColor || "#ffff";
    position = position || "bottom-right";

    console.log("msg : " + message);
    console.log("bgcolor : " + bgColor);
    console.log("font color : " + fontColor);
    console.log("position : " + position);

    if (!alertRunning) {
        //no alerts are running
        
        //Create a div to hold the notification content
        var divNode = document.createElement("DIV");
        divNode.classList.add("notification");

        var styleClassForPosition = getStylesNameForPosition(position);
        divNode.classList.add(styleClassForPosition);

        //add basic styles
        divNode.style.backgroundColor = bgColor;
        divNode.style.color = fontColor;

        //adding animation styles
        var animationDirection = getAnimationDirection(styleClassForPosition);
        divNode.style.animation = animationDirection + " 4s ease-out";
        divNode.style.webkitAnimation = animationDirection + " 4s ease-out";

        // set the message
        divNode.innerHTML = message;
        
        //add created div to the body
        document.body.appendChild(divNode);

        //set up timeout for avoid notifications overflow
        alertRunning = true;
        timeOutForRunningAlert(4);
    }
}