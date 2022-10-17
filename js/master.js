//Check If There Is Local Storage Color Option
let mainColor = localStorage.getItem("color_option");

if(mainColor !== null) {

    document.documentElement.style.setProperty("--main-color", mainColor);

     //Remove Active Class From Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        //Add Active Class On Element With Data-Color === LocaL Storage Item
        if(element.dataset.color === mainColor) {

            //Add Active Class
            element.classList.add("active");
        }
    });

};

//Random Background Option
let backgroundOption = true;

//Variable To Controll The backround Interval
let backgroundInterval;

//Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

//Check If Random Bckground Local Storage Is Not Empty
if (backgroundLocalItem !== null) {

    if(backgroundLocalItem === 'true') {

        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    //Remove Active Class From All Spans
    document.querySelectorAll(".random-background span").forEach(element => {

        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true') {

        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        document.querySelector(".random-background .no").classList.add("active");
    }
}

//Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    //Toggle Class Fa-Spin For Rotation on self
    this.classList.toggle("fa-spin");

    //Toogle CLass Open On Main Settings Box
    document.querySelector(".setting-box").classList.toggle("open");
};

//Switch Color
const colorsLi = document.querySelectorAll(".colors-list li");

//Loop On All List Item
colorsLi.forEach( li => {

    //Click On Every List Item
    li.addEventListener("click", (e) => {

        //Set Color On Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        //Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    });
});

//Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");

//Loop On All Spans
randomBackEl.forEach( span => {

    //Click On Every Span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if(e.target.dataset.background === 'yes') {

            backgroundOption = true;
            randomizeImds();
            localStorage.setItem("background_option", true);

        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});
//Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//Function To Randomize Imgs 
function randomizeImds() {

    if(backgroundOption === true) {

        backgroundInterval = setInterval(() => {
            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            //Change Backgroung Image Url
            landingPage.style.backgroundImage = 'url("img/' + imgsArray[randomNumber] + '")';
        
        },1000);
    }
}

randomizeImds()

//Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills Outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Window ScrollTop 
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
};

//Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        //Create Overlay Element
        let overlay = document.createElement("div");

        //Add Class To Overlay
        overlay.className = "popup-overlay";

        //Append Overlay To The Body
        document.body.appendChild(overlay);

        //Create The popup
        let popupBox = document.createElement("div");

        //Add Class To The Popup Box
        popupBox.className = "popup-box";

        if(img.alt !== null) {

            //Craete Heading
            let imgHeading = document.createElement("h3");

            //Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            //Append The Text To The Heading
            imgHeading.appendChild(imgText);

            //Append Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }

        //Craete The Image
        let popupImage = document.createElement("img");

        //Set Imge Soucre
        popupImage.src = img.src;

        //Add Image to Popup Box
        popupBox.appendChild(popupImage);

        //Append The Popup Box To Body
        document.body.appendChild(popupBox);

        //Create The Close Span
        let closeButton = document.createElement('span');

        //Craete The Close Button Text
        let closeButtonText = document.createTextNode("X");

        //Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = 'close-button';

        //Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    });
});

//Close Popuo
document.addEventListener("click", (e) => {

    if(e.target.className == 'close-button') {


        //Remove The Current Popup
        e.target.parentNode.remove();

        //Remove Overlay 
        document.querySelector(".popup-overlay").remove();
    }
});

//Select All Bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

//Select All Links
const allLinks = document.querySelectorAll('.links a');

function scroolToSomeWhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
            })
        })
    })
}

scroolToSomeWhere(allBullets);
scroolToSomeWhere(allLinks);

function handleActive(ev) {

    //Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    });

    //Add Active Class On Self
    ev.target.classList.add("active")
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");
    });

    if(bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if(span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", "block");
        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", "none");
        }

        handleActive(e);
    });
});

//Reset Button
document.querySelector(".reset-options").onclick = function () {

    //Remove All From Local Storage
    localStorage.clear();

    //Reome What You Want From Local Storage
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("background_option");
    // localStorage.removeItem("bullets_option");

    //Reload Window
    window.location.reload();
};

//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    //Stop Proagation 
    e.stopPropagation();
    //Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    //Toggle Class "Open" On Links
    tLinks.classList.toggle("open");
};

//Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        //Check If Menu Is Open
        if (tLinks.classList.contains("open")) {
            
            //Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            //Toggle Class "Open" On Links
            tLinks.classList.toggle("open");
        }
    }
});

//Stop Proagation On Menu
tLinks.onclick = function (e) {
    e.stopPropagation();
};