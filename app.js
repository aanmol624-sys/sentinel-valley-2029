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
function initSim(){const r=document.getElementById('simday');const upd=()=>{const d=+r.value;document.getElementById('daylabel').textContent=d===0?'Day 0':'Day '+d;
  document.querySelectorAll('.sim li').forEach(li=>li.classList.toggle('shown',+li.dataset.d<=d));};r.oninput=upd;upd();}

// 3D valley map: gentle tilt toward the pointer (fine pointers only, respects reduced motion)
(()=>{const m=document.querySelector('.map3d');if(!m)return;const t=m.querySelector('.terrain');
 const calm=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(pointer:fine)').matches;
 if(calm||!fine)return;let raf=0;
 m.addEventListener('pointermove',e=>{const r=m.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{t.style.setProperty('--rx',(52-y*14).toFixed(2)+'deg');t.style.setProperty('--rz',(-9+x*16).toFixed(2)+'deg');});});
 m.addEventListener('pointerleave',()=>{t.style.setProperty('--rx','52deg');t.style.setProperty('--rz','-9deg');});})();
