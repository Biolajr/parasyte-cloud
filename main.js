// PArAsYtE scripts v4
if(window.matchMedia('(hover:hover)').matches){
var cur=document.createElement('div');
cur.id='cur';
var cring=document.createElement('div');
cring.id='cring';
var cs=false;
document.addEventListener('mousemove',function(e){
if(!cs){document.body.appendChild(cur);document.body.appendChild(cring);cs=true;}
cur.style.left=e.clientX+'px';
cur.style.top=e.clientY+'px';
setTimeout(function(){cring.style.left=e.clientX+'px';cring.style.top=e.clientY+'px';},80);
});
document.addEventListener('mouseover',function(e){
if(e.target.closest('a,button')){cur.style.transform='translate(-50%,-50%) scale(2.5)';cur.style.background='#ff6414';}
else{cur.style.transform='translate(-50%,-50%) scale(1)';cur.style.background='#00e5d8';}
});
}
window.addEventListener('scroll',function(){document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40);});
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
var sc=document.getElementById('heroSparks');
if(sc){var tc=['#00f5e8','#00d2c8','#00bfb5'];var oc=['#ff6414','#ff8c00','#ffaa44'];for(var i=0;i<36;i++){var s=document.createElement('div');var left=Math.random()>0.5;var sz=Math.random()*2.5+0.7;var col=left?tc[Math.floor(Math.random()*3)]:oc[Math.floor(Math.random()*3)];var x=left?(Math.random()*38)+'%':(58+Math.random()*40)+'%';var y=(10+Math.random()*80)+'%';var dur=2.5+Math.random()*4;var del=Math.random()*7;s.style.cssText='position:absolute;border-radius:50%;width:'+sz+'px;height:'+sz+'px;background:'+col+';left:'+x+';top:'+y+';box-shadow:0 0 '+(sz*2)+'px '+col+';animation:sparkFloat '+dur+'s '+del+'s linear infinite;pointer-events:none;';sc.appendChild(s);}}
var hb=document.getElementById('hamburger');var nl=document.querySelector('.nav-links');var nc=document.querySelector('.nav-cta');var mo=false;
if(hb&&nl){hb.addEventListener('click',function(){mo=!mo;if(mo){nl.style.display='flex';nl.style.flexDirection='column';nl.style.position='absolute';nl.style.top='70px';nl.style.right='0';nl.style.left='0';nl.style.background='#000';nl.style.padding='24px 28px';nl.style.gap='20px';nl.style.borderBottom='1px solid #1a1a1a';nl.style.zIndex='200';if(nc)nc.style.display='block';}else{nl.style.display='none';if(nc)nc.style.display='none';}});document.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){mo=false;nl.style.display='none';if(nc)nc.style.display='none';});});}
function handleForm(e){e.preventDefault();var btn=e.target.querySelector('.form-submit');var form=e.target;btn.textContent='SENDING...';btn.disabled=true;var data={name:form.querySelector('input[type="text"]').value,email:form.querySelector('input[type="email"]').value,subject:form.querySelector('select').value,message:form.querySelector('textarea').value};fetch('https://parasyte-contact.infra-727.workers.dev',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(res){if(res.ok){btn.textContent='MESSAGE SENT';btn.style.background='#00bfb5';form.reset();}else{btn.textContent='FAILED - TRY AGAIN';btn.style.background='#ff6414';}}).catch(function(){btn.textContent='FAILED - TRY AGAIN';btn.style.background='#ff6414';}).finally(function(){setTimeout(function(){btn.textContent='SEND MESSAGE';btn.style.background='';btn.disabled=false;},4000);});}
