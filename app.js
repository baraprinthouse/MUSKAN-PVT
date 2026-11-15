const WA='9779802366899',$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fmt=n=>'NPR '+Math.round(n).toLocaleString('en-IN');
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ph=n=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="#eef7ea"/><text x="300" y="205" font-family="sans-serif" font-size="34" font-weight="700" fill="#0b5d1e" text-anchor="middle">${esc(n)}</text></svg>`);
/* Only genuine YouTube links are accepted; returns the 11-char video id or null */
const yt=u=>{const m=String(u||'').trim().match(/^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})(?:[?&#].*)?$/);return m?m[1]:null};
function setImg(el,p,c){let s=0;el.onerror=()=>{if(s++===0&&c)el.src=`images/${p.id}.png`;else{el.onerror=null;el.src=ph(p.name)}};el.src=c?`images/${p.id}-${c}.png`:`images/${p.id}.png`}
let cur,col,tab='o';

function grid(f){$('#grid').innerHTML=PRODUCTS.filter(p=>f==='all'||p.cat===f).map(p=>`<article class="card"><button data-id="${p.id}" aria-label="View ${esc(p.name)}">${p.badge?`<span class="bd">${esc(p.badge)}</span>`:''}<img loading="lazy" alt="${esc(p.name)} ${esc(p.type)}" data-pid="${p.id}"><h3>${esc(p.name)}</h3><p>${esc(p.type)}</p><strong>${fmt(p.price)}</strong></button></article>`).join('');
 $$('#grid img').forEach(i=>setImg(i,PRODUCTS.find(p=>p.id===i.dataset.pid),null))}

function tabHtml(){const p=cur;
 if(tab==='s')return Object.keys(p.specs).length?'<table>'+Object.entries(p.specs).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')+'</table>':'<p>Contact us for full specifications.</p>';
 if(tab==='f')return p.faq.length?p.faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join(''):'<p>Ask us anything about this model on WhatsApp.</p>';
 return `<p>${esc(p.desc)}</p><ul>${p.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`}

function render(){const p=cur,c=col;
 $('#gm').innerHTML=`${p.badge?`<span class="bd">${esc(p.badge)}</span>`:''}<img id="dimg" alt="${esc(p.name)} ${esc(c.n)}">`;setImg($('#dimg'),p,p.colors.length>1?c.n.toLowerCase():null);
 $('#dt').textContent=p.name;$('#dtl').textContent=p.tag;$('#dp2').textContent=fmt(p.price);
 $('#do').textContent=p.old?fmt(p.old):'';$('#ds').textContent=p.old?'Save '+fmt(p.old-p.price):'';$('#ds').hidden=!p.old;
 $('#dtiles').innerHTML=p.tiles.map(([a,b])=>`<div><b>${esc(a)}</b>${esc(b)}</div>`).join('');
 $('#dcn').textContent=c.n;
 $('#dsw').innerHTML=p.colors.map((k,i)=>`<button type="button" class="${k===c?'on':''}" style="background:${k.h}" aria-label="${esc(k.n)}" data-ci="${i}"></button>`).join('');
 $$('#dtabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));$('#dtab').innerHTML=tabHtml();
 $('#dvar').innerHTML=p.variants.map(v=>`<span>${esc(v)}</span>`).join('');
 const m=`Hello Muskan Electric, I am interested in ${p.name} (${c.n}).`;
 $('#a1').href=wa(m+' I would like to book a test ride.');$('#a3').href=wa(m+' Please send me a quote.');
 $('#a2').onclick=()=>{$('#dlg').close();$('#cm').value=p.name};
 $('#dv').hidden=!yt(p.video)}

function openP(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;cur=p;col=p.colors[0];tab='o';render();if(!$('#dlg').open)$('#dlg').showModal()}
function route(){const m=location.hash.match(/^#\/([\w-]+)$/);if(m)openP(m[1]);else if($('#dlg').open)$('#dlg').close()}

document.addEventListener('click',e=>{
 const c=e.target.closest('[data-id]');if(c){location.hash='#/'+c.dataset.id;return}
 const f=e.target.closest('[data-f]');if(f){$$('[data-f]').forEach(b=>b.classList.toggle('on',b===f));grid(f.dataset.f);return}
 const s=e.target.closest('[data-ci]');if(s){col=cur.colors[+s.dataset.ci];render();return}
 const t=e.target.closest('[data-t]');if(t){tab=t.dataset.t;render();return}
 if(e.target===$('#dlg'))$('#dlg').close()});
$('#dx').onclick=()=>$('#dlg').close();
$('#dlg').addEventListener('close',()=>{if(/^#\//.test(location.hash))history.replaceState(null,'',location.pathname+location.search)});
$('#dv').onclick=()=>{const id=yt(cur.video);if(id)$('#gm').innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${esc(cur.name)} video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`};
window.addEventListener('hashchange',route);

$('#mb').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#mb').setAttribute('aria-expanded',o)};
$('#nav').onclick=e=>{if(e.target.tagName==='A')$('#nav').classList.remove('open')};

function emi(){const P=+$('#pr').value||0,D=Math.min(+$('#dp').value||0,P),n=Math.max(1,Math.round(+$('#mo').value||1)),r=(+$('#ra').value||0)/1200,L=P-D;
 const m=r?L*r/(1-Math.pow(1+r,-n)):L/n;$('#emo').textContent=fmt(m);$('#etot').textContent=`Loan ${fmt(L)} over ${n} months. Total payable ${fmt(m*n+D)}.`}
$$('#ef input').forEach(i=>i.addEventListener('input',emi));

$('#cm').innerHTML='<option>Not sure yet</option>'+PRODUCTS.map(p=>`<option>${esc(p.name)}</option>`).join('');
$('#cf').addEventListener('submit',e=>{e.preventDefault();const f=e.target;if(f.website.value)return;
 const n=f.n.value.trim(),p=f.p.value.replace(/\s/g,'');
 if(n.length<2){$('#ce').textContent='Enter your name.';return}
 if(!/^9[78]\d{8}$/.test(p)){$('#ce').textContent='Enter a valid 10-digit mobile number starting with 97 or 98.';return}
 $('#ce').textContent='';window.open(wa(`Hello Muskan Electric, my name is ${n}. Mobile: ${p}. Model: ${f.m.value}. ${f.t.value.trim()}`),'_blank','noopener')});
$('#ride').href=wa('Hello Muskan Electric, I would like to book a test ride.');

const ld=document.createElement('script');ld.type='application/ld+json';
ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'ItemList',itemListElement:PRODUCTS.map((p,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'Product',name:p.name,description:p.desc,category:p.type,brand:{'@type':'Brand',name:'ME Muskan Electric'},offers:{'@type':'Offer',priceCurrency:'NPR',price:p.price,availability:'https://schema.org/InStock',seller:{'@type':'Organization',name:'Muskan Electric Pvt. Ltd.'}}}}))});
document.head.appendChild(ld);
$('#yr').textContent=new Date().getFullYear();grid('all');emi();route();
