
//usage of basic notifications
//function ---> notification(type,message,position,background-color,text-color)
document.getElementById("bottomRightLaunch").onclick = function () {
    notification("basic","Bottom left notification demo.", "bottom-right", "darkblue", "white");
}

document.getElementById("centerRightLaunch").onclick = function () {
    notification("basic","Center right notification demo.","center-right", "darkblue", "white");
}

document.getElementById("topRightLaunch").onclick = function () {
    notification("basic","Top right notification demo.","top-right", "darkgreen", "white");
}

//usage of notification with icons
//function ---> notificationWithIcon(type,message,background-color,text-color,position)
document.getElementById("defaultNotiIconLaunch").onclick = function(){
    notification("icon-default","This is a test notification.","bottom-right");
};

document.getElementById("successNotiIconLaunch").onclick = function(){
    notification("icon-success","Saved successfully.", "bottom-right");
};

document.getElementById("failNotiIconLaunch").onclick = function(){
    notification("icon-fail","Save failed.","bottom-right");
};

document.getElementById("dangerNotiIconLaunch").onclick = function(){
    notification("icon-danger","Save is interrupted.","bottom-right");
};

