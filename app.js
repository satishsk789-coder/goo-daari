const DATA = window.GOO_DAARI_DATA || [];
const LOCATIONS = window.GOO_DAARI_LOCATIONS || [{name:'All locations',slug:'all'}];
const $ = s => document.querySelector(s);
const esc = s => String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
const cleanTown=t=>String(t||'').replace(/Peddapuram & surrounding/i,'Peddapuram').replace(/Peddapuram \/ East Godavari/i,'Peddapuram').replace(/Peddapuram search area/i,'Peddapuram');
function selectedLocation(){ return localStorage.getItem('gooDaariLocation') || 'all'; }
function setLocation(slug){ localStorage.setItem('gooDaariLocation',slug); syncLocationUI(); renderCards(); runSearch($('#search')?.value.trim()||''); }
function selectedTownName(){ const slug=selectedLocation(); return LOCATIONS.find(x=>x.slug===slug)?.name || 'All locations'; }
function locationMatches(r,slug){
 if(!slug || slug==='all') return true;
 const town=cleanTown(r.Town).toLowerCase();
 return town===slug.replaceAll('-',' ').toLowerCase() || town.includes(slug.replaceAll('-',' ').toLowerCase());
}
function categoryMatches(r,cat){
 if(!cat) return true;
 const c=String(cat).toLowerCase();
 const top=String(r['Top Category']||'').toLowerCase();
 const sub=String(r['Subcategory']||'').toLowerCase();
 const text=[r['Business Name'],r['Subcategory'],r['Notes']].join(' ').toLowerCase();
 if(c==='repairs') return /(repair|mechanic|refrigeration|washing machine|appliance|service)/i.test(text);
 if(c==='education') return /(education|school|college|tuition|coaching|training|academy|institute|tutorial|computer education)/i.test(text);
 if(c==='food') return top==='shops & local businesses' && /(restaurant|food|tiffin|bakery|cafe|hotel|catering)/i.test(text);
 if(c==='shops') return top==='shops & local businesses';
 if(c==='healthcare') return top==='health, care & community';
 if(c==='automotive') return top==='auto & transport';
 return top===c;
}
function matches(r,q,cat,town){
 const text=[r['Business Name'],r['Top Category'],r['Subcategory'],r['Town'],r['Address'],r['Notes']].join(' ').toLowerCase();
 return (!q||text.includes(q.toLowerCase())) && categoryMatches(r,cat) && (!town||cleanTown(r['Town']).toLowerCase().includes(town.toLowerCase())) && locationMatches(r,selectedLocation());
}
function card(r){
 const phone=(r.Phone||'').replace(/[^\d+]/g,''); const wa=(r.Phone||'').replace(/\D/g,'');
 const town=cleanTown(r.Town); const href=`/businesses/${r.town_slug}/${r.slug}.html`;
 return `<article class="card"><span class="badge">${esc(r['Subcategory']||r['Top Category'])}</span><h3><a href="${href}">${esc(r['Business Name'])}</a></h3><div class="sub">${esc(town)}${r.Address?' · '+esc(r.Address):''}</div>${r.Rating?`<div class="rating">★ ${esc(r.Rating)}${r.Reviews?' · '+esc(r.Reviews)+' reviews':''}</div>`:''}<div class="actions">${phone?`<a class="action primary" href="tel:${phone}">Call</a>`:''}${wa&&wa.length>=10?`<a class="action" href="https://wa.me/${wa.startsWith('91')?wa:'91'+wa}" target="_blank" rel="noopener">WhatsApp</a>`:''}<a class="action" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((r['Business Name']+' '+r.Address))}" target="_blank" rel="noopener">Directions</a></div></article>`;
}
function resultRow(r){
 const phone=(r.Phone||'').replace(/[^\d+]/g,'');
 return `<a class="result-row" href="/businesses/${r.town_slug}/${r.slug}.html"><div class="result-main"><div class="result-name">${esc(r['Business Name'])}</div><div class="result-meta">${esc(r['Subcategory']||r['Top Category'])} · ${esc(cleanTown(r.Town))}${r.Rating?' · ★ '+esc(r.Rating):''}</div></div>${phone?`<span class="mini-btn">View</span>`:''}</a>`;
}
function runSearch(q){
 const panel=$('#resultsPanel'); if(!panel)return;
 const cat=$('#catFilter')?.value||''; const town=$('#townFilter')?.value||'';
 const rows=DATA.filter(r=>matches(r,q,cat,town)).slice(0,8);
 panel.innerHTML=rows.length?`<div style="padding:7px 12px;color:#60736b;font-size:12px;font-weight:800">${rows.length} result${rows.length>1?'s':''} shown · ${esc(selectedTownName())}</div>`+rows.map(resultRow).join('')+`<div style="padding:12px"><button class="load" onclick="window.location.href='/search.html?q=${encodeURIComponent(q)}'">View all results</button></div>`:`<div class="noresult"><strong>No listings found in ${esc(selectedTownName())} yet.</strong><br>Try another service, choose another location, or help us add the business.<br><a class="back" href="/list-your-business.html">List a business</a></div>`;
 panel.classList.add('open');
}
window.renderCards = function renderCards(){
 const cards=$('#cards'); if(!cards)return;
 const params=new URLSearchParams(location.search); const q=params.get('q')||''; const path=location.pathname; const pathCat=path.startsWith('/services/')?path.split('/')[2].replace('.html','') : ''; const mapCat={'home-services':'Home Services','agriculture-rentals':'Agriculture & Rentals','electronics-digital':'Electronics & Digital','events-functions':'Events & Functions','auto-transport':'Auto & Transport','shops-local-businesses':'Shops & Local Businesses','professional-personal':'Professional & Personal','health-care-community':'Health, Care & Community'}; const urlCat=params.get('category')||''; const cat=$('#catFilter')?.value||urlCat||mapCat[pathCat]||''; const town=$('#townFilter')?.value||'';
 let rows=DATA.filter(r=>matches(r,q,cat,town)); const limit=Number(cards.dataset.limit||9); cards.innerHTML=rows.slice(0,limit).map(card).join('');
 $('#count')&&($('#count').textContent = `${rows.length} local listing${rows.length!==1?'s':''}${q?' matching “'+q+'”':''} · ${selectedTownName()}`);
 const more=$('#loadMore'); if(more) more.style.display=rows.length>limit?'block':'none';
 const empty=$('#emptyLocation'); if(empty) empty.innerHTML=(!rows.length && selectedLocation()!=='all')?`<div class="notice">We haven't added listings in <strong>${esc(selectedTownName())}</strong> yet. This location is part of the GOO DAARI expansion plan — <a href="/list-your-business.html" class="back">add a local business</a>.</div>`:'';
}
function syncLocationUI(){
 const sel=$('#locationSelect'); if(!sel)return;
 const current=selectedLocation();
 sel.innerHTML=LOCATIONS.map(x=>`<option value="${x.slug}">${x.status==='coming-soon'?'○ ':''}${esc(x.name)}</option>`).join(''); sel.value=current;
}
function init(){
 const cat=$('#catFilter'),town=$('#townFilter');
 if(cat){[...new Set(DATA.map(r=>r['Top Category']))].sort().forEach(x=>cat.insertAdjacentHTML('beforeend',`<option>${esc(x)}</option>`)); const initialCat=new URLSearchParams(location.search).get('category')||''; if(initialCat && [...cat.options].some(o=>o.value.toLowerCase()===initialCat.toLowerCase())) cat.value=[...cat.options].find(o=>o.value.toLowerCase()===initialCat.toLowerCase()).value; cat.addEventListener('change',()=>{ const u=new URL(location.href); if(cat.value) u.searchParams.set('category',cat.value); else u.searchParams.delete('category'); history.replaceState({},'',u); renderCards(); })}
 if(town){[...new Set(DATA.map(r=>cleanTown(r.Town)))].filter(Boolean).sort().forEach(x=>town.insertAdjacentHTML('beforeend',`<option>${esc(x)}</option>`)); const initialTown=new URLSearchParams(location.search).get('town')||''; if(initialTown && [...town.options].some(o=>o.value.toLowerCase()===initialTown.toLowerCase())) town.value=[...town.options].find(o=>o.value.toLowerCase()===initialTown.toLowerCase()).value; town.addEventListener('change',renderCards)}
 const loc=$('#locationSelect'); if(loc){syncLocationUI(); loc.addEventListener('change',e=>setLocation(e.target.value));}
 const input=$('#search'); const btn=$('#searchBtn');
 if(input){input.addEventListener('input',()=>runSearch(input.value.trim())); input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault(); if(location.pathname.endsWith('/search.html')){history.replaceState({},'', '/search.html?q='+encodeURIComponent(input.value.trim())); renderCards()} else {runSearch(input.value.trim())}}})}
 if(btn)btn.addEventListener('click',()=>{const q=input?.value.trim()||''; if(location.pathname.endsWith('/search.html')){history.replaceState({},'', '/search.html?q='+encodeURIComponent(q)); renderCards()} else {runSearch(q)}});
 document.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{if(input){input.value=b.dataset.q;runSearch(b.dataset.q)}}));
 document.querySelectorAll('[data-cat]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault(); const c=a.dataset.cat; if(cat){cat.value=c;renderCards();document.querySelector('#businesses')?.scrollIntoView({behavior:'smooth'})}}));
 if($('#cards'))renderCards();
 const lm=$('#loadMore'); if(lm)lm.addEventListener('click',()=>{const c=$('#cards');c.dataset.limit=Number(c.dataset.limit||9)+9;renderCards()});
}
document.addEventListener('DOMContentLoaded',init);

/* GOO DAARI analytics events */
window.gooDaariTrack = function(eventName, params){
  const payload = Object.assign({event: eventName}, params || {});
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (typeof window.gtag === 'function') {
    const gaParams = Object.assign({}, params || {});
    window.gtag('event', eventName, gaParams);
  }
};

document.addEventListener('click', function(e){
  const el = e.target.closest('a,button');
  if(!el) return;
  const href = el.getAttribute('href') || '';
  const text = (el.textContent || '').trim().replace(/\s+/g,' ').slice(0,100);

  if(href.startsWith('tel:')) {
    gooDaariTrack('contact_click', {method:'phone', link_url:href, link_text:text});
  } else if(href.includes('wa.me')) {
    gooDaariTrack('contact_click', {method:'whatsapp', link_url:href, link_text:text});
  } else if(href.includes('google.com/maps')) {
    gooDaariTrack('directions_click', {link_url:href, link_text:text});
  } else if(href.includes('list-your-business')) {
    gooDaariTrack('list_business_click', {link_text:text, link_url:href});
  }

  if(el.matches('[data-q]')) {
    gooDaariTrack('search_suggestion_click', {search_term:el.dataset.q || text});
  }
  if(el.matches('[data-cat]')) {
    gooDaariTrack('category_click', {category:el.dataset.cat || text});
  }
}, true);

/* Track searches from the existing search UI */
document.addEventListener('keydown', function(e){
  if(e.target && e.target.id === 'search' && e.key === 'Enter') {
    const term = (e.target.value || '').trim();
    if(term) gooDaariTrack('search', {search_term:term, location:selectedTownName()});
  }
});
document.addEventListener('click', function(e){
  if(e.target.closest('#searchBtn')) {
    const input = document.querySelector('#search');
    const term = (input?.value || '').trim();
    if(term) gooDaariTrack('search', {search_term:term, location:selectedTownName()});
  }
});
