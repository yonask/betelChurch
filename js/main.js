
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle && nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
}
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();
const backTop=document.querySelector('.back-top');
if(backTop){
  addEventListener('scroll',()=>backTop.classList.toggle('show',scrollY>420));
  backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
}

/* gentle scroll reveal for section content */
const revealSelectors='.section-head, .card, .teaser-card, .ministry-card, .resource-card, .sermon-card, .highlight, .verse-card, .visit-card, .media-card, .float-card, .accordion, .contact-form, .contact-list, .schedule, .empty-state';
document.querySelectorAll(revealSelectors).forEach(el=>el.setAttribute('data-reveal',''));
const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window && !prefersReduced){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));
}else{
  document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('is-visible'));
}
