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

function getRelevantDataObjectToIconAlert(iconAlertType) {

    for (var i = 0; i < iconAlerData.length; i++) {
        if (iconAlerData[i].type == iconAlertType) {
            return iconAlerData[i];
        }
    }

}

function createTheIconNode(iconClassArray) {
    var iconNode = document.createElement("I");

    for (var i = 0; i < iconClassArray.length; i++) {
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

    //create the child one node
    var childDivOneNode = document.createElement("DIV");
    childDivOneNode.classList.add("notification-icon-holder");
    childDivOneNode.style.backgroundColor = dataObject.iconBackgroundColor;
    childDivOneNode.appendChild(createTheIconNode(dataObject.iconClassArray)); //create the icon node and append to the child node one


    //create the child two node
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
