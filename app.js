const signupScreen=document.getElementById('signup');
const app=document.getElementById('app');
const greeting=document.getElementById('greeting');
const timeEl=document.getElementById('time');
const locationEl=document.getElementById('location');

function signup(){
  const u=document.getElementById('usernameInput').value.trim();
  if(!u) return;
  localStorage.user=u;
  signupScreen.classList.remove('active');
  app.classList.add('active');
  greeting.textContent='Hi '+u;
  startClock();
  locate();
  buildCalendar();
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
  navigator.geolocation.getCurrentPosition(()=>{
    locationEl.textContent='Based on your location';
  },()=>{
    locationEl.textContent='Location denied';
  });
}

document.querySelectorAll('.check').forEach(c=>{
  c.onclick=()=>c.classList.toggle('checked');
});

document.querySelectorAll('nav button').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(btn.dataset.page).classList.add('active');
  };
});

function buildCalendar(){
  const grid=document.getElementById('calendarGrid');
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
  app.classList.remove('active');
  signupScreen.classList.add('active');
}
