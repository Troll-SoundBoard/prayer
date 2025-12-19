const signupScreen=document.getElementById('signup');
const app=document.getElementById('app');
const greeting=document.getElementById('greeting');
const timeEl=document.getElementById('time');
const locationEl=document.getElementById('location');
const countEl=document.getElementById('count');

function init(){
  const u=localStorage.user;
  if(u){
    signupScreen.classList.remove('active');
    app.classList.add('active');
    greeting.textContent='Hi '+u;
    startClock();
    locate();
    buildCalendar();
    restoreChecks();
    updateCount();
    setPage('home');
  }else{
    signupScreen.classList.add('active');
  }
}

function signup(){
  const u=document.getElementById('usernameInput').value.trim();
  if(!u) return;
  localStorage.user=u;
  init();
}

function startClock(){
  setInterval(()=>{
    const d=new Date();
    timeEl.textContent=d.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
  },1000);
}

function locate(){
  if(!navigator.geolocation){
    locationEl.textContent='Location unavailable';
    return;
  }
  navigator.geolocation.getCurrentPosition(pos=>{
    locationEl.textContent='Your location detected';
  },()=>{
    locationEl.textContent='Location denied';
  });
}

document.querySelectorAll('.pray').forEach(p=>{
  p.onclick=()=>{
    const c=p.querySelector('.check');
    c.classList.toggle('checked');
    saveChecks();
    updateCount();
  };
});

function saveChecks(){
  const today=new Date().toDateString();
  const data={};
  document.querySelectorAll('.pray').forEach(p=>{
    data[p.dataset.p]=p.querySelector('.check').classList.contains('checked');
  });
  localStorage['prayers_'+today]=JSON.stringify(data);
}

function restoreChecks(){
  const today=new Date().toDateString();
  const data=JSON.parse(localStorage['prayers_'+today]||'{}');
  document.querySelectorAll('.pray').forEach(p=>{
    if(data[p.dataset.p]){
      p.querySelector('.check').classList.add('checked');
    }
  });
}

function updateCount(){
  const total=document.querySelectorAll('.check.checked').length;
  countEl.textContent=total+' / 5 prayers completed today';
}

document.querySelectorAll('nav button').forEach(btn=>{
  btn.onclick=()=>setPage(btn.dataset.page);
});

function setPage(p){
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.page').forEach(pg=>pg.style.display='none');
  document.getElementById(p).style.display='block';
  document.querySelector(`nav button[data-page="${p}"]`).classList.add('active');
}

function buildCalendar(){
  const grid=document.getElementById('calendarGrid');
  grid.innerHTML='';
  const now=new Date();
  const days=new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  for(let i=1;i<=days;i++){
    const d=document.createElement('div');
    d.textContent=i;
    grid.appendChild(d);
  }
}

function signOut(){
  localStorage.clear();
  location.reload();
}

init();
