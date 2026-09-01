const loader=document.querySelector('.loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),1450));

const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring'), label=document.querySelector('.cursor-label');
let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y,tx=x,ty=y;
addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY});
(function cursor(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;tx+=(x-tx)*.45;ty+=(y-ty)*.45;dot.style.left=tx+'px';dot.style.top=ty+'px';ring.style.left=rx+'px';ring.style.top=ry+'px';label.style.left=rx+'px';label.style.top=ry+'px';requestAnimationFrame(cursor)})();

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mouseenter',()=>{document.body.classList.add('cursor-active');label.textContent=el.dataset.cursor||'OPEN'});
  el.addEventListener('mouseleave',()=>{document.body.classList.remove('cursor-active');el.style.transform=''});
  el.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=el.getBoundingClientRect();const mx=(e.clientX-r.left-r.width/2)*.12,my=(e.clientY-r.top-r.height/2)*.12;el.style.transform=`translate(${mx}px,${my}px)`});
});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal,.reveal-up').forEach(e=>revealObserver.observe(e));

const progress=document.querySelector('.scroll-line i');
function scrollProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.height=(max?scrollY/max*100:0)+'%'}
addEventListener('scroll',scrollProgress,{passive:true});scrollProgress();

const navLinks=[...document.querySelectorAll('.nav nav a')], sections=[...document.querySelectorAll('section[id]')];
function activeNav(){let current='home';sections.forEach(s=>{if(scrollY>=s.offsetTop-260)current=s.id});navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))}
addEventListener('scroll',activeNav,{passive:true});activeNav();

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(!t)return;e.preventDefault();t.scrollIntoView({behavior:'smooth'})}));

if(innerWidth>900){document.querySelectorAll('.tech,.project-card,.terminal').forEach(card=>card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}))}
