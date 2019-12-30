var sections = [];

var heightToNavBar = 0;
var navBarElement = null;

var navBarTitles = [];
var sideMenuTitles = [];

var screenWidth = window.screen.width;
var screenHeight = window.screen.height;

$(document).ready(function () {
    getSectionsData();
    //    
    //    changeTheNavBarWithScreenSize();
    //
    //    navBarElement = document.getElementsByClassName("navbar")[0];
    //    heightToNavBar = navBarElement.offsetTop;

    readyFunction();
});

function readyFunction() {
    screenHeight = window.screen.width;
    screenHeight = window.screen.height;

    changeTheNavBarWithScreenSize();

    navBarElement = document.getElementsByClassName("navbar")[0];
    heightToNavBar = navBarElement.offsetTop;
}

//window.onclick = e => {
//
//}

window.onscroll = e => {
    stickTheNavBar();

    if (sideNavBarOpen) {
        toggleMenuClickEvent();
    }

}

window.onresize = function (event) {
    console.log("window resized");
    readyFunction();

};

function changeTheNavBarWithScreenSize() {
    addClickFunctionsToNavTitles();

    if (screenWidth > 1000) {
        theMenuToggleBtnDisplayStyle("none");
        navBarTitlesDisplyStyle("block");

    } else {
        theMenuToggleBtnDisplayStyle("block");
        navBarTitlesDisplyStyle("none");
    }

}

function navBarTitlesDisplyStyle(option) {
    var navBarTitles = document.getElementsByClassName("navbar-title");

    Array.from(navBarTitles).map(function (elem, index) {
        elem.style.display = option;
    });
}

function theMenuToggleBtnDisplayStyle(option) {
    document.getElementsByClassName("toggleNavIconHolder")[0].style.display = option;
}

var sideNavBarOpen = false;

function toggleMenuClickEvent() {
    console.log("menu icon clicked");

    if (sideNavBarOpen) {
        document.getElementsByClassName("sideNavBar")[0].classList.remove("sideNavBar-active");
        sideNavBarOpen = false;
    } else {
        var sideNavBar = document.getElementsByClassName("sideNavBar")[0];

        sideNavBar.classList.add("sideNavBar-active");

        sideNavBarOpen = true;
    }

}


function stickTheNavBar() {
    var scrollPosition = $(window).scrollTop(); //current scroll position


    if (heightToNavBar <= scrollPosition) {
        //nav bar should stick
        navBarElement.classList.add("navbar-fixed");
        showActiveTitlesOnNavBar(scrollPosition);
    } else {
        //navbar should release
        navBarElement.classList.remove("navbar-fixed");
    }


}

function showActiveTitlesOnNavBar(currentPosition) {
    var navBarHeight = navBarElement.clientHeight;
    var finallyPassedSectionIndex = 0;

    Array.from(sections).map(function (elem, i) {

        if (elem.offsetTop - navBarHeight < currentPosition) {
            //passed
            finallyPassedSectionIndex = i;
        }
    });


    Array.from(navBarTitles).map(function (elem, i) {
        if (i == finallyPassedSectionIndex) {
            elem.classList.add("navbar-title-active");
        } else {
            elem.classList.remove("navbar-title-active");
        }
    });
    
    Array.from(sideMenuTitles).map(function (elem, i) {
        if (i == finallyPassedSectionIndex) {
            elem.classList.add("sideNav-item-active");
        } else {
            elem.classList.remove("sideNav-item-active");
        }
    });
}

function getSectionsData() {

    sections = document.getElementsByClassName("section");

}

function addClickFunctionsToNavTitles() {
    navBarTitles = document.getElementsByClassName("navbar-title");

    var sideNavBar = document.getElementsByClassName("sideNavBar")[0];

    Array.from(navBarTitles).map(function (elem, index) {

        //create the side nav bar title
        var sideNavItem = '<div class="sideNav-item" id="sideNav-item-' + index + '" onclick="sideNavItemClickEvent(this.id)">' + elem.innerText + '</div>';

        sideNavBar.innerHTML += sideNavItem;
        //create the side nav bar titles

        //add id an event listner to top navigation menu
        elem.setAttribute("id", "nav-item-" + index);
        elem.addEventListener("click", navItemClickEvent);
        //add id an event listner to top navigation menu
    });
    
    sideMenuTitles = document.getElementsByClassName("sideNav-item");

}


function sideNavItemClickEvent(id) {
    var index = id.replace("sideNav-item-", "");
    console.log("side nav item clicked. " + index);
    displayToSection(index);
}

function navItemClickEvent(e) {
    var index = e.target.id.replace("nav-item-", "");
    displayToSection(index);
}

function displayToSection(sectionIndex) {
    $('html,body').animate({
        scrollTop: sections[sectionIndex].offsetTop
    }, 700).promise().done(function () {
        console.log("focus done : ");
    });
}
