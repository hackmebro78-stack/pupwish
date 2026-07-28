/*=========================================
 Ultimate Birthday Website
 Premium JavaScript
==========================================*/

"use strict";

/*=========================================
DOM
==========================================*/

const form = document.getElementById("birthdayForm");

const giftBox = document.getElementById("giftBox");

const surpriseSection = document.getElementById("surpriseSection");

const birthdayCard = document.getElementById("birthdayCard");

const loader = document.getElementById("loader");

const audioPlayer = document.getElementById("audioPlayer");

const profileImage = document.getElementById("profileImage");

const countdown = document.getElementById("countdown");

const wishTitle = document.getElementById("wishTitle");

const displayName = document.getElementById("displayName");

const displayAge = document.getElementById("displayAge");

const displayWish = document.getElementById("displayWish");

/*=========================================
Loading Screen
==========================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

loader.style.pointerEvents="none";

setTimeout(()=>{

loader.remove();

},1000);

},2500);

});

/*=========================================
Variables
==========================================*/

let birthdayData={};

let fireworksRunning=false;

/*=========================================
Wish Templates
==========================================*/

const wishes=[

"May your birthday be filled with love, happiness, laughter and unforgettable memories. 🎉",

"Wishing you endless joy, good health and success in every step of your life. ❤️",

"Hope every dream you have comes true this year. Happy Birthday! 🎂",

"Another year older, wiser and more amazing. Enjoy your special day! 🎁",

"You deserve all the happiness in the world today and always. 🎈"

];

/*=========================================
Generate Random Wish
==========================================*/

function randomWish(){

return wishes[
Math.floor(Math.random()*wishes.length)
];

}

/*=========================================
Birthday Form
==========================================*/

form.addEventListener("submit",function(e){

e.preventDefault();

birthdayData.name=
document.getElementById("personName").value;

birthdayData.nickname=
document.getElementById("nickname").value;

birthdayData.age=
document.getElementById("age").value;

birthdayData.date=
document.getElementById("birthdayDate").value;

birthdayData.sender=
document.getElementById("sender").value;

birthdayData.message=
document.getElementById("customWish").value;

birthdayData.theme=
document.getElementById("theme").value;

birthdayData.color=
document.getElementById("favColor").value;

birthdayData.gender=
document.getElementById("gender").value;

/* Photo */

const photo=
document.getElementById("photo").files[0];

if(photo){

const reader=new FileReader();

reader.onload=function(){

profileImage.src=reader.result;

}

reader.readAsDataURL(photo);

}

/* Music */

const music=
document.getElementById("music").files[0];

if(music){

audioPlayer.src=
URL.createObjectURL(music);

}

/* Default Wish */

if(birthdayData.message.trim()===""){

birthdayData.message=randomWish();

}

/* Next */

surpriseSection.classList.remove("hidden");

window.scrollTo({

top:surpriseSection.offsetTop,

behavior:"smooth"

});

});

/*=========================================
Gift Open
==========================================*/

giftBox.addEventListener("click",()=>{

giftBox.classList.add("gift-open");

setTimeout(()=>{

surpriseSection.classList.add("hidden");

birthdayCard.classList.remove("hidden");

showCard();

startFireworks();

createConfetti();

createBalloons();

},1200);

});

/*=========================================
Show Card
==========================================*/

function showCard(){

wishTitle.innerHTML="🎉 Happy Birthday 🎉";

displayName.innerHTML=

birthdayData.name;

displayAge.innerHTML=

birthdayData.age+" Years";

displayWish.innerHTML=

birthdayData.message+

"<br><br><b>From ❤️ "

+

birthdayData.sender+

"</b>";

document.body.style.setProperty(

"--primary",

birthdayData.color

);

}

/*=========================================
Countdown
==========================================*/

function startCountdown(){

if(!birthdayData.date)return;

setInterval(()=>{

const now=new Date().getTime();

const target=new Date(

birthdayData.date

).getTime();

const diff=target-now;

if(diff<0){

countdown.innerHTML=

"🎉 Today is the Birthday!";

return;

}

const d=

Math.floor(diff/86400000);

const h=

Math.floor((diff%86400000)/3600000);

const m=

Math.floor((diff%3600000)/60000);

const s=

Math.floor((diff%60000)/1000);

countdown.innerHTML=

`${d}d ${h}h ${m}m ${s}s`;

},1000);

}

startCountdown();

/*=========================================
Music Auto Play
==========================================*/

audioPlayer.volume=.5;

giftBox.addEventListener("click",()=>{

if(audioPlayer.src!=""){

audioPlayer.play();

}

});

/*=========================================
Dark Mode
==========================================*/

function toggleDark(){

document.body.classList.toggle("dark");

}

/*=========================================
Random Balloon Generator
==========================================*/

function createBalloons(){

const container=

document.getElementById("balloons");

container.innerHTML="";

for(let i=0;i<25;i++){

const b=document.createElement("div");

b.className="balloon";

b.style.left=Math.random()*100+"%";

b.style.background=

`hsl(${Math.random()*360},80%,60%)`;

b.style.animationDuration=

8+Math.random()*8+"s";

b.style.animationDelay=

Math.random()*5+"s";

container.appendChild(b);

}

}

/*=========================================
Random Hearts
==========================================*/

function createHearts(){

const container=

document.getElementById("hearts");

setInterval(()=>{

const h=document.createElement("div");

h.className="heart";

h.innerHTML="❤️";

h.style.left=

Math.random()*100+"%";

h.style.fontSize=

20+Math.random()*30+"px";

h.style.animationDuration=

5+Math.random()*6+"s";

container.appendChild(h);

setTimeout(()=>{

h.remove();

},12000);

},300);

}

createHearts();
/*=========================================================
        FIREWORKS ENGINE
=========================================================*/

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.left = "0";
canvas.style.top = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "999";

const ctx = canvas.getContext("2d");

function resizeCanvas(){

canvas.width = innerWidth;
canvas.height = innerHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

let particles = [];

class Particle{

constructor(x,y,color){

this.x=x;
this.y=y;

this.color=color;

this.size=Math.random()*4+2;

this.speedX=(Math.random()-0.5)*12;

this.speedY=(Math.random()-0.5)*12;

this.life=100;

}

update(){

this.x+=this.speedX;

this.y+=this.speedY;

this.speedY+=0.08;

this.life--;

}

draw(){

ctx.globalAlpha=this.life/100;

ctx.fillStyle=this.color;

ctx.beginPath();

ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

ctx.fill();

}

}

function createFirework(){

const x=Math.random()*canvas.width;

const y=Math.random()*canvas.height*0.5;

const colors=[

"#ff0080",
"#ffd700",
"#00e5ff",
"#00ff90",
"#ffffff",
"#ff5722"

];

for(let i=0;i<120;i++){

particles.push(

new Particle(

x,
y,
colors[Math.floor(Math.random()*colors.length)]

)

);

}

}

function animateFireworks(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=particles.length-1;i>=0;i--){

particles[i].update();

particles[i].draw();

if(particles[i].life<=0){

particles.splice(i,1);

}

}

requestAnimationFrame(animateFireworks);

}

animateFireworks();

function startFireworks(){

if(fireworksRunning) return;

fireworksRunning=true;

setInterval(()=>{

createFirework();

},700);

}

/*=========================================================
        CONFETTI
=========================================================*/

function createConfetti(){

for(let i=0;i<300;i++){

const c=document.createElement("div");

c.className="confetti";

c.style.left=Math.random()*100+"vw";

c.style.top="-20px";

c.style.background=

`hsl(${Math.random()*360},100%,60%)`;

c.style.width=

6+Math.random()*12+"px";

c.style.height=

6+Math.random()*18+"px";

c.style.animationDuration=

3+Math.random()*4+"s";

document.body.appendChild(c);

setTimeout(()=>{

c.remove();

},7000);

}

}

/*=========================================================
        MAGIC STARS
=========================================================*/

function createStars(){

const stars=document.getElementById("stars");

for(let i=0;i<200;i++){

const s=document.createElement("div");

s.className="star";

s.style.left=Math.random()*100+"vw";

s.style.top=Math.random()*100+"vh";

s.style.animationDelay=Math.random()*3+"s";

stars.appendChild(s);

}

}

createStars();

/*=========================================================
        PARTICLES BACKGROUND
=========================================================*/

function particleBackground(){

const bg=document.getElementById("particles");

for(let i=0;i<80;i++){

const p=document.createElement("div");

p.className="sparkle";

p.style.left=Math.random()*100+"vw";

p.style.top=Math.random()*100+"vh";

p.style.animationDelay=Math.random()*5+"s";

bg.appendChild(p);

}

}

particleBackground();

/*=========================================================
        TYPEWRITER EFFECT
=========================================================*/

function typeWriter(element,text,speed=40){

element.innerHTML="";

let i=0;

const timer=setInterval(()=>{

element.innerHTML+=text.charAt(i);

i++;

if(i>=text.length){

clearInterval(timer);

}

},speed);

}

/*=========================================================
        SHARE
=========================================================*/

const shareBtn=document.getElementById("share");

if(shareBtn){

shareBtn.onclick=()=>{

const txt=

`🎉 Happy Birthday ${birthdayData.name}! 🎂`;

if(navigator.share){

navigator.share({

title:"Birthday",

text:txt,

url:location.href

});

}else{

navigator.clipboard.writeText(location.href);

alert("Link Copied");

}

};

}

/*=========================================================
        DOWNLOAD CARD
=========================================================*/

const downloadBtn=document.getElementById("download");

if(downloadBtn){

downloadBtn.onclick=()=>{

html2canvas(document.querySelector(".card"))

.then(canvas=>{

const a=document.createElement("a");

a.download="BirthdayCard.png";

a.href=canvas.toDataURL();

a.click();

});

};

}

/*=========================================================
        THEME SWITCHER
=========================================================*/

function applyTheme(theme){

switch(theme){

case "royal":

document.body.style.background=

"linear-gradient(135deg,#180428,#4b0082,#ff0080)";

break;

case "galaxy":

document.body.style.background=

"linear-gradient(135deg,#000428,#004e92,#1e3c72)";

break;

case "neon":

document.body.style.background=

"linear-gradient(135deg,#00f260,#0575e6,#8e2de2)";

break;

case "rose":

document.body.style.background=

"linear-gradient(135deg,#ff758c,#ff7eb3,#ffc3a0)";

break;

case "cute":

document.body.style.background=

"linear-gradient(135deg,#fbc2eb,#a6c1ee)";

break;

case "anime":

document.body.style.background=

"linear-gradient(135deg,#fc466b,#3f5efb)";

break;

}

}

/*=========================================================
        APPLY THEME AFTER FORM
=========================================================*/

form.addEventListener("submit",()=>{

applyTheme(birthdayData.theme);

});

/*=========================================================
        BALLOON POP
=========================================================*/

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("balloon")){

e.target.style.transform="scale(0)";

e.target.style.opacity="0";

createFirework();

setTimeout(()=>{

e.target.remove();

},300);

}

});

/*=========================================================
        RANDOM EMOJI RAIN
=========================================================*/

const emojis=[
"🎂","🎉","🎁","❤️","✨","🎈","🥳","🍰"
];

setInterval(()=>{

const em=document.createElement("div");

em.innerHTML=

emojis[Math.floor(Math.random()*emojis.length)];

em.style.position="fixed";

em.style.left=Math.random()*100+"vw";

em.style.top="-40px";

em.style.fontSize=

25+Math.random()*30+"px";

em.style.pointerEvents="none";

em.style.animation=

"heartRain 6s linear forwards";

document.body.appendChild(em);

setTimeout(()=>{

em.remove();

},6000);

},500);

/*=========================================================
        END PART 2
=========================================================*/
```

**Note:** This section uses `html2canvas()` for the download feature, so add this before your `script.js` in `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="script.js"></script>
```

