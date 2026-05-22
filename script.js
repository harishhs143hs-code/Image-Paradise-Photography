'use strict';

document.addEventListener('DOMContentLoaded',()=>{

/* LOADER */

const loader=document.getElementById('pageLoader');
const fillEl=document.getElementById('loaderFill');

if(loader&&fillEl){

let pct=0;

const loadTimer=setInterval(()=>{

pct=Math.min(pct+20,95);
fillEl.style.width=pct+'%';

},80);

window.addEventListener('load',()=>{

clearInterval(loadTimer);

fillEl.style.width='100%';

setTimeout(()=>{

loader.classList.add('out');
loader.style.display='none';

},500);

});

setTimeout(()=>{

loader.style.display='none';

},3000);

}

/* NAV */

const nav=document.getElementById('nav');
const ham=document.getElementById('hamburger');
const menu=document.getElementById('navMenu');
const btt=document.getElementById('btt');

window.addEventListener('scroll',()=>{

if(nav){
nav.classList.toggle('slim',window.scrollY>60);
}

if(btt){
btt.classList.toggle('show',window.scrollY>400);
}

});

if(ham&&menu){

ham.addEventListener('click',()=>{

menu.classList.toggle('open');

});

}

/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(a=>{

a.addEventListener('click',e=>{

const target=document.querySelector(
a.getAttribute('href')
);

if(!target)return;

e.preventDefault();

window.scrollTo({

top:
target.offsetTop-80,

behavior:'smooth'

});

});

});

/* CONTACT */

const eForm=
document.getElementById('eForm');

const fsub=
document.getElementById('fsub');

function validate(){

const email=
document.getElementById('f_email');

const msg=
document.getElementById('f_msg');

if(!email?.value)return false;

if(!msg?.value||
msg.value.length<20)
return false;

return true;

}

if(eForm){

eForm.addEventListener(
'submit',
(e)=>{

if(!validate()){

e.preventDefault();

alert(
'Fill all fields'
);

return;

}

if(fsub){

fsub.disabled=true;

fsub.textContent=
'Sending...';

}

}

);

}

});
