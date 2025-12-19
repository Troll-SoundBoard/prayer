const signup=document.getElementById('signup');
const app=document.getElementById('app');
const modal=document.getElementById('modal');
const hi=document.getElementById('hi');
const streakBox=document.getElementById('streak');

if(localStorage.user){
  startApp();
}

function completeSignup(){
  const u=username.value.trim();
  if(!u){alert('Username required');return}
  localStorage.user=u;
  localStorage.bio=bio.value;
  startApp();
}

function startApp(){
  signup.classList.remove('active');
  app.classList.add('active');
  hi.textContent='Hi '+localStorage.user;
  getLocation();
  initPrayers();
  renderCalendar();
}

function show(tab){
  document.querySelectorAll('.card').forEach(c=>c.classList.add('hidden'));
  if(tab==='calendar')calendar.classList.remove('hidden');
  if(tab==='settings')settings.classList.remove('hidden');
}

function openModal(){modal.classList.remove('hidden')}
function closeModal(){modal.classList.add('hidden')}

function signOut(){
  localStorage.clear();
  closeModal();
  location.reload();
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(p=>{
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${p.coords.latitude}&lon=${p.coords.longitude}`)
    .then(r=>r.json()).then(d=>{
      location.textContent=d.address.city+', '+d.address.country;
    });
  });
}

function todayKey(){
  return new Date().toISOString().split('T')[0];
}

function initPrayers(){
  document.querySelectorAll('.pray input').forEach(i=>{
    const k=todayKey()+i.dataset.p;
    i.checked=localStorage[k]==='1';
    toggle(i);
    i.onchange=()=>{
      localStorage[k]=i.checked?'1':'0';
      toggle(i);
      calcStreak();
    }
  });
  calcStreak();
}

function toggle(i){
  i.parentElement.classList.toggle('checked',i.checked);
}

function calcStreak(){
  let days=0;
  for(let i=0;i<30;i++){
    const d=new Date();
    d.setDate(d.getDate()-i);
    const key=d.toISOString().split('T')[0];
    let ok=true;
    ['Fajr','Dhuhr','Asr','Maghrib','Isha'].forEach(p=>{
      if(localStorage[key+p]!=='1')ok=false;
    });
    if(ok)days++; else break;
  }
  streakBox.textContent=days>=2?`${days} days in a row 🔥`:'';
}

function renderCalendar(){
  const g=document.getElementById('grid');
  g.innerHTML='';
  for(let i=1;i<=30;i++){
    const d=document.createElement('div');
    d.textContent=i;
    d.style.display='inline-block';
    d.style.width='40px';
    d.style.margin='4px';
    g.appendChild(d);
  }
}
