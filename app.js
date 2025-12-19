const signup=document.getElementById('signup');
const app=document.getElementById('app');
const greet=document.getElementById('greet');
const loc=document.getElementById('loc');

function enter(){
  const u=document.getElementById('username').value.trim();
  if(!u) return;
  signup.classList.remove('active');
  app.classList.add('active');
  greet.textContent='Hi '+u;
  locate();
}

function locate(){
  if(!navigator.geolocation){
    loc.textContent='Location unavailable';
    return;
  }
  navigator.geolocation.getCurrentPosition(()=>{
    loc.textContent='Based on your location';
  },()=>{
    loc.textContent='Location denied';
  });
}

document.querySelectorAll('.check').forEach(c=>{
  c.onclick=()=>c.classList.toggle('checked');
});
