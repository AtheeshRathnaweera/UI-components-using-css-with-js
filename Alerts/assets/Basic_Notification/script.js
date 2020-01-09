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