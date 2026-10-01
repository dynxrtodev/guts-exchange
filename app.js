const DB="https://chess-bc7fa-default-rtdb.asia-southeast1.firebasedatabase.app";
const SLOT=300000;
const OWNER_NUMS=['6287841489287','6287851101531'];

const META={
  guts:{symbol:'GUTS',name:'GUTS Coin',seed:1,base:200,range:1300,vol:35,cls:'c-guts'},
  btc:{symbol:'BTC',name:'Bitcoin',seed:2,base:15000,range:20000,vol:20,cls:'c-btc'},
  eth:{symbol:'ETH',name:'Ethereum',seed:3,base:3000,range:5000,vol:25,cls:'c-eth'},
  sol:{symbol:'SOL',name:'Solana',seed:4,base:600,range:1900,vol:30,cls:'c-sol'}
};

const FX_META={
  xau:{pair:'XAU/USD',name:'Gold Spot (Emas)',seed:11,base:2610,range:95,dec:2,cls:'c-xau'},
  eur:{pair:'EUR/USD',name:'Euro / US Dollar',seed:22,base:1.0820,range:0.0280,dec:4,cls:'c-eur'},
  gbp:{pair:'GBP/JPY',name:'Great Britain Pound / Yen',seed:33,base:191.20,range:6.40,dec:2,cls:'c-gbp'},
  idr:{pair:'USD/IDR',name:'US Dollar / Rupiah',seed:44,base:15750,range:480,dec:0,cls:'c-idr'}
};

const $=id=>document.getElementById(id);
const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
const qty=n=>Number(n).toLocaleString('en-US',{maximumFractionDigits:4});

let coin='guts',tside='buy',ctype='candle',range=36,user=null,mk={},candles=[],hover=null,page='market',hist=[];
let fxPair='xau',fxSide='LONG',fxLev=25,fxMk={},fxCandles=[],fxHover=null;
let mCtrl={mult:{guts:1,btc:1,eth:1,sol:1},fxShift:{xau:0,eur:0,gbp:0,idr:0},eventName:'',expiresAt:0,startedAt:0,mode:'instant'};

function seedRand(slot,seed){const x=Math.sin(slot*999+seed*77)*10000;return x-Math.floor(x)}
function naturalEventMult(slot,seed){
  const r=seedRand(slot+33,seed*19);
  if(r<0.045)return 0.38;
  if(r>0.975)return 1.65;
  return 1.0;
}
function isCtrlActive(){
  return mCtrl&&(mCtrl.expiresAt===0||Date.now()<mCtrl.expiresAt);
}

// FUNGSI BARU: Hitung pengali berdasarkan waktu dan transisi (Instan/Perlahan)
function getAdminFactor(k, timeMs, type='crypto'){
  if(!isCtrlActive() || timeMs < mCtrl.startedAt) return type==='crypto'?1:0;
  let target = type==='crypto' ? (Number(mCtrl.mult?.[k])||1) : (Number(mCtrl.fxShift?.[k])||0);
  let base = type==='crypto'? 1 : 0;
  
  if(mCtrl.mode === 'gradual'){
    const elapsed = timeMs - mCtrl.startedAt;
    const trans = 180000; // 3 Menit transisi mulus
    if(elapsed < trans){
      const ease = 1 - Math.pow(1 - (elapsed/trans), 3); // Cubic ease-out
      return base + (target - base) * ease;
    }
  }
  return target;
}

function priceAt(k, slot, isLive=false){
  const m=META[k], p=seedRand(slot, m.seed);
  const raw=m.base+p*m.range;
  const nat=naturalEventMult(slot,m.seed);
  const timeMs = isLive ? Date.now() : ((slot + 1) * SLOT);
  const adm = getAdminFactor(k, timeMs, 'crypto');
  const tot=nat*adm;
  const price=Math.max(1,Math.floor(raw*tot));
  let chg=(p-.48)*m.vol;
  if(tot!==1)chg+=(tot-1)*100;
  return{price,change:parseFloat(chg.toFixed(2))};
}

function markets(){
  const cur=Math.floor(Date.now()/SLOT);
  for(const k in META){
    const c=priceAt(k,cur,true);let hi=c.price,lo=c.price;
    for(let i=1;i<=24;i++){const p=priceAt(k,cur-i,false).price;if(p>hi)hi=p;if(p<lo)lo=p}
    mk[k]={...META[k],price:c.price,change:c.change,high:hi,low:lo};
  }
}

function buildCandles(){
  const cur=Math.floor(Date.now()/SLOT),m=META[coin],list=[];
  for(let i=range-1;i>=0;i--){
    const s=cur-i;
    const o=priceAt(coin,s-1,false).price; // Pastikan Open menyambung persis dengan Close sebelumnya
    const c=priceAt(coin,s,i===0).price;
    const sp=Math.max(15,Math.floor(m.range*.06));
    const hi=Math.max(o,c)+Math.floor(seedRand(s+7,m.seed*3)*sp);
    const lo=Math.max(1,Math.min(o,c)-Math.floor(seedRand(s+13,m.seed*5)*sp));
    list.push({t:new Date(s*SLOT).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}),open:o,high:hi,low:lo,close:c});
  }
  candles=list;
}

function fxWaveAtSec(sec,seed){
  const trend=Math.sin(sec/300+seed*1.7)*0.38;
  const swing=Math.sin(sec/45+seed*3.1)*0.25;
  const spike=Math.pow(Math.sin(sec/18+seed*5.3),3)*0.22;
  const tick=Math.sin(sec/2+seed*11.7)*0.08;
  const rawNoise=Math.sin(sec*12.9898+seed*78.233)*43758.5453;
  const jitter=((rawNoise-Math.floor(rawNoise))-0.5)*0.07;
  return(trend+swing+spike+tick+jitter+1)/2;
}

function fxPriceAtSec(k, sec){
  const m=FX_META[k];
  const timeMs = sec * 1000;
  const shift = getAdminFactor(k, timeMs, 'forex');
  const w=fxWaveAtSec(sec,m.seed);
  let raw=(m.base+w*m.range)*(1+(shift/100));
  raw=Math.max(m.base*0.2,raw);
  return Number(raw.toFixed(m.dec));
}

function computeForexMarkets(){
  const nowSec=Math.floor(Date.now()/1000);
  for(const k in FX_META){
    const m=FX_META[k];
    const curP=fxPriceAtSec(k,nowSec);
    const refP=fxPriceAtSec(k,nowSec-300);
    const chg=(((curP-refP)/refP)*100).toFixed(2);
    let hi=curP,lo=curP;
    for(let i=1;i<=60;i++){
      const p=fxPriceAtSec(k,nowSec-i*15);
      if(p>hi)hi=p;if(p<lo)lo=p;
    }
    fxMk[k]={...m,price:curP,change:parseFloat(chg),high:hi,low:lo};
  }
}

function buildFxCandles(){
  const CANDLE_SEC=15;
  const nowSec=Math.floor(Date.now()/1000);
  const curBucket=Math.floor(nowSec/CANDLE_SEC);
  const m=FX_META[fxPair],list=[];

  for(let i=35;i>=0;i--){
    const b=curBucket-i;
    const startSec=b*CANDLE_SEC;
    const endSec=(i===0)?nowSec:((b+1)*CANDLE_SEC);

    const open=fxPriceAtSec(fxPair,startSec);
    const close=fxPriceAtSec(fxPair,endSec);
    let hi=Math.max(open,close),lo=Math.min(open,close);

    for(let s=startSec+1;s<=endSec;s+=2){
      const p=fxPriceAtSec(fxPair,s);
      if(p>hi)hi=p;if(p<lo)lo=p;
    }
    list.push({
      t:new Date(startSec*1000).toLocaleTimeString('id-ID',{minute:'2-digit',second:'2-digit'}),
      open,high:hi,low:lo,close
    });
  }
  fxCandles=list;
}

function calcFxPos(pos,curPrice){
  const entry=Number(pos.entryPrice),margin=Number(pos.margin),lev=Number(pos.leverage),dir=pos.side==='LONG'?1:-1;
  const diff=((curPrice-entry)/entry)*dir;
  const roe=diff*lev*100;
  const pnl=Math.floor(margin*(roe/100));
  const eq=Math.max(0,margin+pnl);
  const liq=pos.side==='LONG'?entry*(1-(0.95/lev)):entry*(1+(0.95/lev));
  return{pnl,roe:Number(roe.toFixed(2)),equity:eq,liq};
}

async function fetchMarketControl(){
  try{
    const r=await fetch(`${DB}/wa_users/_market_control.json`);
    const d=await r.json();
    if(d&&typeof d==='object'){
      mCtrl={
        mult:d.mult||{guts:1,btc:1,eth:1,sol:1},
        fxShift:d.fxShift||{xau:0,eur:0,gbp:0,idr:0},
        eventName:d.eventName||'',
        expiresAt:Number(d.expiresAt)||0,
        startedAt:Number(d.startedAt)||0,
        mode:d.mode||'instant'
      };
    }
  }catch(_){}
}

const PAD={t:24,b:24,r:66,l:10};
function drawGenericCanvas(canvasEl,dataArr,modeType,hoverObj,fmtFn,activePosList=[]){
  if(!dataArr.length)return;
  const dpr=window.devicePixelRatio||1,r=canvasEl.getBoundingClientRect();
  if(!r.width||!r.height)return;
  canvasEl.width=r.width*dpr;canvasEl.height=r.height*dpr;
  const c=canvasEl.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);
  const W=r.width,H=r.height,cw=W-PAD.l-PAD.r,ch=H-PAD.t-PAD.b;
  let mx=Math.max(...dataArr.map(x=>x.high)),mn=Math.min(...dataArr.map(x=>x.low));
  if(mx===mn){mx+=1;mn-=1}
  const Y=p=>PAD.t+ch-((p-mn)/(mx-mn))*ch,step=cw/dataArr.length;
  c.font='10.5px "JetBrains Mono",monospace';c.lineWidth=1;
  for(let i=0;i<=4;i++){
    const y=PAD.t+ch/4*i;
    c.strokeStyle='rgba(35,46,69,.8)';c.beginPath();c.moveTo(PAD.l,y);c.lineTo(W-PAD.r,y);c.stroke();
    c.fillStyle='#5b6785';c.textAlign='left';c.fillText(fmtFn(mx-(mx-mn)/4*i),W-PAD.r+5,y+4);
  }
  if(modeType==='area'){
    c.beginPath();
    dataArr.forEach((d,i)=>{const x=PAD.l+i*step+step/2;i?c.lineTo(x,Y(d.close)):c.moveTo(x,Y(d.close))});
    c.strokeStyle='#5ab8ff';c.lineWidth=2.3;c.stroke();
    const g=c.createLinearGradient(0,PAD.t,0,PAD.t+ch);
    g.addColorStop(0,'rgba(90,184,255,.3)');g.addColorStop(1,'rgba(90,184,255,0)');
    c.lineTo(PAD.l+(dataArr.length-1)*step+step/2,PAD.t+ch);c.lineTo(PAD.l+step/2,PAD.t+ch);c.closePath();c.fillStyle=g;c.fill();
  }else{
    const bw=Math.max(3,Math.min(15,step*.62));
    dataArr.forEach((d,i)=>{
      const x=PAD.l+i*step+step/2,col=d.close>=d.open?'#22c58b':'#f0506e';
      c.strokeStyle=col;c.lineWidth=1.3;c.beginPath();c.moveTo(x,Y(d.high));c.lineTo(x,Y(d.low));c.stroke();
      const a=Y(d.open),b=Y(d.close);c.fillStyle=col;c.fillRect(x-bw/2,Math.min(a,b),bw,Math.max(2.5,Math.abs(b-a)));
    });
  }

  activePosList.forEach(pos=>{
    const ey=Y(pos.entryPrice);
    if(ey>=PAD.t&&ey<=PAD.t+ch){
      c.save();
      c.setLineDash([6,3]);
      c.strokeStyle=pos.side==='LONG'?'#22c58b':'#f0506e';
      c.lineWidth=1.5;
      c.beginPath();c.moveTo(PAD.l,ey);c.lineTo(W-PAD.r,ey);c.stroke();
      c.fillStyle=pos.side==='LONG'?'#22c58b':'#f0506e';
      c.textAlign='left';
      c.fillText(`${pos.side} ${pos.leverage}x @ ${fmtFn(pos.entryPrice)}`,PAD.l+6,ey-5);
      c.restore();
    }
  });

  const ly=Y(dataArr[dataArr.length-1].close);
  c.save();c.setLineDash([4,4]);c.strokeStyle='#f5b342';c.lineWidth=1;c.beginPath();c.moveTo(PAD.l,ly);c.lineTo(W-PAD.r,ly);c.stroke();c.restore();
  c.fillStyle='#5b6785';c.textAlign='center';
  const every=Math.ceil(dataArr.length/6);
  for(let i=0;i<dataArr.length;i+=every)c.fillText(dataArr[i].t,PAD.l+i*step+step/2,H-7);
  if(hoverObj){
    c.save();c.setLineDash([3,3]);c.strokeStyle='rgba(238,242,248,.4)';c.beginPath();c.moveTo(hoverObj.x,PAD.t);c.lineTo(hoverObj.x,PAD.t+ch);c.stroke();c.restore();
  }
}

function draw(){
  if(page==='trade')drawGenericCanvas($('cv'),candles,ctype,hover,fmt);
  if(page==='forex'){
    const dec=FX_META[fxPair].dec;
    const myPairPos=(user?.forexPositions||[]).filter(p=>p.pairKey===fxPair);
    drawGenericCanvas($('fxCv'),fxCandles,'candle',fxHover,v=>Number(v).toFixed(dec),myPairPos);
  }
}

const cv=$('cv'),fxCv=$('fxCv');
cv.addEventListener('pointermove',e=>{
  const r=cv.getBoundingClientRect(),step=(r.width-PAD.l-PAD.r)/candles.length;
  const i=Math.floor((e.clientX-r.left-PAD.l)/step);
  if(i<0||i>=candles.length)return;
  const c=candles[i];hover={x:PAD.l+i*step+step/2};
  $('hv').innerHTML=`${c.t} O:${fmt(c.open)} H:<b style="color:var(--up)">${fmt(c.high)}</b> L:<b style="color:var(--dn)">${fmt(c.low)}</b> C:${fmt(c.close)}`;
  draw();
});
fxCv.addEventListener('pointermove',e=>{
  const r=fxCv.getBoundingClientRect(),step=(r.width-PAD.l-PAD.r)/fxCandles.length;
  const i=Math.floor((e.clientX-r.left-PAD.l)/step);
  if(i<0||i>=fxCandles.length)return;
  const c=fxCandles[i];fxHover={x:PAD.l+i*step+step/2};
  $('fxHv').innerHTML=`${c.t} O:${c.open} H:<b style="color:var(--up)">${c.high}</b> L:<b style="color:var(--dn)">${c.low}</b> C:${c.close}`;
  draw();
});
window.addEventListener('resize',draw);

function icons(){if(window.lucide)lucide.createIcons()}

function render(){
  markets();buildCandles();
  computeForexMarkets();buildFxCandles();

  const money=user?.money||0;
  let cryptoVal=0,fxEquityVal=0,active=0;
  const vals={};
  for(const k in mk){const b=user?.crypto?.[k]||0;vals[k]=Math.floor(b*mk[k].price);cryptoVal+=vals[k];if(b>0)active++}
  if(user?.forexPositions?.length){
    user.forexPositions.forEach(p=>{
      const curP=fxMk[p.pairKey]?.price||p.entryPrice;
      fxEquityVal+=calcFxPos(p,curP).equity;
    });
  }
  const net=money+cryptoVal+fxEquityVal;

  const bnr=$('evBanner');
  if(isCtrlActive()&&mCtrl.eventName){
    bnr.style.display='flex';
    $('evBannerTxt').textContent=`${mCtrl.eventName}`;
    $('evBannerTime').textContent=mCtrl.expiresAt?`Sisa ${Math.max(1,Math.ceil((mCtrl.expiresAt-Date.now())/60000))}m`:'AKTIF';
    $('admEventTitle').textContent=mCtrl.eventName;
  }else{
    bnr.style.display='none';
    $('admEventTitle').textContent='NORMAL MARKET';
  }

  $('mList').innerHTML=Object.entries(mk).map(([k,v])=>{
    const up=v.change>=0,b=user?.crypto?.[k]||0;
    return `<button class="coin ${k===coin?'on':''}" onclick="pick('${k}',true)">
      <div class="cl"><div class="ci ${v.cls}">${v.symbol[0]}</div><div><div class="cn">${v.symbol}</div><div class="cs mono">${user?qty(b)+' '+v.symbol:v.name}</div></div></div>
      <div class="cr mono"><div class="cp">${fmt(v.price)}</div><span class="pc ${up?'u':'d'}">${up?'+':''}${v.change}%</span></div></button>`;
  }).join('');

  $('fxMarketList').innerHTML=Object.entries(fxMk).map(([k,v])=>{
    const up=v.change>=0;
    return `<button class="coin ${k===fxPair?'on':''}" onclick="pickFx('${k}',true)">
      <div class="cl"><div class="ci ${v.cls}">${v.pair.slice(0,3)}</div><div><div class="cn">${v.pair}</div><div class="cs">${v.name}</div></div></div>
      <div class="cr mono"><div class="cp">${v.price.toFixed(v.dec)}</div><span class="pc ${up?'u':'d'}">${up?'+':''}${v.change}%</span></div></button>`;
  }).join('');

  $('heroNet').textContent=fmt(net);$('heroSub').textContent=user?`Cash ${fmt(money)} • Crypto ${fmt(cryptoVal)} • Forex ${fmt(fxEquityVal)}`:'Masuk dengan Secret Key untuk trading';

  $('tChips').innerHTML=Object.entries(mk).map(([k,v])=>`<button class="chip ${k===coin?'on':''}" onclick="pick('${k}')">${v.symbol}</button>`).join('');
  $('rChips').innerHTML=[12,36,72].map(n=>`<button class="chip ${n===range?'on':''}" onclick="setRange(${n})">${n}</button>`).join('');
  const a=mk[coin],up=a.change>=0;
  $('pName').textContent=`${a.symbol} / USD`;$('pFull').textContent=a.name;
  const pe=$('pPrice');pe.textContent=fmt(a.price);pe.style.color=up?'var(--up)':'var(--dn)';
  const ce=$('pChg');ce.textContent=`${up?'+':''}${a.change}%`;ce.className=`pc mono ${up?'u':'d'}`;
  $('mHi').textContent=fmt(a.high);$('mLo').textContent=fmt(a.low);
  $('tBadge').textContent=a.symbol;$('iPrice').value=fmt(a.price);$('iSuf').textContent=a.symbol;$('sUnit').textContent=fmt(a.price);
  const bal=user?.crypto?.[coin]||0;
  $('lAvail').textContent=tside==='buy'?`Saldo: ${fmt(money)}`:`Milikmu: ${qty(bal)} ${a.symbol}`;
  $('goTxt').textContent=`${tside==='buy'?'Beli':'Jual'} ${a.symbol}`;

  $('fxChips').innerHTML=Object.entries(fxMk).map(([k,v])=>`<button class="chip ${k===fxPair?'on':''}" onclick="pickFx('${k}')">${v.pair}</button>`).join('');
  const f=fxMk[fxPair],fUp=f.change>=0;
  $('fxPairTitle').textContent=f.pair;$('fxPairSub').textContent=f.name;
  const fpe=$('fxPairPrice');fpe.textContent=f.price.toFixed(f.dec);fpe.style.color=fUp?'var(--up)':'var(--dn)';
  const fce=$('fxPairChg');fce.textContent=`${fUp?'+':''}${f.change}%`;fce.className=`pc mono ${fUp?'u':'d'}`;
  $('fxHi').textContent=f.high.toFixed(f.dec);$('fxLo').textContent=f.low.toFixed(f.dec);$('fxCashAvail').textContent=`Saldo: ${fmt(money)}`;
  updateFxSummary();
  renderForexPositions();

  $('pfNet').textContent=fmt(net);$('pfCash').textContent=fmt(money);$('pfCrypto').textContent=fmt(cryptoVal+fxEquityVal);$('pfCnt').textContent=`${active} koin spot & ${user?.forexPositions?.length||0} posisi forex`;
  $('pfBody').innerHTML=Object.entries(mk).map(([k,v])=>{
    const b=user?.crypto?.[k]||0;
    return `<tr><td><b>${v.symbol}</b></td><td>${qty(b)}</td><td style="color:${vals[k]>0?'var(--up)':'var(--mut)'};font-weight:700">${fmt(vals[k])}</td>
      <td style="text-align:right"><button class="chip" onclick="quickSell('${k}')">Jual</button></td></tr>`;
  }).join('');

  renderHist();sumUp();icons();draw();
}

function pickFx(k,open){fxPair=k;render();if(open)go('forex')}
function setFxSide(s){
  fxSide=s;
  $('fxBtnLong').classList.toggle('on',s==='LONG');
  $('fxBtnShort').classList.toggle('on',s==='SHORT');$('fxSubmitBtn').className='go '+(s==='LONG'?'buy':'sell');
  updateFxSummary();
}
function setFxLev(l){
  fxLev=l;
  [5,10,25,50,100].forEach(n=>$('lev'+n).classList.toggle('on',n===l));
  const mcDist=(95/l).toFixed(2);
  $('fxLevLabel').textContent=`${l}x (Jarak MC -${mcDist}%)`;
  updateFxSummary();
}
function fillFxMargin(pct){
  if(!user){toast('Masuk dengan Secret Key dulu','err');go('account');return}
  $('fxMarginInp').value=Math.floor(user.money*pct);
  updateFxSummary();
}
function updateFxSummary(){
  const f=fxMk[fxPair];if(!f)return;
  const margin=parseInt($('fxMarginInp').value)||0;
  const liq=fxSide==='LONG'?f.price*(1-(0.95/fxLev)):f.price*(1+(0.95/fxLev));
  $('fxFormBadge').textContent=`${f.pair} ${fxLev}x`;
  $('fxSumEntry').textContent=f.price.toFixed(f.dec);$('fxSumSize').textContent=fmt(margin*fxLev);
  $('fxSumLiq').textContent=liq.toFixed(f.dec);$('fxSubmitTxt').textContent=`OPEN ${fxSide} ${f.pair} (${fxLev}x)`;
}

function renderForexPositions(){
  const box=$('fxPositionsList'),cntEl=$('fxPosCount'),closeAllBtn=$('btnCloseAllFx');
  const list=user?.forexPositions||[];
  cntEl.textContent=list.length;
  closeAllBtn.style.display=list.length>1?'inline-flex':'none';

  if(!user){box.innerHTML='<div class="empty">Masuk dengan Secret Key untuk membuka posisi Forex</div>';return}
  if(!list.length){box.innerHTML='<div class="empty">Belum ada posisi Forex terbuka</div>';return}

  box.innerHTML=list.map((p,idx)=>{
    const f=fxMk[p.pairKey]||{price:p.entryPrice,dec:2};
    const st=calcFxPos(p,f.price);
    const isWin=st.pnl>=0;
    return `<div class="pos-card">
      <div class="pos-top">
        <div>
          <span class="${p.side==='LONG'?'badge-long':'badge-short'}">${p.side} ${p.leverage}x</span>
          <b style="margin-left:6px;font-size:.92rem">${p.pair}</b>
        </div>
        <b class="mono" style="color:var(--${isWin?'up':'dn'});font-size:.95rem">
          ${isWin?'+':'-'}${fmt(Math.abs(st.pnl))} (${isWin?'+':''}${st.roe}%)
        </b>
      </div>
      <div class="pos-grid mono">
        <div>Margin Modal<b>${fmt(p.margin)}</b></div>
        <div>Entry → Mark<b>${Number(p.entryPrice).toFixed(f.dec)} → ${f.price.toFixed(f.dec)}</b></div>
        <div><i data-lucide="skull"></i>Harga MC<b style="color:var(--dn)">${st.liq.toFixed(f.dec)}</b></div>
      </div>
      <button class="go ${isWin?'buy':'sell'}" style="padding:9px;font-size:.8rem" onclick="closeForexPos(${idx})">
        Tutup Posisi & Cairkan ${fmt(st.equity)}
      </button>
    </div>`;
  }).join('');
}

async function openForexPosition(){
  if(!user){toast('Masuk dengan Secret Key dulu','err');go('account');return}
  user=await fetchUser(user.secretKey);
  if(!Array.isArray(user.forexPositions))user.forexPositions=[];
  if(user.forexPositions.length>=5)return toast('Maksimal 5 posisi Forex aktif sekaligus!','err');

  const margin=parseInt($('fxMarginInp').value);
  if(!margin||margin<10000)return toast('Minimal Margin Modal adalah $10,000!','err');
  if(user.money<margin)return toast(`Saldo Cash kurang! Butuh ${fmt(margin)}`,'err');

  await fetchMarketControl();computeForexMarkets();
  const f=fxMk[fxPair];
  const tp=parseFloat($('fxTpInp').value)||null;
  const sl=parseFloat($('fxSlInp').value)||null;
  const liq=fxSide==='LONG'?Number((f.price*(1-(0.95/fxLev))).toFixed(f.dec)):Number((f.price*(1+(0.95/fxLev))).toFixed(f.dec));

  const newPos={
    id:'FX'+Date.now().toString(36).toUpperCase(),
    pairKey:fxPair,
    pair:f.pair,
    side:fxSide,
    margin,
    leverage:fxLev,
    entryPrice:f.price,
    liqPrice:liq,
    tp,
    sl,
    openedAt:Date.now()
  };

  user.money-=margin;
  user.forexPositions.push(newPos);
  await syncToFirebase();
  $('fxMarginInp').value='';$('fxTpInp').value='';$('fxSlInp').value='';
  render();
  toast(`Posisi ${fxSide} ${f.pair} (${fxLev}x) dibuka!`,'ok');
}

async function closeForexPos(idx){
  if(!user||!user.forexPositions?.[idx])return;
  computeForexMarkets();
  const pos=user.forexPositions[idx];
  const f=fxMk[pos.pairKey]||{price:pos.entryPrice};
  const st=calcFxPos(pos,f.price);

  user.forexPositions.splice(idx,1);
  user.money+=st.equity;
  hist.unshift({side:st.pnl>=0?'PROFIT FX':'LOSS FX',sym:`${pos.pair} ${pos.leverage}x`,amt:1,price:f.price,total:st.equity,at:Date.now()});
  saveHist();
  await syncToFirebase();
  render();
  toast(`Posisi ditutup! Cair ${fmt(st.equity)} (${st.roe}%)`,'ok');
}

async function closeAllForexPositions(){
  if(!user||!user.forexPositions?.length)return;
  computeForexMarkets();
  let totEq=0;
  user.forexPositions.forEach(pos=>{
    const f=fxMk[pos.pairKey]||{price:pos.entryPrice};
    totEq+=calcFxPos(pos,f.price).equity;
  });
  user.forexPositions=[];
  user.money+=totEq;
  await syncToFirebase();
  render();
  toast(`Semua posisi ditutup! Total cair ${fmt(totEq)}`,'ok');
}

async function syncToFirebase(){
  const nowTs=Date.now();
  const payload={
    money:user.money,
    crypto:user.crypto,
    forexPositions:user.forexPositions||[],
    jid:user.jid,
    updatedAt:nowTs,
    webUpdatedAt:nowTs
  };
  const r=await fetch(`${DB}/wa_users/${user.number}.json`,{
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload)
  });
  if(!r.ok)throw new Error('Gagal menyinkronkan ke server');
}

function renderHist(){
  const el=$('hList');
  if(!user){el.innerHTML='<div class="empty">Masuk dulu untuk melihat riwayat</div>';return}
  if(!hist.length){el.innerHTML='<div class="empty">Belum ada transaksi</div>';return}
  el.innerHTML=hist.map(h=>{
    const buy=h.side==='BUY'||h.side==='LOSS FX';
    return `<div class="hr"><div class="hl"><div class="hi ${buy?'d':'u'}"><i data-lucide="activity"></i></div>
      <div><div class="hn">${h.side} ${h.sym}</div><div class="hs mono">@ ${h.price} &middot; ${new Date(h.at).toLocaleTimeString('id-ID')}</div></div></div>
      <b class="mono" style="color:var(--${buy?'dn':'up'})">${fmt(h.total)}</b></div>`;
  }).join('');
}
function loadHist(){hist=[];if(!user)return;try{hist=JSON.parse(localStorage.getItem('guts_hist_'+user.number)||'[]')}catch(_){}}
function saveHist(){try{localStorage.setItem('guts_hist_'+user.number,JSON.stringify(hist.slice(0,100)))}catch(_){}}
function clearHist(){if(!user)return;hist=[];saveHist();renderHist();toast('Riwayat dihapus','ok')}

function go(p){
  if(p==='admin'&&!user?.isAdmin)return toast('Khusus Owner Bot!','err');
  page=p;
  document.querySelectorAll('.page').forEach(s=>s.classList.toggle('on',s.id==='p-'+p));
  document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('on',b.dataset.p===p));
  history.replaceState(null,'','#'+p);
  window.scrollTo(0,0);
  if(p==='trade'||p==='forex')requestAnimationFrame(draw);
}
document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>go(b.dataset.p));

function pick(k,open){coin=k;$('iAmt').value='';render();if(open)go('trade')}
function quickSell(k){coin=k;tside='sell';syncSide();render();fill(1);go('trade')}
function setType(t){ctype=t;$('bCandle').classList.toggle('on',t==='candle');$('bArea').classList.toggle('on',t==='area');draw()}
function setRange(n){range=n;render()}
function syncSide(){$('sBuy').classList.toggle('on',tside==='buy');$('sSell').classList.toggle('on',tside==='sell');$('goBtn').className='go '+tside}
function side(s){tside=s;$('iAmt').value='';syncSide();render()}
function fill(p){
  if(!user){toast('Masuk dengan Secret Key dulu','err');go('account');return}
  const price=mk[coin].price;
  if(tside==='buy'){
    const m=user.money*p/price;
    $('iAmt').value=m>=1?Math.floor(m*100)/100:Number(m.toFixed(4));
  }else{
    const b=user.crypto[coin]||0;
    $('iAmt').value=p===1?b:Number((b*p).toFixed(4));
  }
  sumUp();
}
function sumUp(){
  const a=parseFloat($('iAmt').value)||0,p=mk[coin]?.price||0;
  $('sTot').textContent=fmt(tside==='buy'?Math.ceil(a*p):Math.floor(a*p));
}

function applyPreset(title,mults,fxShifts,isReset=false){
  $('mGuts').value=mults.guts;$('lblMguts').textContent=mults.guts+'x';$('mBtc').value=mults.btc;$('lblMbtc').textContent=mults.btc+'x';$('mEth').value=mults.eth;$('lblMeth').textContent=mults.eth+'x';$('mSol').value=mults.sol;$('lblMsol').textContent=mults.sol+'x';$('fxS_xau').value=fxShifts.xau;$('lblFxXau').textContent=fxShifts.xau+'\%';$('fxS_eur').value=fxShifts.eur;$('lblFxEur').textContent=fxShifts.eur+'\%';$('fxS_gbp').value=fxShifts.gbp;$('lblFxGbp').textContent=fxShifts.gbp+'\%';$('fxS_idr').value=fxShifts.idr;$('lblFxIdr').textContent=fxShifts.idr+'\%';$('admTitle').value=title;
  saveMarketControl(!isReset);
}

async function saveMarketControl(withBroadcast){
  if(!user?.isAdmin)return toast('Akses ditolak!','err');
  const mult={
    guts:Math.max(0.01,parseFloat($('mGuts').value)||1),
    btc:Math.max(0.01,parseFloat($('mBtc').value)||1),
    eth:Math.max(0.01,parseFloat($('mEth').value)||1),
    sol:Math.max(0.01,parseFloat($('mSol').value)||1)
  };
  const fxShift={
    xau:parseFloat($('fxS_xau').value)||0,
    eur:parseFloat($('fxS_eur').value)||0,
    gbp:parseFloat($('fxS_gbp').value)||0,
    idr:parseFloat($('fxS_idr').value)||0
  };
  const durMs=parseInt($('admDur').value)||0;
  const expiresAt=durMs>0?(Date.now()+durMs):0;
  const eventName=$('admTitle').value.trim();
  const customMsg=$('admMsg').value.trim();
  const mode=$('admMode')?$('admMode').value:'gradual'; // Baca opsi Instan/Perlahan

  const payload={
    mult,
    fxShift,
    eventName,
    customMsg,
    expiresAt,
    startedAt: Date.now(), // Simpan waktu pas diklik buat bikin jejak/transisi
    mode,
    updatedAt:Date.now(),
    ...(withBroadcast?{broadcastId:Date.now()}:{})
  };
  try{
    const r=await fetch(`${DB}/wa_users/_market_control.json`,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    });
    if(!r.ok)throw new Error('Gagal menyimpan ke Firebase');
    await fetchMarketControl();render();
    toast(withBroadcast?'Manipulasi aktif & diumumkan ke Grup WA!':'Manipulasi pasar diterapkan!','ok');
  }catch(e){toast(e.message,'err')}
}

async function triggerTaxRaid(){
  if(!user?.isAdmin)return toast('Akses ditolak!','err');
  const rate=Math.min(40,Math.max(1,parseInt($('admTaxRate').value)||10));
  try{
    await fetch(`${DB}/wa_users/_market_control.json`,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({taxRaidId:Date.now(),taxRaidRate:rate})
    });
    toast(`Sidak Pajak ${rate}% dikirim ke Bot WA!`,'ok');
  }catch(e){toast(e.message,'err')}
}

async function fetchUser(key){
  await fetchMarketControl();
  const kr=await fetch(`${DB}/secret_keys/${encodeURIComponent(key)}.json`);
  const kd=await kr.json();
  if(!kd||!kd.number)throw new Error('Secret Key tidak ditemukan. Ketik .secretkey di DM bot WA.');
  const ur=await fetch(`${DB}/wa_users/${kd.number}.json`);
  const ud=await ur.json();
  if(!ud)throw new Error('Data pengguna belum tersinkron');
  const c=ud.crypto||{};
  const isAdmin=Boolean(ud.isAdmin)||OWNER_NUMS.includes(String(kd.number));
  return{
    number:kd.number,
    jid:ud.jid||`${kd.number}@s.whatsapp.net`,
    username:ud.username||kd.number,
    ppUrl:ud.ppUrl||'https://telegra.ph/file/24fa902ead26340f3df2c.png',
    isAdmin,
    money:Number(ud.money)||0,
    crypto:{guts:Number(c.guts)||0,btc:Number(c.btc)||0,eth:Number(c.eth)||0,sol:Number(c.sol)||0},
    forexPositions:Array.isArray(ud.forexPositions)?ud.forexPositions:[],
    secretKey:key
  };
}
function applyUser(){
  const u=user;
  $('avTop').src=$('avBig').src=u?u.ppUrl:'https://telegra.ph/file/24fa902ead26340f3df2c.png';
  $('aName').textContent=u?u.username:'Belum masuk';
  $('aPhone').textContent=u?'+'+u.number+(u.isAdmin?' (OWNER BANDAR)':''):'Mode tamu';
  $('outBtn').style.display=u?'flex':'none';
  const admBtn=$('navAdminBtn'),nav=$('bottomNav');
  if(u?.isAdmin){admBtn.style.display='grid';nav.classList.add('admin-mode')}
  else{admBtn.style.display='none';nav.classList.remove('admin-mode')}
  loadHist();render();
}
async function login(){
  const key=$('iKey').value.trim().toUpperCase();
  if(!key.startsWith('GUTS-'))return toast('Format tidak valid','err');
  const b=$('loginBtn');b.disabled=true;
  try{
    user=await fetchUser(key);
    try{localStorage.setItem('guts_crypto_secretkey',key)}catch(_){}
    applyUser();toast(`Terhubung sebagai ${user.username}`,'ok');go(user.isAdmin?'admin':'market');
  }catch(e){toast(e.message,'err')}
  b.disabled=false;
}
async function refresh(manual){
  await fetchMarketControl();
  let key=user?.secretKey;
  if(!key){try{key=localStorage.getItem('guts_crypto_secretkey')}catch(_){}}
  if(!key){render();return}
  try{
    user=await fetchUser(key);applyUser();
    if(manual)toast('Data tersinkron','ok');
  }catch(e){if(manual)toast(e.message,'err')}
}
function logout(){
  try{localStorage.removeItem('guts_crypto_secretkey')}catch(_){}
  user=null;hist=[];$('iKey').value='';applyUser();go('market');toast('Berhasil keluar','ok');
}

async function trade(){
  if(!user){toast('Masuk dengan Secret Key dulu','err');go('account');return}
  const amt=parseFloat($('iAmt').value);
  if(!amt||amt<=0)return toast('Masukkan jumlah koin valid','err');
  user=await fetchUser(user.secretKey);
  markets();
  const m=mk[coin],btn=$('goBtn'),snap={money:user.money,crypto:{...user.crypto}};
  btn.disabled=true;
  try{
    let total;
    if(tside==='buy'){
      total=Math.ceil(amt*m.price);
      if(user.money<total)throw new Error(`Saldo kurang. Butuh ${fmt(total)}`);
      user.money-=total;
      user.crypto[coin]=Number(((user.crypto[coin]||0)+amt).toFixed(4));
    }else{
      const bal=user.crypto[coin]||0;
      if(bal<amt)throw new Error(`${m.symbol} kurang`);
      total=Math.floor(amt*m.price);
      user.crypto[coin]=Number((bal-amt).toFixed(4));
      user.money+=total;
    }
    await syncToFirebase();
    hist.unshift({side:tside==='buy'?'BUY':'SELL',sym:m.symbol,amt,price:m.price,total,at:Date.now()});
    saveHist();$('iAmt').value='';render();
    toast(`Berhasil ${tside==='buy'?'membeli':'menjual'} ${qty(amt)} ${m.symbol}`,'ok');
  }catch(e){user.money=snap.money;user.crypto=snap.crypto;render();toast(e.message,'err')}
  btn.disabled=false;
}

let tt;
function toast(msg,type){
  const t=$('toast');
  t.className='toast show '+(type||'');
  t.innerHTML=`<span>${msg}</span>`;
  clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),3400);
}

let lastSlot=Math.floor(Date.now()/SLOT);
setInterval(()=>{
  const rem=SLOT-(Date.now()%SLOT);
  const fxRem=15-(Math.floor(Date.now()/1000)%15);
  $('cd').textContent=String(Math.floor(rem/60000)).padStart(2,'0')+':'+String(Math.floor(rem%60000/1000)).padStart(2,'0');
  $('fxCd').textContent=fxRem+'s';$('fxTimerBadge').textContent=`Live Tick 1s • Candle Baru: ${fxRem}s`;

  const s=Math.floor(Date.now()/SLOT);
  if(s!==lastSlot){lastSlot=s;render();return}

  computeForexMarkets();
  buildFxCandles();
  if(page==='forex'||page==='market'){
    const f=fxMk[fxPair],fUp=f.change>=0;
    const fpe=$('fxPairPrice');fpe.textContent=f.price.toFixed(f.dec);fpe.style.color=fUp?'var(--up)':'var(--dn)';
    const fce=$('fxPairChg');fce.textContent=`${fUp?'+':''}${f.change}%`;fce.className=`pc mono ${fUp?'u':'d'}`;
    $('fxHi').textContent=f.high.toFixed(f.dec);$('fxLo').textContent=f.low.toFixed(f.dec);
    updateFxSummary();
    renderForexPositions();
    draw();
  }
},1000);
setInterval(()=>{if(!document.hidden)refresh(false)},10000);

window.addEventListener('DOMContentLoaded',async()=>{
  await fetchMarketControl();
  const h=location.hash.slice(1);
  if(['market','trade','forex','portfolio','account','admin'].includes(h))go(h);
  render();
  let k=null;
  try{k=localStorage.getItem('guts_crypto_secretkey')}catch(_){}
  if(k){$('iKey').value=k;refresh(false)}
});
(function(){
const HK='guts_admin_hidden';
const hidden=()=>{try{return localStorage.getItem(HK)==='1'}catch(_){return false}};
const setHidden=v=>{try{localStorage.setItem(HK,v?'1':'0')}catch(_){}};
const nav=$('bottomNav'),adm=$('navAdminBtn');

function admVis(){
  const on=Boolean(user&&user.isAdmin),show=on&&!hidden();
  adm.style.display=show?'grid':'none';
  nav.classList.toggle('admin-mode',show);
  const box=$('admSwitchBox');
  box.style.display=on?'block':'none';
  $('admSwitch').classList.toggle('on',!hidden());$('admSwitch').setAttribute('aria-checked',String(!hidden()));
  if(!show&&page==='admin')go('market');
}
const _au=applyUser;
applyUser=function(){_au.apply(this,arguments);admVis()};

const box=document.createElement('div');
box.className='box';box.id='admSwitchBox';box.style.display='none';
box.innerHTML='<div class="ttl"><span><i data-lucide="crown"></i>Tombol Bandar</span></div><div class="swrow"><div><b>Tampilkan di navigasi</b><small>Tekan tahan tombol Whale 2 detik untuk menyembunyikannya</small></div><button class="sw on" id="admSwitch" role="switch" aria-label="Tampilkan tombol Bandar"><i></i></button></div>';
$('p-account').appendChild(box);$('admSwitch').onclick=()=>{setHidden(!hidden());admVis()};

const sheet=document.createElement('div');
sheet.className='sheet';
sheet.innerHTML='<div class="sheet-bd"></div><div class="sheet-card" role="dialog" aria-modal="true"><div class="sheet-ic"><i data-lucide="eye-off"></i></div><b>Sembunyikan tombol Whale?</b><p>Tombol akan hilang dari navigasi. Untuk memunculkan lagi, ketuk logo GutS di kiri atas 5 kali, atau nyalakan saklar di menu Akun.</p><button class="go gold" id="shHide"><i data-lucide="eye-off"></i>Sembunyikan</button><button class="go ghost" id="shCancel">Batal</button></div>';
document.body.appendChild(sheet);
const close=()=>sheet.classList.remove('open');
$('shCancel').onclick=close;
sheet.querySelector('.sheet-bd').onclick=close;
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
$('shHide').onclick=()=>{
  setHidden(true);close();admVis();
  toast('Tombol Whale disembunyikan. Ketuk logo 5 kali untuk memunculkan lagi','ok');
};

let tm,supp=false;
const stop=()=>{clearTimeout(tm);adm.classList.remove('pressing')};
adm.addEventListener('pointerdown',e=>{
  if(e.button>0)return;
  supp=false;adm.classList.add('pressing');
  tm=setTimeout(()=>{
    adm.classList.remove('pressing');supp=true;
    if(navigator.vibrate)navigator.vibrate(35);
    sheet.classList.add('open');
  },2000);
});
['pointerup','pointerleave','pointercancel'].forEach(t=>adm.addEventListener(t,stop));
adm.addEventListener('contextmenu',e=>e.preventDefault());
adm.addEventListener('click',e=>{if(supp){supp=false;e.stopImmediatePropagation();e.preventDefault()}},true);

let taps=0,tapT;
document.querySelector('.brand').addEventListener('click',()=>{
  taps++;clearTimeout(tapT);tapT=setTimeout(()=>{taps=0},2500);
  if(taps>=5){
    taps=0;
    if(user&&user.isAdmin&&hidden()){
      setHidden(false);admVis();
      if(navigator.vibrate)navigator.vibrate([20,40,20]);
      toast('Tombol Whale ditampilkan kembali','ok');
    }
  }
});

function spark(k){
  const cur=Math.floor(Date.now()/SLOT),pts=[];
  for(let i=23;i>=1;i--)pts.push(priceAt(k,cur-i,false).price);
  pts.push(priceAt(k,cur,true).price);
  const mn=Math.min(...pts),d=(Math.max(...pts)-mn)||1;
  const p=pts.map((v,i)=>(i/23*64).toFixed(1)+','+(22-(v-mn)/d*20).toFixed(1)).join(' ');
  const c=pts[23]>=pts[0]?'#22c58b':'#f0506e';
  return '<svg class="spark" viewBox="0 0 64 24" width="64" height="24" aria-hidden="true"><polyline points="'+p+'" fill="none" stroke="'+c+'" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>';
}
function sparks(){
  document.querySelectorAll('#mList .coin').forEach(b=>{
    const m=/pick\('(\w+)'/.exec(b.getAttribute('onclick')||'');
    const r=b.querySelector('.cr');
    if(m&&r&&!b.querySelector('.spark'))r.insertAdjacentHTML('beforebegin',spark(m[1]));
  });
}
const _r=render;
render=function(){_r.apply(this,arguments);sparks()};
sparks();

const mo=new MutationObserver(list=>list.forEach(r=>countUp(r.target)));
function countUp(el){
  const to=parseFloat(el.textContent.replace(/[^0-9.-]/g,''));
  if(!isFinite(to))return;
  const from=el._v===undefined?to:el._v;
  cancelAnimationFrame(el._r);
  if(from===to){el._v=to;return}
  const t0=performance.now();
  const step=t=>{
    const k=Math.min(1,(t-t0)/650),v=from+(to-from)*(1-Math.pow(1-k,3));
    el._v=v;el.textContent=fmt(v);mo.takeRecords();
    if(k<1)el._r=requestAnimationFrame(step);else el._v=to;
  };
  el._r=requestAnimationFrame(step);
}
['heroNet','pfNet','pfCash','pfCrypto'].forEach(id=>mo.observe($(id),{childList:true}));

document.addEventListener('pointerdown',e=>{
  const b=e.target.closest('.go,.chip,.coin,.nav button,.pcts button,.pcts5 button,.seg button');
  if(!b||b.disabled)return;
  const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*1.4,i=document.createElement('span');
  i.className='rip';
  i.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';
  b.appendChild(i);setTimeout(()=>i.remove(),600);
});

const top=document.querySelector('.top');
addEventListener('scroll',()=>top.classList.toggle('scrolled',scrollY>4),{passive:true});
icons();admVis();
})();
