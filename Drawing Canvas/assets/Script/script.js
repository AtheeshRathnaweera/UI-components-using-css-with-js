var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");

var startedDrawing = false;
var canvasTopOffSet = 0;
var canvasLeftOffSet = 0;
var pickedColor = "#181726";

$(document).ready(function () {

    setCanvasDimensions();
    pickedColor = "#"+document.getElementsByClassName("jscolor")[0].value;

    console.log("ready started. " + canvasTopOffSet + " " + canvasLeftOffSet+" "+pickedColor);
});

window.onresize = function () {
    console.log("resized");
    setCanvasDimensions();
}


myCanvas.onmousedown = function (ev) {
    console.log("mouse down ");
    console.log("pos : " + ev.pageX + " " + ev.pageY);

    if (context == null) {
        context = myCanvas.getContext("2d");
    }

    startedDrawing = true;
    context.moveTo(ev.pageX - canvasLeftOffSet, ev.pageY - canvasTopOffSet);
}

myCanvas.onmouseup = function (ev) {
    console.log("mouse up " + ev.pageX + " " + ev.pageY);
    startedDrawing = false;
    //ctx.closePath();
}

myCanvas.onmousemove = function (e) {
    console.log("mouse move " + e.pageX + " " + e.pageY);
    drawOnCanvas(e.pageX, e.pageY);
}

function setCanvasDimensions() {
    context.canvas.width = window.innerWidth - 75;
    context.canvas.height = window.innerHeight - 200;

    canvasTopOffSet = myCanvas.offsetTop;
    canvasLeftOffSet = myCanvas.offsetLeft;
}

function drawOnCanvas(xCordinates, yCordniates) {

    if (startedDrawing) {
        context.lineTo(xCordinates - canvasLeftOffSet, yCordniates - canvasTopOffSet);
        context.strokeStyle = pickedColor;
        context.stroke();
    }

}

function cleanCanvas() {
    context.save();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();

}

function restoreCanvas() {
    context.restore();
}

function changeColor(hexCode) {
    console.log("this is the picked color: " + hexCode);
    pickedColor = "#" + hexCode;
    context.beginPath();
}

function printCanvas() {
    $("#canvasimg").attr("src", $("#myCanvas").get(0).toDataURL("img/jpg"));

    $("#printedResultsDisplayModal").modal();


}

function downloadPrintedResult() {
    var fileName = document.getElementById("imageName").value;

    if (fileName == "") {
        fileName = "fileName.jpg";
    }

    var url = document.getElementById("canvasimg").src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    
    var downloadLink = document.getElementById("imageDownloadLink");
    
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
}
