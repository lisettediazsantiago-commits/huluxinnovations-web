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
})();
