



// ── Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ── Reveal on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Hero sparks
const sc = document.getElementById('heroSparks');
const tc = ['#00f5e8','#00d2c8','#00bfb5'];
const oc = ['#ff6414','#ff8c00','#ffaa44'];
for(let i=0;i<36;i++) {
  const s = document.createElement('div');
  const left = Math.random() > .5;
  const sz = Math.random()*2.5+.7;
  const col = left ? tc[Math.floor(Math.random()*3)] : oc[Math.floor(Math.random()*3)];
  const x = left ? (Math.random()*38)+'%' : (58+Math.random()*40)+'%';
  const y = (10+Math.random()*80)+'%';
  const dur = 2.5+Math.random()*4;
  const del = Math.random()*7;
  s.style.cssText = `position:absolute;border-radius:50%;width:${sz}px;height:${sz}px;background:${col};left:${x};top:${y};box-shadow:0 0 ${sz*2}px ${col};animation:sparkFloat ${dur}s ${del}s linear infinite;pointer-events:none;`;
  sc.appendChild(s);
}

// ── Form handler
async function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const form = e.target;
  btn.textContent = 'SENDING...';
  btn.disabled = true;
  const data = {
    name:    form.querySelector('input[type="text"]').value,
    email:   form.querySelector('input[type="email"]').value,
    subject: form.querySelector('select').value,
    message: form.querySelector('textarea').value,
  };
  try {
    const res = await fetch('https://parasyte-contact.parasyte-cloud.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      btn.textContent = 'MESSAGE SENT ✓';
      btn.style.background = '#00bfb5';
      form.reset();
    } else {
      btn.textContent = 'FAILED — TRY AGAIN';
      btn.style.background = '#ff6414';
    }
  } catch {
    btn.textContent = 'FAILED — TRY AGAIN';
    btn.style.background = '#ff6414';
  } finally {
    setTimeout(() => {
      btn.textContent = 'SEND MESSAGE';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }
}, 3000);
}

    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.transform='translate(-50%,-50%) scale(2.5)';
      cur.style.background='var(--orange)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.transform='translate(-50%,-50%) scale(1)';
      cur.style.background='var(--teal)';
    });
  });
}

var _cur=document.createElement('div');_cur.id='cur';
var _ring=document.createElement('div');_ring.id='cring';
var _started=false;
document.addEventListener('mousemove',function(e){
  if(!_started){document.body.appendChild(_cur);document.body.appendChild(_ring);_started=true;}
  _cur.style.left=e.clientX+'px';_cur.style.top=e.clientY+'px';
  setTimeout(function(){_ring.style.left=e.clientX+'px';_ring.style.top=e.clientY+'px';},80);
});

// ── Hamburger menu
var _hb = document.getElementById('hamburger');
var _nl = document.querySelector('.nav-links');
var _nc = document.querySelector('.nav-cta');
if(_hb){
  _hb.addEventListener('click', function(){
    var open = _nl.style.display === 'flex';
    _nl.style.display = open ? 'none' : 'flex';
    _nl.style.flexDirection = 'column';
    _nl.style.position = 'absolute';
    _nl.style.top = '70px';
    _nl.style.right = '20px';
    _nl.style.background = '#000';
    _nl.style.padding = '20px';
    _nl.style.gap = '20px';
    _nl.style.border = '1px solid #1a1a1a';
    _nl.style.zIndex = '200';
    if(_nc) _nc.style.display = open ? 'none' : 'block';
  });
  // Close menu when link clicked
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', function(){
      _nl.style.display = 'none';
      if(_nc) _nc.style.display = 'none';
    });
  });
}
