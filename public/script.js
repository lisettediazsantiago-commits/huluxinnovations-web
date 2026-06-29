// HuLux Innovations — shared interactions
(function(){
  // sticky nav background on scroll
  const nav = document.querySelector('.nav');
  const onScroll = () => { if(nav) nav.classList.toggle('scrolled', window.scrollY > 30); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=> menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> menu.classList.remove('open')));
  }

  // scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach((el,i)=>{
    el.style.transitionDelay = (Math.min(i%6,5)*70) + 'ms';
    io.observe(el);
  });

  // Formspree intake form — AJAX submit, stays on page (falls back to normal POST if JS fails)
  document.querySelectorAll('form.intake').forEach(form=>{
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const btn = form.querySelector('button[type=submit]');
      if(status){ status.className='form-status'; status.textContent=''; }
      if(btn){ btn.disabled=true; btn.textContent='Sending…'; }
      try{
        const res = await fetch(form.action, {
          method:'POST',
          body:new FormData(form),
          headers:{'Accept':'application/json'}
        });
        if(res.ok){
          form.classList.add('sent');
          const done = form.parentElement.querySelector('.intake-done');
          if(done){ done.classList.add('show'); done.scrollIntoView({behavior:'smooth',block:'center'}); }
        } else {
          const data = await res.json().catch(()=>({}));
          const msg = (data.errors && data.errors.map(x=>x.message).join(', '))
            || 'Something went wrong. Please try again, or email hello@huluxinnovations.com.';
          if(status){ status.className='form-status err'; status.textContent=msg; }
          if(btn){ btn.disabled=false; btn.textContent='Send inquiry'; }
        }
      }catch(err){
        if(status){ status.className='form-status err'; status.textContent='Network error. Please try again, or email hello@huluxinnovations.com.'; }
        if(btn){ btn.disabled=false; btn.textContent='Send inquiry'; }
      }
    });
  });
})();
