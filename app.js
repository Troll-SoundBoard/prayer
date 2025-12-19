const signup=document.getElementById('signup');
const app=document.getElementById('app');
const enterBtn=document.getElementById('enterBtn');
const greeting=document.getElementById('greeting');
const locationEl=document.getElementById('location');
const streakEl=document.getElementById('streak');

enterBtn.onclick=()=>{
  const u=document.getElementById('username').value.trim();
  if(!u){return}
  localStorage.user=u;
  signup.classList.remove('active');
  app.classList.add('active');
  greeting.textContent='Hi '+u;
  init();
};

function init(){
  loadLocation();
  initPrayers();
  initNav();
}

function loadLocation(){
  if(!navigator.geolocation){
    locationEl.textContent='Location unavailable';
    return;
  }
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude,longitude}=pos.coords;
    locationEl.textContent='Based on your location';
  },()=>{
    locationEl.textContent='Location denied';
  });
}

function initPrayers(){
  document.querySelectorAll('.prayer').forEach(p=>{
    p.onclick=()=>{
      p.classList.toggle('checked');
    };
  });
}

function initNav(){
  document.querySelectorAll('nav button').forEach(btn=>{
    btn.onclick=()=>{
      document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      document.getElementById(btn.dataset.page).classList.add('active');
    };
  });
}

document.getElementById('signOutBtn').onclick=()=>{
  localStorage.clear();
  app.classList.remove('active');
  signup.classList.add('active');
};
