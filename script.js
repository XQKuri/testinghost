// Mobile nav close on link click
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  const n=document.querySelector('.nav'); n?.classList?.remove('open');
}));

// Auto highlight items on the More Info page
(function(){
  const toc = document.querySelector('.toc');
  if (!toc) return;
  const links = toc.querySelectorAll('a[href^="#"]');
  const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  sections.forEach(s => s.style.scrollMarginTop = s.style.scrollMarginTop || '90px');

  function setActive(id){
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href').slice(1) === id));
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, {root:null, rootMargin:'-40% 0px -50% 0px', threshold:0.01});

  sections.forEach(sec => obs.observe(sec));

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', a.getAttribute('href'));
      setActive(target.id);
    });
  });

  if (location.hash) setActive(location.hash.slice(1));
})();