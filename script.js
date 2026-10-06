const video=document.getElementById("bgVideo");
video.play().catch(()=>{});

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

// Subtle cinematic zoom on the background as the visitor scrolls.
window.addEventListener("scroll",()=>{
  const y=Math.min(scrollY,1200);
  video.style.transform=`scale(${1.02+y/12000})`;
});

// Reveal cards as they enter the screen.
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("show");
      io.unobserve(e.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".glass,.section-title,.process-line").forEach((el,i)=>{
  el.style.opacity="0";
  el.style.transform="translateY(25px)";
  el.style.transition=`opacity .8s ease ${Math.min(i*.04,.35)}s,transform .8s ease ${Math.min(i*.04,.35)}s`;
  io.observe(el);
});

const s=document.createElement("style");
s.textContent=".show{opacity:1!important;transform:none!important}";
document.head.appendChild(s);

// Pause the video when the tab is hidden.
document.addEventListener("visibilitychange",()=>{
  if(document.hidden) video.pause();
  else video.play().catch(()=>{});
});
