const signupScreen=document.getElementById('signup');
const app=document.getElementById('app');
const greeting=document.getElementById('greeting');
const timeEl=document.getElementById('time');
const locationEl=document.getElementById('location');
const countEl=document.getElementById('count');
const modal=document.getElementById('modal');

const METHODS={
  MWL:{Fajr:'05:10',Dhuhr:'12:05',Asr:'15:30',Maghrib:'18:00',Isha:'19:20'},
  UQ:{Fajr:'05:00',Dhuhr:'12:10',Asr:'15:35',Maghrib:'18:05',Isha:'19:35'}
};

function init(){
  if(localStorage.user){
    signupScreen.classList.remove('active');
    app.classList.add('active');
    greeting.textContent='Hi '+localStorage.user;
    startClock();
    locate();
    buildCalendar();
    restoreChecks();
    calcTimes();
    setPage('home');
  }else signupScreen.classList.add('active');
}

function signup(){
  const u=document.getElementById('usernameInput').value.trim();
  if(!u) return;
  localStorage.user=u;
  init();
}

function startClock(){
  setInterval(()=>{
    timeEl.textContent=new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
  },1000);
}

function locate(){
  navigator.geolocation?.getCurrentPosition(()=>{
    locationEl.textContent='Location detected';
  },()=>locationEl.textContent='Location denied');
}

document.querySelectorAll('.pray').forEach(p=>{
  p.onclick=()=>{
    p.querySelector('.check').classList.toggle('checked');
    saveChecks();updateCount();
  };
});

function saveChecks(){
  const t=new Date().toDateString(),d={};
  document.querySelectorAll('.pray').forEach(p=>{
    d[p.dataset.p]=p.querySelector('.check').classList.contains('checked');
  });
  localStorage['p_'+t]=JSON.stringify(d);
}

function restoreChecks(){
  const d=JSON.parse(localStorage['p_'+new Date().toDateString()]||'{}');
  document.querySelectorAll('.pray').forEach(p=>{
    if(d[p.dataset.p])p.querySelector('.check').classList.add('checked');
  });
  updateCount();
}

function updateCount(){
  countEl.textContent=document.querySelectorAll('.check.checked').length+' / 5 prayers';
}

function calcTimes(){
  const m=document.getElementById('method').value;
  document.querySelectorAll('.pray').forEach(p=>{
    p.querySelector('.pt').textContent=METHODS[m][p.dataset.p];
  });
}

document.querySelectorAll('nav button').forEach(b=>{
  b.onclick=()=>setPage(b.dataset.page);
});

function setPage(p){
  document.querySelectorAll('.page').forEach(pg=>pg.style.display='none');
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  document.getElementById(p).style.display='block';
  document.querySelector('nav button[data-page="'+p+'"]').classList.add('active');
}

function buildCalendar(){
  const g=document.getElementById('calendarGrid');g.innerHTML='';
  const d=new Date(),n=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
  for(let i=1;i<=n;i++){const c=document.createElement('div');c.textContent=i;g.appendChild(c);}
}

function openModal(){modal.classList.remove('hidden')}
function closeModal(){modal.classList.add('hidden')}
function signOut(){localStorage.clear();location.reload()}

init();
