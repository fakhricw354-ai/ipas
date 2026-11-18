const $=s=>document.querySelector(s);
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;

/* ---------- Kerangka interaktif ---------- */
const L=(a,b,c,d)=>`<path d="M${a} ${b}L${c} ${d}" class="o"/><path d="M${a} ${b}L${c} ${d}" class="i"/>`;
const HS=[
{x:110,y:36,n:"Tengkorak",t:"Melindungi otak. Tersusun atas tulang pipih yang dihubungkan sendi mati."},
{x:142,y:112,n:"Tulang rusuk",t:"12 pasang tulang rusuk melindungi jantung dan paru-paru serta membantu pernapasan."},
{x:110,y:176,n:"Tulang belakang",t:"33 ruas yang menopang tubuh dan melindungi sumsum tulang belakang. Lihat model 3D di bawah."},
{x:110,y:238,n:"Tulang panggul",t:"Menopang berat tubuh bagian atas dan melindungi organ perut bagian bawah."},
{x:170,y:125,n:"Tulang lengan",t:"Terdiri atas tulang lengan atas, hasta, dan pengumpil. Siku adalah sendi engsel."},
{x:132,y:296,n:"Tulang paha",t:"Tulang terpanjang dan terkuat. Bersendi peluru dengan tulang panggul."},
{x:134,y:336,n:"Sendi lutut",t:"Sendi engsel yang hanya bergerak satu arah, dilindungi tempurung lutut."}];
let sk="";
for(let k=0;k<6;k++){const y=92+k*13;sk+=`<path class="rib" d="M110 ${y}Q70 ${y-6} ${76+k*2} ${y+24}"/><path class="rib" d="M110 ${y}Q150 ${y-6} ${144-k*2} ${y+24}"/>`}
sk+=`<path class="sk" d="M78 208Q110 232 142 208Q156 246 126 262Q110 252 94 262Q64 246 78 208Z"/>`;
sk+=L(110,76,72,80)+L(110,76,148,80)+L(72,80,50,160)+L(50,160,38,240)+L(148,80,170,160)+L(170,160,182,240)+L(90,258,86,332)+L(86,340,86,408)+L(130,258,134,332)+L(134,340,134,408);
sk+=`<circle class="sk" cx="38" cy="248" r="7"/><circle class="sk" cx="182" cy="248" r="7"/><ellipse class="sk" cx="76" cy="414" rx="14" ry="5"/><ellipse class="sk" cx="144" cy="414" rx="14" ry="5"/>`;
[[72,80],[148,80],[50,160],[170,160],[86,336],[134,336],[90,256],[130,256]].forEach(([x,y])=>sk+=`<circle class="sk" cx="${x}" cy="${y}" r="6"/>`);
[[62,84,"#4FB3AE"],[84,152,"#8E88D6"],[152,196,"#E0A93F"],[196,216,"#D9798E"]].forEach(([a,b,c])=>sk+=`<path d="M110 ${a}V${b}" stroke="${c}" stroke-width="11" stroke-dasharray="7 2.5" fill="none"/>`);
sk+=`<ellipse class="sk" cx="110" cy="36" rx="23" ry="27"/><path class="sk" d="M98 58Q110 72 122 58"/><circle cx="101" cy="34" r="3.5" fill="#1E3340"/><circle cx="119" cy="34" r="3.5" fill="#1E3340"/>`;
HS.forEach((h,i)=>sk+=`<g class="hs" data-i="${i}" tabindex="0" role="button" aria-label="${h.n}"><circle cx="${h.x}" cy="${h.y}" r="9"/></g>`);
$("#skel").innerHTML=sk;
function showHS(i){document.querySelectorAll(".hs").forEach(g=>g.classList.toggle("on",+g.dataset.i===i));$("#hsInfo").innerHTML=`<b>${HS[i].n}</b><br>${HS[i].t}`}
document.querySelectorAll(".hs").forEach(g=>{g.onclick=()=>showHS(+g.dataset.i);g.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();showHS(+g.dataset.i)}}});

/* ---------- Otot berpasangan ---------- */
$("#armBtn").onclick=()=>{const a=$("#arm"),b=a.classList.toggle("bent");
$("#armTxt").textContent=b?"Lengan menekuk: biseps berkontraksi dan triseps relaksasi.":"Lengan lurus: biseps relaksasi dan triseps berkontraksi.";
$("#armBtn").textContent=b?"Luruskan lengan":"Tekuk lengan"};

/* ---------- Kurva tulang belakang ---------- */
const g=(t,c,w)=>Math.exp(-((t-c)**2)/(2*w*w));
function curve(t,p){
 const y=3.2-6.4*t;
 let z=0.32*Math.cos(3*Math.PI*(t-0.15))-0.8*p.k*g(t,0.48,0.14)+0.2*p.k*g(t,0.1,0.1)+0.75*p.l*g(t,0.82,0.1);
 let x=0;const u=(t-0.22)/0.62;
 if(u>0&&u<1)x=1.0*p.s*Math.sin(2*Math.PI*u)*Math.sin(Math.PI*u);
 return [x,y,z];
}
const DIS={
normal:{n:"Normal",c:"c-teal",col:"teal",p:{k:0,l:0,s:0},v:1.5708,
 h:["Bentuk","Ruas","Perawatan"],
 r:"Dari samping, tulang belakang berbentuk huruf S lembut. Lengkung ini meredam guncangan. Dari depan dan belakang, tulang belakang tampak lurus.",
 a:["Lengkung leher ke depan","Lengkung punggung ke belakang","Lengkung pinggang ke depan"],
 b:["7 ruas servikal, 12 torakal, 5 lumbal","Cakram antar ruas sebagai bantalan","Sumsum tulang belakang terlindungi"],
 c:["Jaga postur","Olahraga teratur","Cukup kalsium dan vitamin D"]},
skoliosis:{n:"Skoliosis",c:"c-lav",col:"lav",p:{k:0,l:0,s:1},v:3.1416,
 h:["Ciri-ciri","Penyebab","Penanganan"],
 r:"Tulang belakang melengkung ke samping seperti huruf C atau S jika dilihat dari belakang. Paling sering muncul pada masa remaja.",
 a:["Bahu atau pinggul tidak sama tinggi","Satu sisi tulang rusuk lebih menonjol","Badan cenderung miring ke satu sisi"],
 b:["Sebagian besar tidak diketahui (idiopatik)","Kelainan bawaan sejak lahir","Gangguan saraf atau otot"],
 c:["Pemantauan berkala","Penyangga (brace) saat masa pertumbuhan","Operasi pada kasus berat"]},
kifosis:{n:"Kifosis",c:"c-amb",col:"amb",p:{k:1,l:0,s:0},v:1.5708,
 h:["Ciri-ciri","Penyebab","Penanganan"],
 r:"Punggung atas melengkung ke belakang secara berlebihan sehingga tubuh tampak membungkuk.",
 a:["Punggung tampak bungkuk atau bulat","Kepala condong ke depan","Punggung pegal dan mudah lelah"],
 b:["Kebiasaan duduk membungkuk","Osteoporosis pada lansia","Bentuk ruas tulang yang tidak normal"],
 c:["Latihan postur dan penguat punggung","Fisioterapi","Penyangga atau operasi bila berat"]},
lordosis:{n:"Lordosis",c:"c-ros",col:"ros",p:{k:0,l:1,s:0},v:1.5708,
 h:["Ciri-ciri","Penyebab","Penanganan"],
 r:"Lengkung pinggang terlalu masuk ke dalam sehingga perut tampak maju dan bokong menonjol.",
 a:["Pinggang sangat melengkung","Perut dan bokong menonjol","Nyeri pada punggung bawah"],
 b:["Berat badan berlebih","Otot perut dan pinggul lemah","Kehamilan atau postur yang buruk"],
 c:["Peregangan dan penguatan otot inti","Menurunkan berat badan","Periksa ke dokter bila nyeri"]}
};
function thumb(key){
 const p=DIS[key].p,front=key==="skoliosis",pts=[];
 for(let i=0;i<=40;i++){const [x,y,z]=curve(i/40,p);pts.push((50+(front?x:z)*38).toFixed(1)+","+(22+(3.2-y)/6.4*150).toFixed(1))}
 return `<svg viewBox="0 0 100 190" aria-hidden="true"><circle cx="${50+(front?0:curve(0,p)[2]*38)}" cy="14" r="10" fill="var(--bone)" stroke="var(--bl)" stroke-width="2"/><polyline points="${pts.join(" ")}" fill="none" stroke="var(--${DIS[key].col})" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 2"/></svg>`;
}
const tabs=$("#tabs");
Object.keys(DIS).forEach(k=>{const b=document.createElement("button");b.className="tab "+DIS[k].c;b.role="tab";b.dataset.k=k;b.innerHTML=thumb(k)+DIS[k].n;b.onclick=()=>pick(k);tabs.appendChild(b)});

/* ---------- Model 3D ---------- */
let tgt={k:0,l:0,s:0},cur={k:0,l:0,s:0},rotT=1.5708,rot=1.5708,apply=()=>{};
function init3D(){
 const el=$("#view3d");let R;
 try{R=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){el.innerHTML='<p class="fallback">Peramban tidak mendukung model 3D. Gunakan gambar kurva pada tombol di atas.</p>';return}
 if(!window.THREE)return;
 R.setPixelRatio(Math.min(devicePixelRatio,2));el.appendChild(R.domElement);
 const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,100);cam.position.set(0,.3,13);cam.lookAt(0,.3,0);
 scene.add(new THREE.AmbientLight(0xffffff,.8));
 const d1=new THREE.DirectionalLight(0xffffff,.7);d1.position.set(3,4,6);scene.add(d1);
 const d2=new THREE.DirectionalLight(0xbfd9ff,.35);d2.position.set(-4,1,-4);scene.add(d2);
 const root=new THREE.Group();scene.add(root);
 const M=(c,o)=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.6,metalness:.05},o||{}));
 const V=[],add=(grp,t)=>{root.add(grp);V.push({o:grp,t})};
 const mesh=(geo,mat,x,y,z,s)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);if(s)m.scale.set(...s);return m};
 const N=24,cols=[0x4FB3AE,0x8E88D6,0xE0A93F];
 for(let i=0;i<N;i++){
  const t=0.02+i*0.80/(N-1),r=(i<7?0.15+i*0.005:0.2+(i-7)*0.011),col=cols[i<7?0:i<19?1:2],gr=new THREE.Group();
  gr.add(mesh(new THREE.CylinderGeometry(r,r,0.16,20),M(col),0,0,0,[1.2,1,1]));
  gr.add(mesh(new THREE.BoxGeometry(r*1.6,0.07,0.08),M(col),0,0.01,-r-0.03));
  gr.add(mesh(new THREE.BoxGeometry(r*2.4+0.3,0.04,0.07),M(col),0,0.03,-r*0.8));
  const sp=mesh(new THREE.BoxGeometry(0.05,0.1,0.22),M(col),0,-0.02,-r-0.14);sp.rotation.x=-0.3;gr.add(sp);
  if(i>=7&&i<19){const j=i-7,rr=0.42+0.38*Math.sin(Math.PI*(j+1)/13);
   const rib=new THREE.Mesh(new THREE.TorusGeometry(rr,0.022,6,24,Math.PI),M(0xEADFCB,{transparent:true,opacity:.7}));
   rib.rotation.x=Math.PI/2;rib.position.set(0,-0.03,-r*0.2);rib.scale.set(1,1,0.9);gr.add(rib)}
  add(gr,t);
  if(i<N-1){const dg=new THREE.Group();dg.add(mesh(new THREE.CylinderGeometry(r*0.92,r*0.92,0.05,20),M(0xE9C9BC,{roughness:.9}),0,0,0,[1.2,1,1]));add(dg,t+0.4/(N-1))}
 }
 const sac=new THREE.Group();
 sac.add(mesh(new THREE.CylinderGeometry(0.42,0.2,0.7,20),M(0xD9798E),0,0,0,[1.2,1,0.8]));
 [-1,1].forEach(s=>{const h=mesh(new THREE.SphereGeometry(1,18,14),M(0xEBB9C4),s*0.7,0.12,0.02,[0.38,0.62,0.3]);h.rotation.z=-s*0.3;sac.add(h)});
 add(sac,0.9);
 const co=new THREE.Group();co.add(mesh(new THREE.ConeGeometry(0.1,0.28,10),M(0xD9798E),0,0,0));co.rotation.x=Math.PI;add(co,0.98);
 const head=new THREE.Group();head.add(mesh(new THREE.SphereGeometry(0.42,24,18),M(0xEFE6D6),0,0,0,[1,1.15,1.05]));
 [-1,1].forEach(s=>head.add(mesh(new THREE.SphereGeometry(0.05,10,8),M(0x1E3340),s*0.15,0.05,0.42)));
 add(head,-0.085);
 const UP=new THREE.Vector3(0,1,0),e=0.004,tmp=new THREE.Vector3();
 apply=()=>{V.forEach(v=>{
  const p=curve(v.t,cur),a=curve(v.t-e,cur),b=curve(v.t+e,cur);
  v.o.position.set(p[0],p[1],p[2]);
  tmp.set(a[0]-b[0],a[1]-b[1],a[2]-b[2]).normalize();
  const q=new THREE.Quaternion().setFromUnitVectors(UP,tmp);
  if(v.o===co)q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI));
  v.o.quaternion.copy(q)})};
 const size=()=>{const w=el.clientWidth,h=el.clientHeight;R.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix()};
 new ResizeObserver(size).observe(el);size();
 let drag=false,lx=0;
 el.addEventListener("pointerdown",ev=>{drag=true;lx=ev.clientX;el.setPointerCapture(ev.pointerId)});
 el.addEventListener("pointermove",ev=>{if(drag){rotT+=(ev.clientX-lx)*0.012;lx=ev.clientX}});
 ["pointerup","pointercancel"].forEach(n=>el.addEventListener(n,()=>drag=false));
 (function loop(){
  for(const k in cur)cur[k]+=(tgt[k]-cur[k])*(reduce?1:0.08);
  rot+=(rotT-rot)*(reduce?1:0.1);
  root.rotation.y=rot;apply();R.render(scene,cam);requestAnimationFrame(loop)})();
}
function setView(v){rotT=v+Math.PI*2*Math.round((rot-v)/(Math.PI*2))}
document.querySelectorAll(".vb").forEach(b=>b.onclick=()=>setView(+b.dataset.v));

/* ---------- Panel informasi ---------- */
const li=a=>"<ul>"+a.map(x=>`<li>${x}</li>`).join("")+"</ul>";
function pick(k){
 const d=DIS[k];tgt={...d.p};setView(d.v);
 document.querySelectorAll(".tab").forEach(t=>t.setAttribute("aria-selected",t.dataset.k===k));
 const i=$("#info");i.className="info "+d.c;
 i.innerHTML=`<h3>${k==="normal"?"Tulang belakang normal":d.n}</h3><p>${d.r}</p><h4>${d.h[0]}</h4>${li(d.a)}<h4>${d.h[1]}</h4>${li(d.b)}<h4>${d.h[2]}</h4>${li(d.c)}`;
}
pick("normal");
init3D();
