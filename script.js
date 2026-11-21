/* ===== EDIT THESE ===== */
var GROOM = "Sulaiman Ahmed";
var BRIDE = "Hiba Parveen";

/* NIKKAH_START — APPROXIMATE time (about 4:00 PM IST, around Asr in Kerala in early January).
   Change it once the exact time is confirmed, e.g. "2027-01-02T16:45:00+05:30".
   If emptied: countdown shows days only and "Add to Calendar" is disabled. */
var NIKKAH_START = "2027-01-02T16:00:00+05:30";   /* approximate */
var NIKKAH_DURATION_MIN = 120;   /* calendar event length once time is set */

/* Google Maps link for Kolavayal Juma Masjid (not supplied yet).
   Paste the share link here to enable the "View Location" button. */
var MAP_URL = "";               /* TODO: add Google Maps link */
/* ====================== */
(function(){
  var NIKKAH_DATE = "2027-01-02";
  var names = "Sulaiman & Hiba";
  var env = document.getElementById("env");
  var music = document.getElementById("bgMusic"), mt = document.getElementById("mtoggle");

  /* envelope: lock scroll until opened; music starts only on this tap */
  function lock(on){document.documentElement.style.overflow=on?"hidden":"";document.body.style.overflow=on?"hidden":""}
  lock(true);
  var opened=false;
  function openEnv(){
    if(opened)return; opened=true;
    env.classList.add("open"); env.setAttribute("aria-hidden","true");
    lock(false);
    document.body.classList.add("shown");
    if(music){
      music.volume=0.8;
      var p=music.play();
      var ok=function(){if(mt){mt.hidden=false;mt.classList.remove("off");mt.setAttribute("aria-label","Pause music")}};
      var no=function(){if(mt){mt.hidden=false;mt.classList.add("off");mt.setAttribute("aria-label","Play music")}};
      if(p&&p.then)p.then(ok).catch(no);else ok();
    }
    setTimeout(function(){env.style.display="none"},1300);
  }
  if(mt)mt.addEventListener("click",function(){
    if(music.paused){music.play().then(function(){mt.classList.remove("off");mt.setAttribute("aria-label","Pause music")}).catch(function(){})}
    else{music.pause();mt.classList.add("off");mt.setAttribute("aria-label","Play music")}
  });
  var sd=document.getElementById("scrolldn");
  if(sd)sd.addEventListener("click",function(){document.getElementById("story").scrollIntoView({behavior:"smooth",block:"start"})});
  env.addEventListener("click",openEnv);
  env.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openEnv()}});

  /* countdown */
  var cd=document.querySelectorAll("#cd b"), cdnote=document.getElementById("cdnote");
  var hasTime=!!NIKKAH_START && !isNaN(new Date(NIKKAH_START));
  function pad(x){return String(x).padStart(2,"0")}
  function tick(){
    var v;
    if(hasTime){
      var d=new Date(NIKKAH_START)-new Date(); if(d<0)d=0;
      v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60].map(pad);
    }else{
      /* date-only fallback: whole days to 2 Jan 2027 (IST); no time of day is assumed */
      var t=Date.parse(NIKKAH_DATE+"T00:00:00+05:30"), n=Date.now();
      var days=Math.max(0,Math.ceil((t-n)/864e5));
      v=[pad(days),"--","--","--"]; if(cdnote){cdnote.textContent="Live countdown begins once the Nikkah time is confirmed.";cdnote.hidden=false}
    }
    v.forEach(function(x,i){if(cd[i].textContent!==x){cd[i].textContent=x;if(hasTime&&i===3){cd[i].classList.remove("pop");void cd[i].offsetWidth;cd[i].classList.add("pop")}}});
  }
  tick(); setInterval(tick,1000);

  /* scroll-reveal */
  var els=document.querySelectorAll(".fade,.slide-l,.slide-r");
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});
    els.forEach(function(e){io.observe(e)});
  }else els.forEach(function(e){e.classList.add("in")});

  /* January 2027 calendar: 1 Jan 2027 is a Friday; highlight Sat 2 Jan */
  (function(){
    var g=document.getElementById("calg"),H="";
    ["Su","Mo","Tu","We","Th","Fr","Sa"].forEach(function(d){H+='<div class="h">'+d+'</div>'});
    var first=new Date(2027,0,1).getDay(),n=31;
    for(var i=0;i<first;i++)H+='<div></div>';
    for(var d=1;d<=n;d++)H+='<div><div class="x'+(d===2?' on':'')+'"'+(d===2?' aria-label="Saturday, 2 January 2027"':'')+'>'+d+'</div></div>';
    g.innerHTML=H;

    var a=document.getElementById("addcal"),note=document.getElementById("calnote");
    if(hasTime){
      var s=new Date(NIKKAH_START),e=new Date(s.getTime()+NIKKAH_DURATION_MIN*6e4);
      var f=function(x){return x.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")};
      a.href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Nikkah – "+names+" (after Asr)")+"&dates="+f(s)+"/"+f(e)+"&details="+encodeURIComponent("After Asr Prayer (approximate time). Reception to follow after Nikkah.")+"&location="+encodeURIComponent("Kolavayal Juma Masjid");
      a.removeAttribute("aria-disabled"); if(note)note.hidden=true;
      if(cdnote)cdnote.hidden=false;
    }
  })();

  /* venue map button */
  (function(){
    var b=document.getElementById("viewloc"),n=document.getElementById("locnote");
    if(MAP_URL){b.href=MAP_URL;b.removeAttribute("aria-disabled");if(n)n.hidden=true}
  })();

  /* wishes (section is commented out in index.html; this only runs if re-enabled) */
  if(document.getElementById("wsend")){
  /* shared storage if the host provides it, otherwise this device only */
  var wl=document.getElementById("wl"), wnote=document.getElementById("wnote"), werr=document.getElementById("werr");
  var db=null, LK="wishes_local_sulaiman_hiba";
  function show(items){wl.innerHTML="";items.forEach(function(w){var d=document.createElement("div");d.className="wish";var b=document.createElement("b");b.textContent=w.name;var p=document.createElement("p");p.textContent=w.msg;d.appendChild(b);d.appendChild(p);wl.appendChild(d)})}
  function local(){try{return JSON.parse(localStorage.getItem(LK)||"[]")}catch(e){return[]}}
  function fallback(){db=null;wnote.hidden=false;show(local())}
  if(typeof claude!=="undefined"&&claude.use){
    claude.use("db").then(function(x){
      if(!x){fallback();return}
      db=x;
      db.collection("wishes").orderBy("t","desc").limit(100).onSnapshot(function(sn){show(sn.docs.map(function(d){return d.data()}))},function(){});
    }).catch(fallback);
  }else fallback();

  document.getElementById("wsend").addEventListener("click",function(){
    var n=document.getElementById("wn"),m=document.getElementById("wm");
    var name=n.value.trim().slice(0,60),msg=m.value.trim().slice(0,400);
    werr.textContent="";
    if(name.length<2){werr.textContent="Please enter your name.";n.focus();return}
    if(msg.length<2){werr.textContent="Please write your wishes.";m.focus();return}
    var w={name:name,msg:msg,t:Date.now()};
    if(db){db.collection("wishes").add(w).catch(function(){werr.textContent="Could not send right now. Please try again."})}
    else{var a=local();a.unshift(w);try{localStorage.setItem(LK,JSON.stringify(a.slice(0,100)))}catch(e){}show(a)}
    n.value="";m.value="";
  });
  }
})();
