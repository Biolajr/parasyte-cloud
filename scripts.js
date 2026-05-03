// ── Custom cursor (desktop only)
if (window.matchMedia('(hover:hover)').matches) {
  var cur = document.createElement('div');
  cur.id = 'cur';

  var cring = document.createElement('div');
  cring.id = 'cring';

  var curStarted = false;

  document.addEventListener('mousemove', function(e) {
    if (!curStarted) {
      document.body.appendChild(cur);
      document.body.appendChild(cring);
      curStarted = true;
    }
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
    setTimeout(function() {
      cring.style.left = e.clientX + 'px';
      cring.style.top = e.clientY + 'px';
    }, 80);
  });

  document.addEventListener('mouseover', function(e) {
    if (e.target.closest('a, button')) {
      cur.style.transform = 'translate(-50%,-50%) scale(2.5)';
      cur.style.background = '#ff6414';
    } else {
      cur.style.transform = 'translate(-50%,-50%) scale(1)';
      cur.style.background = '#00e5d8';
    }
  });
}

// ── Nav scroll
window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ── Reveal on scroll
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });

// ── Hero sparks
var sc = document.getElementById('heroSparks');
if (sc) {
  var tc = ['#00f5e8','#00d2c8','#00bfb5'];
  var oc = ['#ff6414','#ff8c00','#ffaa44'];
  for (var i = 0; i < 36; i++) {
    var s = document.createElement('div');
    var left = Math.random() > 0.5;
    var sz = Math.random() * 2.5 + 0.7;
    var col = left ? tc[Math.floor(Math.random()*3)] : oc[Math.floor(Math.random()*3)];
    var x = left ? (Math.random()*38)+'%' : (58+Math.random()*40)+'%';
    var y = (10+Math.random()*80)+'%';
    var dur = 2.5 + Math.random()*4;
    var del = Math.random()*7;
    s.style.cssText = 'position:absolute;border-radius:50%;width:'+sz+'px;height:'+sz+'px;background:'+col+';left:'+x+';top:'+y+';box-shadow:0 0 '+(sz*2)+'px '+col+';animation:sparkFloat '+dur+'s '+del+'s linear infinite;pointer-events:none;';
    sc.appendChild(s);
  }
}

// ── Hamburger menu
var hb = document.getElementById('hamburger');
var navLinks = document.querySelector('.nav-links');
var navCta = document.querySelector('.nav-cta');
var menuOpen = false;

if (hb && navLinks) {
  hb.addEventListener('click', function() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.right = '20px';
      navLinks.style.left = '0';
      navLinks.style.background = '#000';
      navLinks.style.padding = '24px 28px';
      navLinks.style.gap = '20px';
      navLinks.style.borderBottom = '1px solid #1a1a1a';
      navLinks.style.zIndex = '200';
      if (navCta) navCta.style.display = 'block';
    } else {
      navLinks.style.display = 'none';
      if (navCta) navCta.style.display = 'none';
    }
  });

  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.addEventListener('click', function() {
      menuOpen = false;
      navLinks.style.display = 'none';
      if (navCta) navCta.style.display = 'none';
    });
  });
}

// ── Form handler
function handleForm(e) {
  e.preventDefault();
  var btn = e.target.querySelector('.form-submit');
  var form = e.target;
  btn.textContent = 'SENDING...';
  btn.disabled = true;
  var data = {
    name:    form.querySelector('input[type="text"]').value,
    email:   form.querySelector('input[type="email"]').value,
    subject: form.querySelector('select').value,
    message: form.querySelector('textarea').value,
  };
  fetch('https://parasyte-contact.infra-727.workers.dev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(function(res) {
    if (res.ok) {
      btn.textContent = 'MESSAGE SENT';
      btn.style.background = '#00bfb5';
      form.reset();
    } else {
      btn.textContent = 'FAILED - TRY AGAIN';
      btn.style.background = '#ff6414';
    }
  }).catch(function() {
    btn.textContent = 'FAILED - TRY AGAIN';
    btn.style.background = '#ff6414';
  }).finally(function() {
    setTimeout(function() {
      btn.textContent = 'SEND MESSAGE';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  });
}
