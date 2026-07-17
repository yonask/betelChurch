
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


/* Contact form: send through FormSubmit without leaving the page */
const contactForm=document.querySelector('[data-contact-form]');
if(contactForm){
  const status=contactForm.querySelector('.form-status');
  const submitButton=contactForm.querySelector('button[type="submit"]');
  const replyTo=contactForm.querySelector('input[name="_replyto"]');

  const params=new URLSearchParams(location.search);
  if(params.get('sent')==='true' && status){
    status.textContent='Thank you. Your message was sent successfully.';
    status.classList.add('success');
  }

  contactForm.addEventListener('submit',async(event)=>{
    event.preventDefault();
    const formData=new FormData(contactForm);
    const senderEmail=formData.get('email') || '';
    if(replyTo) replyTo.value=senderEmail;
    formData.set('_replyto', senderEmail);

    if(status){
      status.textContent='Sending your message...';
      status.classList.remove('success','error');
    }
    if(submitButton) submitButton.disabled=true;

    try{
      const endpoint=contactForm.action.replace('formsubmit.co/','formsubmit.co/ajax/');
      const response=await fetch(endpoint,{
        method:'POST',
        headers:{'Accept':'application/json'},
        body:formData
      });
      if(!response.ok) throw new Error('Form service error');
      contactForm.reset();
      if(status){
        status.textContent='Thank you. Your message was sent successfully.';
        status.classList.add('success');
      }
    }catch(error){
      if(status){
        status.innerHTML='Sorry, the message could not be sent. Please email <a href="mailto:yonas.k.bezabeh@gmail.com">yonas.k.bezabeh@gmail.com</a> directly.';
        status.classList.add('error');
      }
    }finally{
      if(submitButton) submitButton.disabled=false;
    }
  });
}
