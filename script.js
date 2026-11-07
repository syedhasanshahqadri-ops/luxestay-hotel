document.addEventListener("DOMContentLoaded",()=>{
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const money=n=>"PKR "+Number(n).toLocaleString("en-US");
const PAYS={easypaisa:"Easypaisa",jazzcash:"JazzCash",cash:"Cash at the hotel"},NUM={easypaisa:"0332-3556402",jazzcash:"0315-9262470"},WA="923009260391";
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
let db=null;
if(window.FIREBASE_CONFIG&&window.firebase){firebase.initializeApp(FIREBASE_CONFIG);db=firebase.firestore()}
let tt;const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2200)};

/* theme, navbar, menu */
$("#themeBtn").onclick=()=>{const n=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=n;store.set("lx_theme",n)};
const nav=$("#navbar"),onScroll=()=>nav.classList.toggle("scrolled",scrollY>40);addEventListener("scroll",onScroll,{passive:true});onScroll();
$("#menuBtn").onclick=()=>$("#navLinks").classList.toggle("open");
$$(".nav-links a").forEach(a=>a.onclick=()=>$("#navLinks").classList.remove("open"));

/* hero slider */
const slides=$$(".hero-slide"),dots=$("#dots");let cur=0,timer;
slides.forEach((_,i)=>{const d=document.createElement("span");d.className="dot"+(i?"":" active");d.onclick=()=>go(i);dots.appendChild(d)});
function go(i){cur=(i+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle("active",k===cur));$$(".dot").forEach((d,k)=>d.classList.toggle("active",k===cur));clearInterval(timer);timer=setInterval(()=>go(cur+1),6500)}
$("#nextSlide").onclick=()=>go(cur+1);$("#prevSlide").onclick=()=>go(cur-1);go(0);

/* reveal + counters */
const io="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target);const c=e.target.querySelector("[data-n]");if(c)count(c)}}),{threshold:.12}):null;
const watch=el=>io?io.observe(el):el.classList.add("visible");
function count(el){const to=+el.dataset.n,f=+el.dataset.f||0,p=el.dataset.p||"",s=el.dataset.s||"",t0=performance.now();
 (function step(t){const k=Math.min(1,(t-t0)/1400),v=to*(1-Math.pow(1-k,3));el.textContent=p+(f?v.toFixed(f):Math.round(v).toLocaleString("en-US"))+s;if(k<1)requestAnimationFrame(step)})(t0)}
$$(".reveal").forEach(watch);

/* rooms */
let type="All",maxP=90000,sort="",guestsMin=1;const saved=new Set(JSON.parse(store.get("lx_saved")||"[]"));
const types=["All",...new Set(ROOMS.map(r=>r.type))];
$("#typeChips").innerHTML=types.map(t=>`<button class="chip${t==="All"?" on":""}" data-t="${t}">${t}</button>`).join("");
$("#typeChips").onclick=e=>{const c=e.target.closest(".chip");if(!c)return;type=c.dataset.t;$$(".chip").forEach(x=>x.classList.toggle("on",x===c));draw()};
$("#priceRange").oninput=e=>{maxP=+e.target.value;draw()};$("#sortSel").onchange=e=>{sort=e.target.value;draw()};
window.imgFail=im=>{const i=+im.dataset.i;if(!im.dataset.f){im.dataset.f=1;im.src=GOOD[i%GOOD.length]}else im.parentNode.classList.add("noimg")};
function draw(){
 $("#priceValue").textContent=maxP.toLocaleString("en-US");
 let l=ROOMS.filter(r=>(type==="All"||r.type===type)&&r.price<=maxP&&r.guests>=guestsMin);
 if(sort)l=[...l].sort((a,b)=>sort==="lo"?a.price-b.price:b.price-a.price);
 $("#roomCount").textContent=l.length;$("#emptyRooms").hidden=l.length>0;
 $("#roomsGrid").innerHTML=l.map((r,i)=>`<article class="room-card reveal" style="--d:${(i%3)*.08}s"><div class="room-img"><img src="${r.img}" alt="${r.name}" loading="lazy" data-i="${ROOMS.indexOf(r)}" onerror="imgFail(this)"><span class="room-tag">${r.tag}</span><button class="heart${saved.has(r.id)?" saved":""}" data-id="${r.id}" aria-label="Save room">${saved.has(r.id)?"♥":"♡"}</button></div><div class="room-info"><div class="room-type">${r.type.toUpperCase()}</div><h3>${r.name}</h3><p>${r.desc}</p><div class="room-meta"><span>${r.guests} Guests</span><span>${r.size} m²</span>${r.feat.map(f=>`<span>${f}</span>`).join("")}</div><div class="room-bottom"><div><b>${money(r.price)}</b> <small>/ night</small></div><button class="book-room" data-id="${r.id}">Book room →</button></div></div></article>`).join("");
 $$("#roomsGrid .reveal").forEach(watch)}
$("#roomsGrid").onclick=e=>{const h=e.target.closest(".heart"),b=e.target.closest(".book-room");
 if(h){const id=h.dataset.id;saved.has(id)?saved.delete(id):saved.add(id);store.set("lx_saved",JSON.stringify([...saved]));h.classList.toggle("saved",saved.has(id));h.textContent=saved.has(id)?"♥":"♡";toast(saved.has(id)?"Room added to your favourites.":"Room removed from favourites.")}
 if(b)openModal(ROOMS.find(r=>r.id===b.dataset.id))};
draw();

/* dates */
const iso=d=>d.toISOString().slice(0,10),add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x},today=new Date();
const sIn=$("#sIn"),sOut=$("#sOut"),fIn=$("#fIn"),fOut=$("#fOut");
[sIn,fIn].forEach(i=>i.min=iso(today));[sOut,fOut].forEach(i=>i.min=iso(add(today,1)));
sIn.value=iso(add(today,1));sOut.value=iso(add(today,3));
function fixOut(a,b){if(a.value){b.min=iso(add(new Date(a.value),1));if(!b.value||b.value<=a.value)b.value=iso(add(new Date(a.value),1))}}
sIn.onchange=()=>fixOut(sIn,sOut);fIn.onchange=()=>{fixOut(fIn,fOut);summary()};fOut.onchange=summary;
$("#searchBtn").onclick=()=>{guestsMin=+$("#sGuests").value;draw();$("#rooms").scrollIntoView({behavior:"smooth"});toast("Showing rooms for "+guestsMin+(guestsMin>=5?"+":"")+" guest"+(guestsMin>1?"s":""))};

/* booking modal */
const modal=$("#bookingModal");let room=null,total=0,nights=0;
function nightsOf(){if(!fIn.value||!fOut.value)return 0;return Math.round((new Date(fOut.value)-new Date(fIn.value))/864e5)}
function summary(){nights=nightsOf();total=nights>0&&room?nights*room.price:0;
 $("#nightsTxt").textContent=nights>0?nights+" night"+(nights>1?"s":"")+" × "+money(room.price):"Select valid dates";
 $("#totalTxt").textContent=total?money(total):"";wallet()}
function wallet(){const p=$('input[name="pay"]:checked').value,w=p!=="cash";$("#wallet").hidden=!w;$("#cashNote").hidden=w;$("#trx").required=w;
 if(w){const q=$("#walletQr");q.style.display="";q.src="images/payment/"+p+"-qr.png";q.onerror=()=>{q.style.display="none"};$("#walletNum").textContent=NUM[p];$("#walletAmt").textContent=total?money(total):"the total"}}
$$('input[name="pay"]').forEach(r=>r.onchange=wallet);
function openModal(r){room=r;$("#selectedRoom").textContent=r.name+" · "+r.type;$("#selectedPrice").textContent=r.price.toLocaleString("en-US");
 fIn.value=sIn.value;fOut.value=sOut.value;
 const g=$('select[name="guests"]');g.value=$("#sGuests").selectedOptions[0].textContent;
 $("#bookView").hidden=false;$("#successMessage").hidden=true;$("#bookErr").textContent="";summary();
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
const closeModal=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""};
$$("[data-close]").forEach(b=>b.onclick=closeModal);document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

$("#bookingForm").addEventListener("submit",async e=>{
 e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),err=$("#bookErr"),btn=$("#confirmBtn");err.textContent="";
 summary();if(nights<1){err.textContent="Check-out must be after check-in.";return}
 const o={id:"B"+Date.now().toString(36).toUpperCase(),room:{id:room.id,name:room.name,type:room.type},pricePerNight:room.price,nights,total,
  guest:{firstName:d.firstName.trim(),lastName:d.lastName.trim(),email:d.email.trim()},guests:d.guests,checkin:d.checkin,checkout:d.checkout,
  payment:d.pay,trx:d.pay==="cash"?"":(d.trx||"").trim(),status:"Pending"};
 btn.disabled=true;
 try{
  if(db)await db.collection("hotelBookings").doc(o.id).set({...o,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
  else{const l=JSON.parse(store.get("lx_bookings")||"[]");l.push(o);store.set("lx_bookings",JSON.stringify(l))}
  const t=encodeURIComponent("Hello LuxeStay, I booked "+room.name+" ("+o.checkin+" to "+o.checkout+"), booking "+o.id+".");
  $("#bookView").hidden=true;const s=$("#successMessage");s.hidden=false;
  s.innerHTML=`<h2>Booking <em>${o.id}</em> received</h2><p>Thank you, ${o.guest.firstName}. ${room.name} for ${nights} night${nights>1?"s":""}, ${o.checkin} to ${o.checkout}. Total <b>${money(total)}</b> (${PAYS[o.payment]}). We will email you at ${o.guest.email} to confirm.</p>${db?"":'<p class="err">Demo mode: Firebase is not connected yet, so the hotel cannot see this booking.</p>'}<a class="btn btn-gold" href="https://wa.me/${WA}?text=${t}" target="_blank" rel="noopener">Confirm on WhatsApp</a>`;
  f.reset();fIn.value=sIn.value;fOut.value=sOut.value}
 catch(x){console.error(x);err.textContent="We could not submit your booking. Please try again."}
 btn.disabled=false});

/* reviews */
const rv=$$(".review");let ri=0;
function showReview(i){ri=(i+rv.length)%rv.length;rv.forEach((r,k)=>r.classList.toggle("active",k===ri));$("#reviewNum").textContent=String(ri+1).padStart(2,"0")+" / "+String(rv.length).padStart(2,"0")}
$("#reviewNext").onclick=()=>showReview(ri+1);$("#reviewPrev").onclick=()=>showReview(ri-1);setInterval(()=>showReview(ri+1),8000);
$("#newsletter").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Thanks for subscribing.")};
});
