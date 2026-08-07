
// ==========================
// LANGUAGE SYSTEM
// ==========================


const langBtn =
document.getElementById("lang-btn");


let language =
localStorage.getItem("language") || "en";



function updateLanguage(){


document.querySelectorAll("[data-en]")
.forEach(element=>{


if(language==="fa"){


element.innerHTML =
element.dataset.fa;


}else{


element.innerHTML =
element.dataset.en;


}


});



if(langBtn){


langBtn.querySelector("span").innerHTML =

language==="fa"

? "FA"

: "EN";


}


}





if(langBtn){


langBtn.onclick=()=>{


language =

language==="en"

? "fa"

: "en";



localStorage.setItem(

"language",

language

);



updateLanguage();


};


}



updateLanguage();






// ==========================
// THEME SYSTEM
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



let light =

document.body.classList.contains("light");



localStorage.setItem(

"theme",

light ? "light" : "dark"

);



themeBtn.innerHTML =

light

?

'<i class="fa-solid fa-sun"></i>'

:

'<i class="fa-solid fa-moon"></i>';



};

// ==========================
// MOBILE MENU
// ==========================


const menuBtn =

document.getElementById("menu-btn");


const nav =

document.getElementById("nav");



if(menuBtn){


menuBtn.onclick=()=>{


nav.classList.toggle("active");


};


}




document.querySelectorAll("nav a")
.forEach(link=>{


link.onclick=()=>{


nav.classList.remove("active");


};


});






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

e.clientX - box.left;



let y =

e.clientY - box.top;



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



if(hero){



document.addEventListener(
"mousemove",

(e)=>{


let x =

(window.innerWidth/2-e.clientX)/80;



let y =

(window.innerHeight/2-e.clientY)/80;



hero.style.transform =

`
translate(${x}px,${y}px)

`;



});


}








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

}

);





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


document.querySelectorAll(".counter")
.forEach(counter=>{


let target =

Number(counter.innerText);



let number = 0;



let speed =

target/100;




let timer =

setInterval(()=>{


number += speed;



if(number>=target){


number=target;


clearInterval(timer);


}



counter.innerText =

Math.floor(number)

.toLocaleString();



},30);



});
// ==========================
// GAME + TEAM SLIDER
// ==========================


function createSlider(selector){


const slider=document.querySelector(selector);

if(!slider) return;


const track=slider.querySelector("div");


let position=0;

let speed=0.4;


let dragging=false;

let startX=0;

let startPosition=0;



function move(){


if(!dragging){


position -= speed;


if(Math.abs(position) >= track.scrollWidth / 2){


position=0;


}


track.style.transform =
`translateX(${position}px)`;


}


requestAnimationFrame(move);


}



move();





// MOUSE

slider.addEventListener("mousedown",(e)=>{

    e.preventDefault();

    dragging=true;

    startX=e.pageX;

    startPosition=position;

});



window.addEventListener("mouseup",()=>{


dragging=false;


});





slider.addEventListener("mousemove",(e)=>{


if(!dragging)return;


let distance =
e.pageX-startX;


position =
startPosition+distance;


track.style.transform =
`translateX(${position}px)`;


});






// TOUCH


slider.addEventListener("touchstart",(e)=>{


dragging=true;


startX=e.touches[0].pageX;


startPosition=position;


});





slider.addEventListener("touchmove",(e)=>{


if(!dragging)return;


let distance =
e.touches[0].pageX-startX;


position =
startPosition+distance;


track.style.transform =
`translateX(${position}px)`;


});





slider.addEventListener("touchend",()=>{


dragging=false;


});



}



createSlider(".game-slider");

createSlider(".team-slider");