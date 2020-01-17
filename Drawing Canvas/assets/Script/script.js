var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");

var startedDrawing = false;
var canvasTopOffSet = 0;
var canvasLeftOffSet = 0;
var pickedColor = "#181726";
var boardColor = "#FFFFFF";

var strokeHistoryData = []; //store stroke history data
var currentStroke = null; //hold the currently drawing stroke data -->{boardColor: white,startX: ev.pageX - canvasLeftOffSet, startY: ev.pageY -canvasTopOffSet,strokeColor: pickedColor,cords: []}
var removedStrokeHistory = []; //use for undo and redo

var canvasCleaned = false;
var canBoardColorChange = true;

var printImage;
var colorChangeAccessCheckBox;
var croppingCanvasData;
var cropper = null;

$(document).ready(function () {

    printImage = document.getElementById('canvasimg');

    colorChangeAccessCheckBox = document.getElementById("boardColorAccess");
    colorChangeAccessCheckBox.checked = true;

    setCanvasDimensions();
    pickedColor = "#" + document.getElementById("penColor").value;
    boardColor = "#" + document.getElementById("boardColor").value;

    drawTheDrawingBoard(0, 0, myCanvas.width, myCanvas.height, boardColor);

});

window.onresize = function () {
    console.log("resized");

    setCanvasDimensions();

    if (!cleanCanvas) {
        drawTheDrawingBoard(0, 0, myCanvas.width, myCanvas.height, boardColor);
        printHistory();
    }

}


myCanvas.onmousedown = function (ev) {
    console.log("mouse down ");
    console.log("pos : " + ev.pageX + " " + ev.pageY);

    if (context == null) {
        context = myCanvas.getContext("2d");
    }

    startedDrawing = true;

    setContextToStartNewStroke(ev.pageX - canvasLeftOffSet, ev.pageY - canvasTopOffSet);

    var tempStroke = {
        startX: ev.pageX - canvasLeftOffSet,
        startY: ev.pageY - canvasTopOffSet,
        strokeColor: pickedColor,
        cords: []
    };

    currentStroke = tempStroke;
}

myCanvas.onmouseup = function (ev) {
    console.log("mouse up " + ev.pageX + " " + ev.pageY);
    startedDrawing = false;

    strokeHistoryData.push(currentStroke);
    currentStroke = null;
}

myCanvas.onmousemove = function (e) {
    console.log("mouse move " + e.pageX + " " + e.pageY);

    if (startedDrawing) {
        drawOnCanvas(e.pageX, e.pageY, pickedColor);
        currentStroke.cords.push({
            x: e.pageX,
            y: e.pageY
        });
    }

}

function printHistory() {

    for (var i = 0; i < strokeHistoryData.length; i++) {
        setContextToStartNewStroke(strokeHistoryData[i].startX, strokeHistoryData[i].startY);

        var strokeCords = strokeHistoryData[i].cords;
        var strokeColor = strokeHistoryData[i].strokeColor;

        for (var c = 0; c < strokeCords.length; c++) {
            drawOnCanvas(strokeCords[c].x, strokeCords[c].y, strokeColor);
        }
    }

}

function setContextToStartNewStroke(xCord, yCord) {
    context.beginPath();
    context.moveTo(xCord, yCord);
}

function setCanvasDimensions() {
    context.canvas.width = window.innerWidth - 75;
    context.canvas.height = window.innerHeight - 200;

    canvasTopOffSet = myCanvas.offsetTop;
    canvasLeftOffSet = myCanvas.offsetLeft;
}

function drawTheDrawingBoard(startX, startY, endX, endY, recBoardColor) {
    context.beginPath();
    context.fillStyle = recBoardColor;
    context.fillRect(startX, startY, endX, endY);

}

function drawOnCanvas(xCordinates, yCordniates, strokeColor) {

    context.lineTo(xCordinates - canvasLeftOffSet, yCordniates - canvasTopOffSet);
    context.strokeStyle = strokeColor;
    context.stroke();

}

//tool actions
function undoDrawing() {

    if (!canvasCleaned && strokeHistoryData.length > 0) {
        removedStrokeHistory.push(strokeHistoryData.pop());
        drawTheDrawingBoard(0, 0, myCanvas.width, myCanvas.height, boardColor);
        printHistory();
    }

}

function redoDrawing() {

    if (!canvasCleaned && removedStrokeHistory.length > 0) {
        strokeHistoryData.push(removedStrokeHistory.pop());
        drawTheDrawingBoard(0, 0, myCanvas.width, myCanvas.height, boardColor);
        printHistory();
    }

}

function cleanCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();

    canvasCleaned = true;

}

function restoreCanvas() {
    drawTheDrawingBoard(0, 0, myCanvas.width, myCanvas.height, boardColor);
    printHistory();
    canvasCleaned = false;

}

function printCanvas() {
    $("#canvasimg").attr("src", $("#myCanvas").get(0).toDataURL("img/jpg"));

    $("#printedResultsDisplayModal").modal();

    if (cropper != null) {
        //destroy exist cropper if exists
        cropper.destroy();
        cropper = null;
    }

    cropper = new Cropper(printImage, {
        aspectRatio: 1
    });

}
//tool actions

//picker actions
function changeColor(hexCode) {
    //change the drawing pen color
    pickedColor = "#" + hexCode;
    context.beginPath();
}

function boardColorAccessibleChange() {

    if (colorChangeAccessCheckBox.checked) {
        canBoardColorChange = true;
        changeBoardColor(boardColor);
        document.getElementById("boardColor").value = boardColor.replace("#","");
    } else {
        canBoardColorChange = false;
        document.getElementById("boardColor").value = "transparent";
        cleanCanvas();
        printHistory();
    }
}

function changeBoardColor(hexCode) {
    //change the board color
   
    boardColor = hexCode;

    if (canBoardColorChange) {
        //change the boards color if allowed
        drawTheDrawingBoard(0, 0, myCanvas.width, myCanvas.height, boardColor);
        printHistory();
    }


}
//picker actions

//download button in print modal ---> download the creeated image
function downloadPrintedResult() {

    var fileName = document.getElementById("imageName").value;

    if (fileName == "") {
        fileName = "fileName.jpg";
    }

    var url = getTheCroppedImageData().replace(/^data:image\/[^;]+/, 'data:application/octet-stream');

    var downloadLink = document.getElementById("imageDownloadLink");

    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
}

function getTheCroppedImageData() {
    if (cropper) {
        //get cropping canvas data if cropper exists
        croppingCanvasData = cropper.getCroppedCanvas({
            width: 260,
            height: 260,
        });
        return croppingCanvasData.toDataURL();
    }
}
//download button in print modal ---> download the creeated image
