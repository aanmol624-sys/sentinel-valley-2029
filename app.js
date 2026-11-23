// Hero pins: one orchestrated reveal
document.addEventListener('DOMContentLoaded',()=>{
  if(document.getElementById('gantt'))drawGantt('all');
  if(document.getElementById('tree'))drawTree();
  if(document.getElementById('simday'))initSim();
});
const C={INIT:'#0F2A3A',PLAN:'#0F2A3A',PROC:'#6B7A83',SENSE:'#2F6B4F',SIMULATE:'#3A6EA5',SHIELD:'#4E9C93',SUPPLY:'#A8792E',SUSTAIN:'#7A5C8E',TEST:'#C0392B',MC:'#9AA7AD',CLOSE:'#0F2A3A'};
const T=[
// [wbs,name,group,start,end,critical,predecessor note]
['1.1','Charter signed, champion & sponsor confirmed','INIT','2027-01-04','2027-02-26',1],
['1.2','Stakeholder register & partner MOUs','INIT','2027-01-18','2027-04-30',0],
['M1','Milestone: charter approved','INIT','2027-02-26','2027-02-26',1,1],
['2.1','Requirements & work breakdown structure','PLAN','2027-03-01','2027-05-28',1],
['2.2','Privacy impact assessments & data agreements','PLAN','2027-03-01','2027-08-27',0],
['2.3','Detailed design & definitive estimates','PLAN','2027-04-05','2027-08-27',1],
['M2','Milestone: baseline plan approved (phase exit / kill point)','PLAN','2027-09-03','2027-09-03',1,1],
['3.1','RFPs and RFQs issued and evaluated','PROC','2027-06-01','2027-10-29',1],
['M3','Milestone: major contracts awarded','PROC','2027-11-30','2027-11-30',1,1],
['4.1','Wastewater sentinel sites installed','SENSE','2028-01-03','2028-06-30',0],
['4.2','Farm & wild-bird sentinel program','SENSE','2028-01-03','2029-06-29',0],
['4.3','One Health genomics lab built & commissioned','SENSE','2027-12-01','2029-03-30',0],
['4.4','Global Sentinel Partnership grants','SENSE','2028-01-03','2029-06-29',0],
['5.1','Data & Simulation Centre built','SIMULATE','2027-12-01','2028-12-22',0],
['5.2','Digital twin: spiral cycles 1 to 4','SIMULATE','2028-01-03','2029-06-29',0],
['5.3','Alert app & public dashboard','SIMULATE','2028-07-03','2029-05-31',0],
['5.4','ISO/IEC 27001 certification','SIMULATE','2029-01-07','2029-07-31',0],
['6.1','Building air assessments','SHIELD','2027-09-06','2028-02-25',0],
['6.2a','School HVAC & far-UVC, summer wave 1','SHIELD','2028-06-26','2028-08-31',0],
['6.2b','School HVAC & far-UVC, summer wave 2','SHIELD','2029-06-25','2029-08-30',0],
['6.3','Care homes, farm housing, processing plants','SHIELD','2028-03-01','2029-06-29',0],
['7.1','Depot land purchase & design','SUPPLY','2027-09-06','2028-02-25',1],
['7.2','Flood-proof depot construction','SUPPLY','2028-03-01','2029-03-30',1],
['7.3','Stockpile purchase & rotation contracts','SUPPLY','2029-04-02','2029-07-31',1],
['7.4','Modular surge unit delivered','SUPPLY','2028-06-01','2029-06-29',0],
['8.1','UFV training cohorts','SUSTAIN','2027-09-06','2029-12-14',0],
['8.2','Business-continuity plans','SUSTAIN','2028-09-04','2029-06-29',0],
['8.3','Disease X exercises (yearly)','SUSTAIN','2027-10-04','2029-10-29',0],
['9.1','Integrated system testing','TEST','2029-06-04','2029-08-31',1],
['9.2','Full-scale exercise "Operation Sentinel"','TEST','2029-09-04','2029-09-28',1],
['M4','Milestone: go-live','TEST','2029-10-01','2029-10-01',1,1],
['10','Monitoring & controlling (monthly reports, quarterly reviews)','MC','2027-01-04','2029-12-31',0],
['11.1','Closing: acceptance, close contracts, lessons learned, handover','CLOSE','2029-10-01','2029-12-21',1],
['M5','Milestone: project closed','CLOSE','2029-12-31','2029-12-31',1,1],
];
function drawGantt(filter){
  const el=document.getElementById('gantt');const s0=new Date('2027-01-01'),s1=new Date('2030-01-15');
  const rows=T.filter(t=>filter==='all'||(filter==='crit'&&t[5])||t[2]===filter);
  const L=330,W=1150,rh=22,top=34,H=top+rows.length*rh+12;const x=d=>L+(new Date(d)-s0)/(s1-s0)*(W-L-10);
  let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gantt chart, January 2027 to December 2029">`;
  for(let y=2027;y<=2029;y++)for(let q=0;q<4;q++){const d=`${y}-${String(q*3+1).padStart(2,'0')}-01`,xx=x(d);
    g+=`<line x1="${xx}" y1="${top-6}" x2="${xx}" y2="${H}" stroke="${q?'#E3EBE8':'#B9CBC5'}"/>`;
    g+=`<text x="${xx+3}" y="${top-12}" fill="#4C6470">${q?'Q'+(q+1):y+' Q1'}</text>`;}
  rows.forEach((t,i)=>{const y=top+i*rh,ms=t[6];
    g+=`<text x="4" y="${y+14}" fill="#0F2A3A">${t[0]}  ${t[1].length>48?t[1].slice(0,47)+'…':t[1]}</text>`;
    if(ms){const cx=x(t[3]);g+=`<path d="M${cx} ${y+3} l8 8 l-8 8 l-8 -8z" fill="#E39B2E" stroke="#0F2A3A"><title>${t[1]}: ${t[3]}</title></path>`;}
    else{const a=x(t[3]),b=x(t[4]);g+=`<rect x="${a}" y="${y+4}" width="${Math.max(3,b-a)}" height="${rh-8}" rx="2" fill="${C[t[2]]}" ${t[5]?'class="crit" stroke="#E39B2E"':''}><title>${t[1]}: ${t[3]} to ${t[4]}</title></rect>`;}
  });
  const tx=x('2029-12-31');g+=`<line x1="${tx}" y1="${top-6}" x2="${tx}" y2="${H}" stroke="#C0392B" stroke-dasharray="4 3"/><text x="${tx-118}" y="${H-4}" fill="#C0392B">Dec 31, 2029 close-out</text></svg>`;
  el.innerHTML=g;
}
function setG(btn,f){document.querySelectorAll('[data-g]').forEach(b=>b.setAttribute('aria-pressed',b===btn));drawGantt(f);}
// Budget treemap (columns by pillar, cells by line)
const PC={SENSE:'#2F6B4F',SIMULATE:'#3A6EA5',SHIELD:'#4E9C93',SUPPLY:'#A8792E',SUSTAIN:'#7A5C8E','PM & QUALITY':'#6B7A83',RESERVES:'#8A9BA3'};
function money(v){return v>=1e6?'$'+(v/1e6).toFixed(1)+'M':'$'+Math.round(v).toLocaleString()}
function drawTree(){const tree=document.getElementById('tree');const by={};BUDGET.forEach(l=>(by[l.pillar]=by[l.pillar]||[]).push(l));
  Object.entries(by).forEach(([p,ls])=>{const tot=ls.reduce((a,b)=>a+b.total,0);const col=document.createElement('div');col.className='col';col.style.flex=tot;
    ls.sort((a,b)=>b.total-a.total).forEach(l=>{const c=document.createElement('button');c.className='cell';c.style.setProperty('--c',PC[p]);c.style.flex=l.total;
      c.innerHTML=l.total>12e6?`<b>${money(l.total)}</b>${l.item}`:(l.total>5e6?`<b>${money(l.total)}</b>`:'');
      c.setAttribute('aria-label',`${l.id} ${l.item}: ${money(l.total)}`);
      c.onclick=c.onfocus=()=>{document.getElementById('detail').innerHTML=`<b>${l.id} ${l.item}</b><br>${l.qty.toLocaleString()} ${l.unit} × ${money(l.unit_cost)} = <b>${money(l.total)}</b> (${p})<br>${l.note||''}`};
      col.appendChild(c)});tree.appendChild(col)});}
// Day 0 simulation
function initSim(){
  const r=document.getElementById('simday'),NS='http://www.w3.org/2000/svg';
  // seeded random so both maps look the same on every visit
  let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
  const gauss=()=>(rnd()+rnd()+rnd()-1.5)/1.5;
  const T={Mission:[118,212],Abbotsford:[210,250],'Sumas border':[255,292],'Sumas Prairie':[330,232],Chilliwack:[410,206],Yarrow:[372,262],Agassiz:[468,150],Hope:[560,96]};
  const FARM=[395,236],LAB=[452,226],DEPOT=[300,214];
  // without: spread grows ~0.06·d^2.2, seeding new towns as the story moves on
  const then=[{b:0,x:FARM[0],y:FARM[1]}];for(let i=1;i<=200;i++){const b=Math.pow(i/0.06,1/2.2);let c;
    if(b<9)c=FARM;else if(b<21)c=rnd()<.7?T.Chilliwack:T.Yarrow;else{const k=['Abbotsford','Mission','Chilliwack','Abbotsford','Sumas Prairie','Agassiz','Hope','Mission'][Math.floor(rnd()*8)];c=T[k];}
    const s=b<9?10:b<21?20:30;then.push({b,x:c[0]+gauss()*s,y:c[1]+gauss()*s*.7});}
  const now=[[0,0,0],[1,10,-6],[2,-9,5],[3,6,9],[3,-12,-4],[4,14,4]].map(([b,dx,dy])=>({b,x:FARM[0]+dx,y:FARM[1]+dy}));
  const base=`<svg viewBox="0 0 640 340" preserveAspectRatio="xMidYMid meet"><defs><radialGradient id="glw" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E39B2E" stop-opacity=".55"/><stop offset="1" stop-color="#E39B2E" stop-opacity="0"/></radialGradient></defs>
<rect width="640" height="340" fill="#0F2A3A"/>${[60,100,140,180,220,260,300].map((y,i)=>`<path d="M0 ${y} C 160 ${y-20}, 300 ${y+40+i*4}, 640 ${y-60}" fill="none" stroke="#1F4659" stroke-width="1"/>`).join('')}
<path d="M0 230 C 120 200, 190 235, 280 215 S 420 170, 470 150 S 560 110, 640 70" fill="none" stroke="#3F86A8" stroke-width="7" stroke-linecap="round" opacity=".85"/>
<line x1="0" x2="640" y1="318" y2="318" stroke="#E39B2E" stroke-dasharray="6 5" stroke-width="1.2" opacity=".7"/><text x="12" y="333" fill="#C9A86B" font-size="10">Canada–U.S. border</text>
${Object.entries(T).map(([n,[x,y]])=>`<circle cx="${x}" cy="${y}" r="3" fill="#9FC3D3"/><text x="${x+6}" y="${y-6}" fill="#CFE0E6" font-size="11.5" font-weight="600">${n}</text>`).join('')}</svg>`;
  const maps={};
  document.querySelectorAll('.vmap').forEach(m=>{m.innerHTML=base;const svg=m.firstChild,lane=m.dataset.lane,g=document.createElementNS(NS,'g');svg.appendChild(g);
    const pts=(lane==='then'?then:now).map(p=>{const c=document.createElementNS(NS,'circle');c.setAttribute('cx',p.x.toFixed(1));c.setAttribute('cy',p.y.toFixed(1));c.setAttribute('r',lane==='then'?3.4:4.2);c.setAttribute('class','dot');g.appendChild(c);return {...p,el:c};});
    const extra={};
    if(lane==='now'){ // sentinel network, lab, depot, containment ring, supply route
      g.insertAdjacentHTML('afterbegin',Object.values(T).map(([x,y])=>`<g class="sent"><circle cx="${x}" cy="${y}" r="9" fill="none" stroke="#E39B2E" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="2.2" fill="#E39B2E"/></g>`).join('')+
        `<path class="route" d="M${DEPOT[0]} ${DEPOT[1]} Q 350 260 ${FARM[0]} ${FARM[1]}" fill="none" stroke="#E39B2E" stroke-width="2.4" stroke-dasharray="6 6"/>
<g class="depot"><rect x="${DEPOT[0]-11}" y="${DEPOT[1]-9}" width="22" height="18" rx="3" fill="#A8792E"/><text x="${DEPOT[0]}" y="${DEPOT[1]+24}" fill="#E8C58A" font-size="10" text-anchor="middle" font-weight="700">DEPOT</text></g>
<g class="lab"><rect x="${LAB[0]-9}" y="${LAB[1]-9}" width="18" height="18" rx="9" fill="#2F6B4F" stroke="#9FE0BF" stroke-width="1.5"/><text x="${LAB[0]+14}" y="${LAB[1]+4}" fill="#9FE0BF" font-size="10" font-weight="700">LAB</text></g>
<circle class="ring" cx="${FARM[0]}" cy="${FARM[1]}" r="34" fill="none" stroke="#5FD39A" stroke-width="2.5" stroke-dasharray="5 4"/>
<circle class="pulse-r" cx="${FARM[0]}" cy="${FARM[1]}" r="10" fill="url(#glw)"/>`);
      extra.route=g.querySelector('.route');extra.depot=g.querySelector('.depot');extra.lab=g.querySelector('.lab');extra.ring=g.querySelector('.ring');extra.pulse=g.querySelector('.pulse-r');}
    else{g.insertAdjacentHTML('afterbegin',`<circle class="haze" cx="${T.Chilliwack[0]}" cy="${T.Chilliwack[1]}" r="10" fill="#B3261E" opacity="0"/>`);extra.haze=g.querySelector('.haze');}
    maps[lane]={pts,extra};});
  const ST={then:[[0,'Undetected',2],[9,'Unexplained cluster',2],[14,'Awaiting lab results',2],[21,'Spreading in community',4],[30,'Supplies running short',4],[40,'Regional lockdown',5]],
            now:[[0,'Signal flagged',2],[1,'Confirmed: new H5 variant',3],[2,'Case isolated',3],[3,'Response chosen',3],[5,'Targeted testing',2],[9,'No community spread',1],[40,'Contained',1]]};
  const ticks=document.getElementById('simticks');
  if(ticks){const seen={};document.querySelectorAll('.sim li[data-d]').forEach(li=>{const d=+li.dataset.d,lane=li.closest('.then')?'then':'now',k=d+lane;if(seen[k])return;seen[k]=1;
    const b=document.createElement('button');b.type='button';b.className='tick '+lane;b.style.left=(d/40*100)+'%';b.title=(lane==='then'?'Without':'With')+' · Day '+d;b.setAttribute('aria-label','Jump to day '+d);
    b.onclick=()=>{stop();r.value=d;upd();};ticks.appendChild(b);});}
  const pill=[...document.querySelectorAll('.mc-pillars span')],out=document.getElementById('outcome');
  function upd(){const d=+r.value;document.getElementById('daylabel').textContent='Day '+d;r.style.setProperty('--fill',(d/40*100)+'%');
    ['then','now'].forEach(lane=>{const lis=[...document.querySelectorAll('.'+lane+' li[data-d]')];let cur=null;
      lis.forEach(li=>{const on=+li.dataset.d<=d;li.classList.toggle('shown',on);if(on)cur=li;});lis.forEach(li=>li.classList.toggle('cur',li===cur));
      const s=ST[lane].filter(x=>x[0]<=d).pop(),st=document.getElementById('st-'+lane),mt=document.getElementById('mt-'+lane);
      if(st){st.textContent=s[1];st.dataset.lv=s[2];}if(mt)mt.style.setProperty('--lv',s[2]);
      const M=maps[lane];if(!M)return;
      M.pts.forEach(p=>{const on=p.b<=d;p.el.classList.toggle('on',on);p.el.classList.toggle('ok',lane==='now'&&d>=9);});
      if(lane==='then')M.extra.haze.setAttribute('r',d<9?0:Math.min(230,(d-8)*7)),M.extra.haze.setAttribute('opacity',d<9?0:.16);
      else{const e=M.extra;e.lab.classList.toggle('on',d>=1);e.route.classList.toggle('on',d>=5);e.depot.classList.toggle('on',d>=5);e.ring.classList.toggle('on',d>=9);e.pulse.classList.toggle('on',d<9);}});
    pill.forEach(p=>p.classList.toggle('on',d>=+p.dataset.on));
    if(out)out.classList.toggle('done',d>=40);}
  // playback
  let timer=0,speed=1;const btn=document.getElementById('simplay');
  function stop(){clearInterval(timer);timer=0;if(btn){btn.classList.remove('on');btn.querySelector('span').textContent=+r.value>=40?'Replay':'Play';btn.setAttribute('aria-label','Play simulation');}}
  function play(){if(+r.value>=40)r.value=0;upd();btn.classList.add('on');btn.querySelector('span').textContent='Pause';btn.setAttribute('aria-label','Pause simulation');
    timer=setInterval(()=>{r.value=Math.min(40,+r.value+1);upd();if(+r.value>=40)stop();},420/speed);}
  if(btn)btn.onclick=()=>timer?stop():play();
  const rs=document.getElementById('simreset');if(rs)rs.onclick=()=>{stop();r.value=0;upd();btn.querySelector('span').textContent='Play';};
  document.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>{speed=+b.dataset.sp;document.querySelectorAll('[data-sp]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(timer){stop();play();}});
  r.oninput=()=>{stop();upd();};upd();}

// ===== Navigation: chapter drop-downs, mobile menu, reading progress, bar fills =====
(()=>{
const root=document.documentElement,tog=document.querySelector('.navtoggle');
if(tog)tog.addEventListener('click',()=>{const o=root.classList.toggle('nav-open');tog.setAttribute('aria-expanded',o);tog.setAttribute('aria-label',o?'Close menu':'Open menu');});
const grps=[...document.querySelectorAll('nav.main .grp')];
const close=except=>grps.forEach(g=>{if(g!==except){g.classList.remove('open');g.firstElementChild.setAttribute('aria-expanded','false');}});
grps.forEach(g=>{const b=g.firstElementChild;
  b.addEventListener('click',()=>{const o=!g.classList.contains('open');close(g);g.classList.toggle('open',o);b.setAttribute('aria-expanded',o);});
  g.addEventListener('mouseleave',()=>{g.classList.remove('open');b.setAttribute('aria-expanded','false');});});
document.addEventListener('click',e=>{if(!e.target.closest('nav.main'))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();root.classList.remove('nav-open');if(tog)tog.setAttribute('aria-expanded','false');}});
const bar=document.querySelector('.progress i');
const upd=()=>{const m=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.setProperty('--p',m>0?(scrollY/m).toFixed(4):0);};
addEventListener('scroll',upd,{passive:true});upd();
// horizontal bars grow when they scroll into view
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('fx-pre');io.unobserve(e.target);}}),{rootMargin:'0px 0px -10% 0px'});
  document.querySelectorAll('.bars').forEach(b=>{b.classList.add('fx-pre');io.observe(b);});}
})();

// ===== Evidence library: search, type filter, A–Z jump =====
(()=>{const list=document.getElementById('reflist');if(!list)return;
const q=document.getElementById('rq'),shown=document.getElementById('rshown'),none=document.querySelector('.rnone');
const cards=[...list.querySelectorAll('.rcard')],groups=[...list.querySelectorAll('.rgroup')],chips=[...document.querySelectorAll('[data-rf]')];
cards.forEach(c=>{const p=c.querySelector('.rapa');c._html=p.innerHTML;c._text=p.textContent.toLowerCase();});
let cat='all';
const escRe=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function run(){const term=q.value.trim().toLowerCase();let n=0;
  const re=term?new RegExp('('+escRe(term)+')(?![^<]*>)','gi'):null;
  cards.forEach(c=>{const ok=(cat==='all'||c.dataset.cat===cat)&&(!term||c._text.includes(term));c.hidden=!ok;if(ok)n++;
    const p=c.querySelector('.rapa');p.innerHTML=re&&ok?c._html.replace(re,'<mark>$1</mark>'):c._html;});
  groups.forEach(g=>{const vis=!!g.querySelector('.rcard:not([hidden])');g.hidden=!vis;
    const a=document.querySelector(`[data-jump="${g.dataset.letter}"]`);if(a)a.classList.toggle('off',!vis);});
  shown.textContent=n;none.hidden=n>0;
  const chip=chips.find(x=>x.dataset.rf===cat),what=document.getElementById('rwhat');
  if(what)what.innerHTML=(cat==='all'?'':'· <b style="color:'+getComputedStyle(chip).getPropertyValue('--c')+'">'+chip.childNodes[chip.childNodes.length-2].textContent.trim()+' only</b>')+(term?' · matching “'+term.replace(/</g,'&lt;')+'”':'');
  // make sure newly shown cards are visible even if their scroll-reveal hasn't fired
  cards.forEach(c=>{if(!c.hidden&&c.classList.contains('fx-reveal'))c.classList.add('in');});}
q.addEventListener('input',run);
const tools=document.querySelector('.rtools');
chips.forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.rf;chips.forEach(x=>x.setAttribute('aria-pressed',x===b));run();
  const top=list.getBoundingClientRect().top+scrollY-(tools?tools.offsetHeight:0)-90;if(scrollY>top+40||list.getBoundingClientRect().top>innerHeight*.6)scrollTo({top,behavior:'smooth'});}));
document.querySelectorAll('[data-jump]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();
  const g=list.querySelector(`[data-letter="${a.dataset.jump}"]`);if(g)g.scrollIntoView({behavior:'smooth'});}));
})();

// ===== Depth layer: 3D valley background, hero camera, tilt cards, scroll reveals =====
(()=>{
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
const ptr={x:0,y:0};
addEventListener('pointermove',e=>{ptr.x=e.clientX/innerWidth-.5;ptr.y=e.clientY/innerHeight-.5;},{passive:true});
let scrollF=0;
const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;scrollF=max>0?scrollY/max:0;};
addEventListener('scroll',onScroll,{passive:true});onScroll();

// 1. Wireframe valley flying behind every page
const cv=document.createElement('canvas');cv.id='depth-bg';cv.setAttribute('aria-hidden','true');document.body.prepend(cv);
const ctx=cv.getContext('2d');let W=0,H=0,dpr=1;
const size=()=>{dpr=Math.min(devicePixelRatio||1,1.5);W=cv.width=Math.round(innerWidth*dpr);H=cv.height=Math.round(innerHeight*dpr);};
size();
const SPAN=7,DEPTH=26,LOOP=40,INK='15,42,58',AMB='227,155,46';
const hgt=(x,z)=>{const river=Math.sin(z*.22)*1.1+Math.sin(z*.07)*1.6,d=Math.abs(x-river);
  const n=Math.sin(x*1.7+z*.9)*.18+Math.sin(x*.6-z*1.3)*.22+Math.sin(z*.45+x*2.9)*.08;
  return Math.pow(Math.max(0,d-.6),1.5)*.55*(1+n*1.5)+n*.4;};
const sites=[[-1.5,6],[1.2,11],[-.4,15],[2.2,19],[-2.4,23],[.6,27],[-1,31],[1.8,36]];
let camX=0,camY=2.6;
function draw(time){
  const small=innerWidth<700,cols=small?32:56,rows=small?32:46,dz=DEPTH/rows;
  const travel=time*.00042,base=Math.floor(travel/dz)*dz;
  camX+=(ptr.x*1.4-camX)*.04;camY+=((2.5+scrollF*1.6-ptr.y*.5)-camY)*.04;
  const f=Math.max(W,H*1.2)*.62,hx=W/2,hy=H*.4,proj=(x,y,rel)=>[hx+(x-camX)*f/rel,hy+(camY-y)*f/rel];
  ctx.clearRect(0,0,W,H);ctx.lineWidth=dpr;
  const pts=[];
  for(let i=0;i<=rows;i++){const zw=base+i*dz,rel=zw-travel+.9;if(rel<.15){pts.push(null);continue;}
    const a=Math.pow(Math.max(0,1-rel/(DEPTH+1)),1.4)*Math.pow(Math.min(1,(rel-.15)/4),1.5);
    const xs=new Float32Array(cols+1),ys=new Float32Array(cols+1);
    for(let j=0;j<=cols;j++){const x=-SPAN+j*2*SPAN/cols,p=proj(x,hgt(x,zw),rel);xs[j]=p[0];ys[j]=p[1];}
    pts.push({a,xs,ys});}
  for(let i=0;i<pts.length;i++){const p=pts[i];if(!p)continue;
    ctx.strokeStyle=`rgba(${INK},${(p.a*.16).toFixed(3)})`;ctx.beginPath();ctx.moveTo(p.xs[0],p.ys[0]);
    for(let j=1;j<=cols;j++)ctx.lineTo(p.xs[j],p.ys[j]);
    const q=pts[i+1];if(q)for(let j=0;j<=cols;j++){ctx.moveTo(p.xs[j],p.ys[j]);ctx.lineTo(q.xs[j],q.ys[j]);}
    ctx.stroke();}
  sites.forEach(([x,z],k)=>{const zw=z+Math.ceil((travel+.6-z)/LOOP)*LOOP,rel=zw-travel+.9;if(rel>DEPTH)return;
    const a=Math.pow(1-rel/(DEPTH+1),1.2)*Math.pow(Math.min(1,(rel-.6)/4),1.5);if(a<=0)return;
    const y=hgt(x,zw),g=proj(x,y,rel),tp=proj(x,y+.9,rel),r=Math.min(4*dpr,Math.max(1.2*dpr,.05*f/rel)),ph=(time*.0005+k*.37)%1;
    ctx.strokeStyle=`rgba(${AMB},${(a*.55).toFixed(3)})`;ctx.beginPath();ctx.moveTo(g[0],g[1]);ctx.lineTo(tp[0],tp[1]);ctx.stroke();
    ctx.fillStyle=`rgba(${AMB},${(a*.85).toFixed(3)})`;ctx.beginPath();ctx.arc(tp[0],tp[1],r,0,7);ctx.fill();
    ctx.strokeStyle=`rgba(${AMB},${(a*(1-ph)*.6).toFixed(3)})`;ctx.beginPath();ctx.arc(tp[0],tp[1],r*(1+ph*4),0,7);ctx.stroke();});
}

// 2. Hero map camera: smoothed pointer tilt, idle drift, tips back as you scroll past
let heroTick=null;
const m=document.querySelector('.map3d');
if(m&&!calm){const t=m.querySelector('.terrain'),cs=getComputedStyle(t);
  const rx0=parseFloat(cs.getPropertyValue('--rx'))||52,rz0=parseFloat(cs.getPropertyValue('--rz'))||-9;
  let cx=rx0,cz=rz0,tx=rx0,tz=rz0,over=false;m.classList.add('live');
  if(fine){m.addEventListener('pointermove',e=>{const r=m.getBoundingClientRect();over=true;
      tx=rx0-((e.clientY-r.top)/r.height-.5)*18;tz=rz0+((e.clientX-r.left)/r.width-.5)*24;});
    m.addEventListener('pointerleave',()=>{over=false;});}
  heroTick=time=>{const r=m.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
    if(!over){tx=rx0+Math.sin(time*.0004)*3;tz=rz0+Math.sin(time*.00025)*6;}
    const sc=Math.min(1,Math.max(0,scrollY/(r.top+scrollY+r.height)));
    cx+=(tx+sc*16-cx)*.08;cz+=(tz-cz)*.08;
    t.style.setProperty('--rx',cx.toFixed(2)+'deg');t.style.setProperty('--rz',cz.toFixed(2)+'deg');};}

if(calm){draw(8000);addEventListener('resize',()=>{size();draw(8000);});}
else{addEventListener('resize',size);const loop=time=>{draw(time);if(heroTick)heroTick(time);requestAnimationFrame(loop);};requestAnimationFrame(loop);}

// 3. Sections fold up into place as they scroll into view
if(!calm&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);el.classList.add('in');
    const done=ev=>{if(ev.target!==el||ev.propertyName!=='transform')return;el.removeEventListener('transitionend',done);el.classList.remove('fx-reveal','in');el.style.removeProperty('--rd');};
    el.addEventListener('transitionend',done);}),{rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.sec-head, .card, .pillars>div, .tablewrap, figure, .note, .quote, .banner, .flow>li, .tile, .wbs, .swot .q, .heatwrap, .trk, .memo, .doc, .steps>li, .chain, .bars, .stack, .kpis.light .kpi, .chapter, .topics li, .pyr>div, .sim .lane, .simctl, .pager a').forEach(el=>{
    if(el.closest('.phero'))return;
    const sib=[...el.parentElement.children].indexOf(el);el.style.setProperty('--rd',Math.min(sib,6)*70+'ms');
    el.classList.add('fx-reveal');io.observe(el);});}

// 4. Cards tilt toward the cursor with a moving glare
if(!calm&&fine)document.querySelectorAll('.card:not(.static), .pillars>div, .tile, .swot .q, .chapter, .kpis.light .kpi').forEach(el=>{el.classList.add('fx-tilt');
  el.addEventListener('pointermove',e=>{if(el.classList.contains('fx-reveal'))return;const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height,k=Math.min(1,340/r.width);
    el.classList.add('hot');el.style.transform=`perspective(800px) rotateX(${((.5-y)*10*k).toFixed(2)}deg) rotateY(${((x-.5)*12*k).toFixed(2)}deg) translateZ(14px)`;
    el.style.setProperty('--gx',(x*100).toFixed(1)+'%');el.style.setProperty('--gy',(y*100).toFixed(1)+'%');});
  el.addEventListener('pointerleave',()=>{el.classList.remove('hot');el.style.transform='';});});
})();
