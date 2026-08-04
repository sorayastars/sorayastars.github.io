
// ==========================
// LANGUAGE SYSTEM
// ==========================

const langBtn = document.getElementById("lang-btn");

let language = localStorage.getItem("language") || "en";


function updateLanguage(){


    document.querySelectorAll("[data-en]")
    .forEach(element=>{


        if(language === "fa"){


            element.innerHTML = element.dataset.fa;


        }else{


            element.innerHTML = element.dataset.en;


        }


    });



    if(language==="fa"){

        langBtn.querySelector("span").innerHTML="FA";

    }else{

        langBtn.querySelector("span").innerHTML="EN";

    }


}



langBtn.onclick = ()=>{


    language = language==="en" ? "fa" : "en";


    localStorage.setItem(
        "language",
        language
    );


    updateLanguage();


};



updateLanguage();








// ==========================
// DARK / LIGHT MODE
// ==========================


const themeBtn =
document.getElementById("theme-btn");


let theme =
localStorage.getItem("theme") || "dark";



if(theme==="light"){

    document.body.classList.add("light");

    themeBtn.innerHTML =
    '<i class="fa-solid fa-sun"></i>';

}



themeBtn.onclick=()=>{


    document.body.classList.toggle("light");



    if(document.body.classList.contains("light")){


        localStorage.setItem(
            "theme",
            "light"
        );


        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';



    }else{


        localStorage.setItem(
            "theme",
            "dark"
        );


        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }


};








// ==========================
// 3D CARD EFFECT
// ==========================


function cardEffect(selector){


document.querySelectorAll(selector)
.forEach(card=>{


card.addEventListener(
"mousemove",
(e)=>{


let box =
card.getBoundingClientRect();


let x =
e.clientX-box.left;


let y =
e.clientY-box.top;



let rotateY =
(x-box.width/2)/20;



let rotateX =
-(y-box.height/2)/20;



card.style.transform =

`
perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.05)
`;



});





card.addEventListener(
"mouseleave",
()=>{


card.style.transform="";


});



});


}



cardEffect(".game-card");

cardEffect(".team-card");








// ==========================
// HERO MOVEMENT
// ==========================


const hero =
document.querySelector(".hero-content");



document.addEventListener(
"mousemove",
(e)=>{


let x =
(window.innerWidth/2-e.clientX)/80;


let y =
(window.innerHeight/2-e.clientY)/80;



hero.style.transform =
`translate(${x}px,${y}px)`;


});








// ==========================
// SCROLL ANIMATION
// ==========================


const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";


entry.target.style.transform=
"translateY(0)";


}


});


},
{
threshold:.15
});





document.querySelectorAll(
".section,.game-card,.team-card,.achievement,.about-box"
)
.forEach(item=>{


item.style.opacity="0";


item.style.transform=
"translateY(60px)";


item.style.transition=
"1s ease";


observer.observe(item);


});








// ==========================
// COUNTERS
// ==========================


const counters =
document.querySelectorAll(".counter");



counters.forEach(counter=>{


let target =
Number(counter.innerText);


let number=0;


let speed =
target/100;



let timer =
setInterval(()=>{


number+=speed;



if(number>=target){


number=target;


clearInterval(timer);


}



counter.innerText =
Math.floor(number).toLocaleString();



},30);



});








// ==========================
// EXPLORE BUTTON
// ==========================


const explore =
document.querySelector(".main-btn");



explore.onclick=()=>{


document
.querySelector("#games")
.scrollIntoView({

behavior:"smooth"

});


};








// ==========================
// MOBILE MENU
// ==========================


const menu =
document.querySelector(".menu-btn");


const nav =
document.querySelector("nav");



menu.onclick=()=>{


nav.classList.toggle("active");


};




// CLOSE MENU AFTER CLICK

document.querySelectorAll("nav a")
.forEach(link=>{


link.onclick=()=>{


nav.classList.remove("active");


};


});




// ==========================
// GAME SLIDER DRAG WITH MOUSE
// ==========================


const slider =
document.querySelector(".game-slider");


let isDown = false;

let startX;

let scrollLeft;



slider.addEventListener("mousedown",(e)=>{

    isDown = true;

    slider.classList.add("active");

    startX = e.pageX - slider.offsetLeft;

    scrollLeft = slider.scrollLeft;

});



slider.addEventListener("mouseleave",()=>{

    isDown=false;

});



slider.addEventListener("mouseup",()=>{

    isDown=false;

});



slider.addEventListener("mousemove",(e)=>{

    if(!isDown) return;


    e.preventDefault();


    const x = e.pageX - slider.offsetLeft;


    const walk = (x - startX) * 2;


    slider.scrollLeft = scrollLeft - walk;

});