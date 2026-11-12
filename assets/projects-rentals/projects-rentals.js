
document.addEventListener('DOMContentLoaded',()=>{
 const form=document.querySelector('[data-goo-project-form]'); if(!form)return;
 form.addEventListener('submit',async e=>{
  e.preventDefault();const btn=form.querySelector('button[type=submit]'),ok=document.querySelector('.success'),err=document.querySelector('.error');
  ok.style.display='none';err.style.display='none';btn.disabled=true;btn.textContent='Submitting…';
  const fd=new FormData(form);fd.append('access_key','78bbac0f-93da-4eed-bc9e-2c2c4744282a');fd.append('subject','GOO DAARI Projects & Rentals enquiry');fd.append('from_name','GOO DAARI Projects & Rentals');
  fd.append('page_url',location.href);
  try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',body:fd});const d=await r.json();if(r.ok&&d.success){form.reset();ok.style.display='block';form.style.display='none';}else{throw new Error(d.message||'Submission failed');}}
  catch(ex){err.textContent='We could not submit your enquiry. Please try again or contact GOO DAARI through the website WhatsApp/contact option.';err.style.display='block';}
  finally{btn.disabled=false;btn.textContent='Send enquiry';}
 });
});
