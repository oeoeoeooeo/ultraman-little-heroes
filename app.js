'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const main = $('#main');
const ICONS = {
  planet:'<circle cx="12" cy="12" r="7"/><path d="M5 8C-3 12 4 20 17 14S24 5 18 7"/>',
  hero:'<path d="M12 2 21 6v7c0 5-9 9-9 9S3 18 3 13V6Z"/><path d="m6 9 4 2-1 3-3-2Zm12 0-4 2 1 3 3-2ZM10 17h4M12 3v5"/>',
  medal:'<circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8m-4-8 1 2 2 .5-1.5 1.5.3 2-1.8-1-1.8 1 .3-2L9 8.5l2-.5Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back:'<path d="M19 12H5m6-6-6 6 6 6"/>',
  sound:'<path d="M11 4 6 8H3v8h3l5 4Zm4 4c2 2 2 6 0 8m3-11c4 4 4 10 0 14"/>',
  mute:'<path d="M11 4 6 8H3v8h3l5 4Zm5 5 5 6m0-6-5 6"/>',
  expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-11v1"/>',
  heart:'<path d="M12 21 3 12C-3 5 7-2 12 6c5-8 15-1 9 6Z"/>',
  sparkle:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Zm7 0 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  play:'<path d="m8 4 12 8-12 8Z"/>',
  keyboard:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M6 9h.1m4 0h.1m4 0h.1m4 0h.1M6 12h.1m4 0h.1m4 0h.1m4 0h.1M7 16h10"/>'
};
function icon(name){return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.sparkle}</svg>`;}
$$('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
$('#fullscreen-button').innerHTML = icon('expand');

const HEROES = [
  {id:'ultraman',name:'初代超人力霸王',short:'初代',en:'ULTRAMAN',color:'#edf0df',device:'貝塔膠囊',hint:'我是紅色與銀色的英雄，胸口有藍色的彩色計時器。',fact:'來自 M78 星雲的光之國，為了守護地球，和早田一起奮戰。',move:'斯派修姆光線'},
  {id:'seven',name:'超人七號',short:'七號',en:'ULTRASEVEN',color:'#f3e8de',device:'超人力霸王之眼',hint:'我全身紅紅的，頭上有一把可以飛出去的頭鏢！',fact:'愛護地球生命的紅色英雄。額頭能發出光線，頭上還有厲害的頭鏢！',move:'艾梅利姆光線'},
  {id:'tiga',name:'超人力霸王迪卡',short:'迪卡',en:'ULTRAMAN TIGA',color:'#eae5f2',device:'閃光劍',hint:'我有紅色、紫色和銀色，還能變成三種型態！',fact:'從超古代甦醒的光之巨人，可以切換複合型、力量型與天空型。',move:'哉佩利敖光線'},
  {id:'zero',name:'超人力霸王傑洛',short:'傑洛',en:'ULTRAMAN ZERO',color:'#e2edf1',device:'傑洛之眼',hint:'我是七號的兒子，頭上有兩把帥氣的頭鏢！',fact:'超人七號的兒子。跟雷歐學過宇宙拳法，擅長快速的戰鬥。',move:'廣域傑洛射線'},
  {id:'z',name:'超人力霸王傑特',short:'傑特',en:'ULTRAMAN Z',color:'#e1eeee',device:'Z 昇華器',hint:'我很崇拜傑洛師父，我的名字是一個英文字母 Z！',fact:'充滿熱情的新手英雄，把傑洛當成師父，努力守護和平。',move:'傑斯帝姆光線'},
  {id:'mebius',name:'超人力霸王梅比斯',short:'梅比斯',en:'ULTRAMAN MEBIUS',color:'#f3e7d9',device:'梅比斯氣息',hint:'我的變身器戴在手腕上，我的名字叫梅比斯！',fact:'和 GUYS 隊員一起守護地球，從彼此的友情中獲得力量。',move:'梅比姆射線'}
];
const FORMS = [
  {id:'multi',name:'複合型',color:'#916eb2',second:'#d76c6e',hint:'紅色加紫色，力量和速度都很棒！',description:'平衡力量與速度的迪卡。'},
  {id:'power',name:'力量型',color:'#cf5e62',second:'#cf5e62',hint:'全身紅紅的，力氣變得更大了！',description:'擅長強大力量的紅色迪卡。'},
  {id:'sky',name:'天空型',color:'#8a80c5',second:'#8a80c5',hint:'全身紫紫的，飛行和速度最拿手！',description:'擅長速度與空中戰的紫色迪卡。'}
];
const BADGES = [
  {id:'first',name:'勇氣的第一步',emoji:'🌱',description:'完成任何一個小任務',goal:1},
  {id:'quiz',name:'英雄小博士',emoji:'🏅',description:'完成一次猜猜我是誰',goal:1},
  {id:'forms',name:'型態觀察家',emoji:'🌈',description:'完成一次型態猜猜看',goal:1},
  {id:'device',name:'變身器達人',emoji:'⚡',description:'完成一次變身器猜謎',goal:1},
  {id:'battle',name:'地球守護者',emoji:'🛡️',description:'完成一次怪獸對戰',goal:1},
  {id:'coop',name:'宇宙最佳拍檔',emoji:'🏆',description:'兄弟一起完成合作任務',goal:1},
  {id:'memory',name:'超強記憶力',emoji:'🧩',description:'完成一次翻牌配對',goal:1},
  {id:'stars',name:'閃閃發光的你',emoji:'🌟',description:'累積獲得 50 顆星星',goal:50},
  {id:'explorer',name:'光之國探險家',emoji:'🚀',description:'完成全部六種任務',goal:6}
];
const GAMES = [
  {id:'quiz',title:'猜猜我是誰',copy:'看看英雄的模樣，你認得他嗎？',tag:'觀察小任務',meta:'認識英雄 · 動動小腦袋',bg:'#dcece5',tagColor:'#6d9382'},
  {id:'forms',title:'型態猜猜看',copy:'顏色變了！找出超人的新力量。',tag:'眼力大挑戰',meta:'型態變化 · 發現超能力',bg:'#e8e5f1',tagColor:'#9a84b4'},
  {id:'device',title:'這是誰的變身器？',copy:'神奇的道具，藏著變身的秘密！',tag:'變身小專家',meta:'認識道具 · 配對找答案',bg:'#f3e9ce',tagColor:'#b8a063'},
  {id:'battle',title:'變身！怪獸對戰',copy:'選擇你的英雄，勇敢守護地球！',tag:'勇氣出任務',meta:'單人冒險 · 鍵盤也能玩',bg:'#f2e1d6',tagColor:'#c18c70'},
  {id:'coop',title:'兄弟合體出任務',copy:'一人一份力量，合作就是最強！',tag:'兩個人更好玩',meta:'雙人合作 · 一起發射光線',bg:'#dde9cf',tagColor:'#8c9f6b'},
  {id:'memory',title:'英雄翻翻樂',copy:'翻開小卡片，找出變身好搭檔。',tag:'記憶力練習',meta:'翻牌配對 · 慢慢想沒關係',bg:'#dceae6',tagColor:'#7a9d91'}
];
let saved = {};
try { saved = JSON.parse(localStorage.getItem('ultra-base-v1') || '{}') || {}; } catch {}
const state = {
  player: ['little','big','together'].includes(saved.player) ? saved.player : 'little',
  sound: saved.sound !== false,
  stars: Number.isFinite(Number(saved.stars)) ? Math.min(999999,Math.max(0,Math.floor(Number(saved.stars)))) : 0,
  completed: Object.fromEntries(GAMES.map(g=>[g.id,Number.isFinite(Number(saved.completed?.[g.id]))?Math.min(999999,Math.max(0,Math.floor(Number(saved.completed[g.id])))):0])),
  page:'home', game:null, token:0, timers:new Set(), toastTimer:null, audio:null
};
function save(){try{localStorage.setItem('ultra-base-v1',JSON.stringify({player:state.player,sound:state.sound,stars:state.stars,completed:state.completed}));}catch{}}
function hasBadge(id){if(id==='first')return Object.values(state.completed).some(n=>n>0);if(id==='stars')return state.stars>=50;if(id==='explorer')return GAMES.every(g=>state.completed[g.id]>0);return state.completed[id]>0;}
function updateChrome(){
  $('#star-total').textContent = state.stars;
  $('#badge-count').textContent = BADGES.filter(b=>hasBadge(b.id)).length;
  $('#sound-button').innerHTML = icon(state.sound?'sound':'mute');
  $('#sound-button').setAttribute('aria-label',state.sound?'關閉聲音':'開啟聲音');
  $('#sound-button').setAttribute('aria-pressed',String(state.sound));
  $$('.nav-item').forEach(el=>{el.classList.toggle('active',el.dataset.nav===state.page);el.setAttribute('aria-current',el.dataset.nav===state.page?'page':'false');});
}
function later(fn,ms){const token=state.token;const timer=setTimeout(()=>{state.timers.delete(timer);if(token===state.token)fn();},ms);state.timers.add(timer);return timer;}
function leave(){state.token++;state.timers.forEach(clearTimeout);state.timers.clear();if('speechSynthesis'in window)speechSynthesis.cancel();state.game=null;}
function navigate(page,focus=true){
  leave();state.page=page;updateChrome();
  $('#breadcrumb-text').textContent = page==='home'?'今天，也一起閃閃發光！':page==='heroes'?'認識一起守護地球的朋友':'每一份勇氣，都值得收藏';
  if(page==='heroes')renderHeroes();else if(page==='badges')renderBadges();else renderHome();
  if(focus){window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});}
}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function heroImage(h, cls='', alt=true){return `<img class="${cls}" src="assets/${h.id}.png" alt="${alt?h.name:''}" draggable="false">`;}
function city(){return `<div class="city" aria-hidden="true"><svg viewBox="0 0 900 140" preserveAspectRatio="none"><g fill="currentColor"><path d="M0 100h32V64h44v76H0Zm64 40V88h24V51h26v89Zm44 0V70h41v70Zm35 0V30h19V15h4v15h20v110Zm35 0V86h45v54Zm38 0V60h33v80Zm28 0V88h38v52Zm33 0V44h44v96Zm35 0V75h28v65Zm22 0V53h48v87Zm40 0V12h10V0h3v12h16v128Zm22 0V69h44v71Zm38 0V50h31v90Zm24 0V82h48v58Zm40 0V37h38v103Zm32 0V60h30v80Zm23 0V18h13V5h5v13h17v122Zm28 0V66h34v74Zm27 0V42h48v98Zm40 0V76h37v64Zm30 0V30h31v110Zm23 0V94h41v46Zm35 0V57h31v83Zm26 0V81h39v59Zm31 0V65h32v75Zm25 0V91h34v49Z"/></g><path d="M20 86h8m12-9h8m29 27h9m12-37h8m56-21h8m-8 16h8m112 7h10m-10 14h10m73 0h10m65-11h9m93-16h8m-8 14h8m80-26h8m54 17h9m-9 13h9m73-27h9m-9 15h9" stroke="#f5f8df" stroke-width="5"/></svg></div>`;}
function formFigure(form,cls='form-picture'){
  return `<svg class="${cls}" viewBox="0 0 150 240" aria-label="迪卡${form.name}示意圖" role="img"><defs><linearGradient id="silver-${form.id}" x1="0" x2="1"><stop stop-color="#b8c7c5"/><stop offset=".5" stop-color="#f9fcf6"/><stop offset="1" stop-color="#b1c1be"/></linearGradient></defs><g stroke="#627d7844" stroke-width="1.1"><path d="m52 125-11 89 20 3 14-76 14 76 20-3-11-89" fill="${form.color}"/><path d="m45 185-4 29-8 14q-1 7 23 3l6-16 6-28m17 0 5 28 6 16q24 4 23-3l-9-14-5-29" fill="url(#silver-${form.id})"/><path d="M47 63Q75 49 103 63l8 38-13 39H52l-13-39Z" fill="${form.color}"/><path d="m75 73 28-10-8 24-20 13-20-13-8-24Z" fill="#ded3a1"/><path d="m75 81 26-17-6 13-20 14-20-14-6-13Z" fill="#f4f4df"/><path d="m75 100 20-13-9 42 12 11H52l12-11-9-42Z" fill="url(#silver-${form.id})"/><path d="M47 63Q34 58 28 81l-9 47 13 4 15-33m56-36q13-5 19 18l9 47-13 4-15-33" fill="${form.second}"/><path d="m22 110-5 22q-4 15 8 14l9-14 6-20m70 0 7 20 9 14q12 1 8-14l-5-22" fill="url(#silver-${form.id})"/><path d="M52 28Q53 7 75 9q22-2 23 19l-4 22-19 17-19-17Z" fill="url(#silver-${form.id})"/><path d="m67 16 8-15 8 15-8 24Z" fill="#e9ddad"/><path d="m56 30 15 7-5 10-11-5Zm38 0-15 7 5 10 11-5Z" fill="#fff1b0"/><path d="m70 54 5 2 5-2-2 5h-6Z" fill="#809a94"/><circle cx="75" cy="81" r="6" fill="#77cbd4" stroke="#faf6d0" stroke-width="3"/></g></svg>`;
}
function devicePicture(hero,cls='device-picture'){
  const id=hero.id;
  let drawing='';
  if(id==='ultraman')drawing='<rect x="64" y="35" width="32" height="151" rx="14" fill="#c4d1ce"/><rect x="61" y="25" width="38" height="45" rx="15" fill="#f48365"/><path d="M70 83h20v65H70Z" fill="#e8eee5"/><path d="M75 84h10v65H75Z" fill="#ecbb65"/><path d="M65 164h30v8H65" fill="#6e8e83"/><circle cx="80" cy="49" r="9" fill="#fff3ba"/>';
  else if(id==='seven'||id==='zero')drawing=`<path d="m22 69 58 17 58-17-9 41-49 13-49-13Z" fill="${id==='zero'?'#638caa':'#d2695a'}"/><path d="m28 72 51 15 53-15-10 28-42 13-42-13Z" fill="#d3ded8"/><path d="m38 79 34 10-7 15-25-8Zm84 0-34 10 7 15 25-8Z" fill="${id==='zero'?'#d0eaba':'#edc371'}"/><path d="M74 86h12v29H74Z" fill="#71988e"/>${id==='zero'?'<path d="M29 72 40 37l22 44m67-9-9-35-24 44" fill="#dce4df"/>':''}<path d="m81 117-9 12 18 41 15-6Z" fill="${id==='zero'?'#648fab':'#cf6c60'}"/>`;
  else if(id==='tiga')drawing='<path d="M69 94h22v93H69Z" fill="#d4ded7"/><path d="M74 103h12v64H74Z" fill="#9a7e99"/><path d="M80 22 48 55l-8 56 28-15 12-28 12 28 28 15-8-56Z" fill="#d9b25f"/><path d="m80 30-23 30-8 33 19-13 12-31 12 31 19 13-8-33Z" fill="#e9dfaa"/><path d="m80 47-8 33 8 23 8-23Z" fill="#b2e3d6"/><path d="M65 178h30v10q-15 10-30 0Z" fill="#d3aa57"/>';
  else if(id==='z')drawing='<path d="M38 38 123 62l-15 25-34-8-8 109-28-4 11-111-20-9Z" fill="#6f8f9c"/><path d="m46 42 73 23-10 11-51-9-6 16-14-6Z" fill="#d9e3dd"/><path d="m57 94 42 7-4 45-45-7Z" fill="#8bc9d1"/><circle cx="69" cy="121" r="14" fill="#d4e8da"/><path d="m62 112 15 2-18 17 16 2" stroke="#7097a9" stroke-width="4" fill="none"/><path d="m45 162 20 4-2 16-19-3Z" fill="#b3d7c5"/>';
  else drawing='<path d="m42 77 76 8-10 66-73-10Z" fill="#be735e"/><path d="m41 90 76 4-6 42-73-3Z" fill="#d9bd74"/><path d="m40 99 71 3-3 23-69-1Z" fill="#8d6276"/><path d="M81 35 55 75l9 35 14 20 15-23 8-31Z" fill="#debd63"/><path d="m80 49-14 29 11 34 13-31Z" fill="#b6e6d7"/><path d="m80 56-5 26 4 19 6-20Z" fill="#e5f9d8"/>';
  return `<svg class="${cls}" viewBox="0 0 160 210" role="img" aria-label="${hero.device}示意圖"><g stroke="#56776b33" stroke-width="1.5" stroke-linejoin="round">${drawing}</g><path d="m23 27 3 9 9 3-9 3-3 9-3-9-9-3 9-3Zm109 119 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#f5d584"/></svg>`;
}
function monster(cls='monster-picture',variant=0){
  const brown=variant===0?'#a88d6a':variant===1?'#9394ad':'#6b8580';
  return `<svg class="${cls}" viewBox="0 0 220 245" role="img" aria-label="${['哥摩拉','訓練怪獸小紫','訓練怪獸小綠'][variant]}插畫"><g stroke="#566c5755" stroke-width="2" stroke-linejoin="round"><path d="M139 171q68-9 64-56 27 65-39 93l-29-4" fill="${brown}"/><path d="M68 140Q42 156 24 148l-5 17q33 23 63-1m64-26q26 17 45 9l5 16q-31 22-59 4" fill="${brown}"/><path d="m72 183-13 39-13 6q-7 10 24 8l18-33m46-20 12 39 17 6q7 10-25 8l-20-33" fill="${brown}"/><path d="M67 105Q45 133 60 180q14 42 57 34 49 1 51-46 6-41-27-66Z" fill="${brown}"/><ellipse cx="113" cy="164" rx="35" ry="47" fill="#d5bd94"/><path d="m67 77-14-49 34 22q25-12 49 0l34-22-14 49q15 34-13 48-31 17-61 0-31-13-15-48Z" fill="${brown}"/><path d="m58 40 10 30 13-14m81-16-11 30-13-14" fill="#eee4c8"/><path d="m105 78 8-30 10 32" fill="#e8d9ad"/><path d="m77 80 22 9m47-9-22 9" stroke="#6e715a" stroke-width="5"/><ellipse cx="91" cy="91" rx="5" ry="7" fill="#fff5b6"/><ellipse cx="133" cy="91" rx="5" ry="7" fill="#fff5b6"/><circle cx="92" cy="93" r="2.4" fill="#3c5850"/><circle cx="132" cy="93" r="2.4" fill="#3c5850"/><path d="M97 110q16 11 31 0" fill="none" stroke="#685f4e" stroke-width="3"/><path d="m85 143 26 8 27-8m-29 8v57m-26-50 26 8 30-8m-55 17 26 8 28-8m-50 17 22 6 25-6" fill="none" stroke="#b49972"/><path d="m163 166 7 7-8 7m-4 5 6 7-9 5" fill="#eee0b9"/></g></svg>`;
}
function cardArt(game){
  if(game.id==='quiz')return heroImage(HEROES[0],'card-hero',false)+'<span class="question-bubble">?</span>';
  if(game.id==='forms')return FORMS.map(f=>formFigure(f,'form-figure')).join('');
  if(game.id==='device')return devicePicture(HEROES[2],'art-device');
  if(game.id==='battle')return heroImage(HEROES[2],'card-hero',false)+monster('art-monster')+'<span class="vs">VS</span>';
  if(game.id==='coop')return heroImage(HEROES[3],'card-hero',false)+heroImage(HEROES[4],'card-hero second',false);
  return '<div class="mini-memory"><span>✦</span><span>?</span></div>';
}
function cardTitle(game){return game.id==='device'?'這是誰的<span class="keep-word">變身器？</span>':game.title;}
function renderHome(){
  main.innerHTML=`<section class="page-intro"><div><p class="eyebrow">WELCOME TO THE LAND OF LIGHT</p><h1>小英雄，歡迎回來！<span>👋</span></h1><p class="intro-sub">今天想和超人力霸王，一起展開什麼冒險呢？</p></div><div class="today">${icon('sun')} 每一天都是冒險日</div></section>
  <section class="hero-banner" aria-label="一起守護地球"><div class="hero-copy"><span class="pill">${icon('sparkle')} 專屬你們的宇宙冒險</span><h2>小小英雄，<br><em>大大冒險！</em></h2><p>猜猜英雄、發現力量，再一起變身。<br>光之國的下一位小英雄，就是你！</p><button class="primary" data-action="start" data-game="coop">${icon('play')} 一起變身，出任務！ ${icon('arrow')}</button></div><div class="hero-art" aria-hidden="true"><div class="hero-disk"></div><div class="orbit"></div>${heroImage(HEROES[2],'tiga',false)}${heroImage(HEROES[3],'zero',false)}<span class="floating-label"><b>✦</b> 勇氣 + 合作 = 無限力量</span><span class="art-star s1">✧</span><span class="art-star s2">✦</span><span class="art-star s3">✧</span></div>${city()}<span class="banner-corner">LET'S SHINE TOGETHER ✦</span></section>
  <section class="player-strip" aria-label="選擇玩家模式"><div class="strip-label">今天誰來玩？<span>選一個適合你的模式</span></div><div class="player-options">${[
    ['little','👦🏻','弟弟模式','4 歲・圖片提示多一點'],['big','🧑🏻','哥哥模式','6 歲・挑戰多一點'],['together','🤝','兄弟一起','雙人・合作最好玩']
  ].map(([id,face,title,sub])=>`<button class="player-button ${state.player===id?'selected':''}" data-action="player" data-player="${id}" aria-pressed="${state.player===id}"><span class="player-face">${face}</span><span><b>${title}</b><small>${sub}</small></span><span class="check-dot">✓</span></button>`).join('')}</div></section>
  <section aria-labelledby="game-heading"><div class="section-title"><h2 id="game-heading">選一個小冒險 <small>每一次嘗試，都會更厲害一點</small></h2><button class="text-button" data-action="help">怎麼玩？ ${icon('info')}</button></div><div class="game-grid">${GAMES.map((g,i)=>`<button class="game-card" data-action="start" data-game="${g.id}" style="--card-bg:${g.bg};--tag-color:${g.tagColor}" aria-label="${g.title}，${g.copy}"><div class="card-art"><span class="card-tag">${g.id==='coop'?'✦ ':''}${g.tag}</span><span class="card-number">0${i+1}</span>${cardArt(g)}</div><div class="card-detail"><h3>${cardTitle(g)}</h3><p>${g.copy}</p><div class="card-bottom"><span>${g.meta}</span>${icon('arrow')}</div></div></button>`).join('')}</div></section>
  <p class="welcome-note">${icon('heart')} 不用比快，也不怕答錯。勇敢試試看，就是最棒的小英雄！</p>`;
}
function screenHead(title,copy,tag=''){return `<div class="screen-head"><button class="back-button" data-action="home" aria-label="回冒險大廳">${icon('back')}</button><div><h1>${title}</h1><p>${copy}</p></div>${tag?`<span class="round-tag">${tag}</span>`:''}</div>`;}
function renderHeroes(){main.innerHTML=screenHead('英雄圖鑑','認識英雄、變身器和他們的光之力量。','6 位光之夥伴')+`<div class="hero-library">${HEROES.map(h=>`<article class="library-card"><div class="library-image" style="--hero-bg:${h.color}">${heroImage(h)}</div><h2>${h.short}</h2><span class="english-name">${h.en}</span><p>${h.fact}<br><b>變身器：</b>${h.device}<br><b>必殺技：</b>${h.move}</p><button class="read-button" data-action="read-hero" data-id="${h.id}">${icon('sound')} 聽聽英雄的故事</button></article>`).join('')}</div>`;}
function renderBadges(){main.innerHTML=screenHead('我的小成就','每一份勇氣，都會變成一顆閃亮的星星。')+`<div class="star-summary"><span>★</span><div><strong>${state.stars} <small style="font-size:14px">顆冒險星星</small></strong><p>已收集 ${BADGES.filter(b=>hasBadge(b.id)).length} / ${BADGES.length} 枚徽章，一起慢慢收集吧！</p></div></div><div class="badge-grid">${BADGES.map(b=>`<article class="achievement ${hasBadge(b.id)?'earned':'locked'}"><div class="medal">${b.emoji}</div><h2>${b.name}</h2><p>${b.description}</p><span class="status-label">${hasBadge(b.id)?'✓ 已獲得・你好棒！':'等待你的冒險'}</span></article>`).join('')}</div><p class="badge-help">星星與徽章會保存在這個瀏覽器裡，不用登入。</p>`;}
function startGame(mode){
  leave();state.page='home';updateChrome();window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});
  $('#breadcrumb-text').textContent=GAMES.find(g=>g.id===mode).title;
  if(['quiz','forms','device'].includes(mode))startQuiz(mode);else if(mode==='memory')startMemory();else startSelection(mode==='coop');
}
function startQuiz(mode){
  const pool = mode==='forms'?FORMS:HEROES;
  const deck = shuffle(pool);
  while(deck.length<5)deck.push(...shuffle(pool));
  state.game={type:'quiz',mode,deck:deck.slice(0,5),index:0,answered:false,options:[],stars:0};
  nextQuiz();
}
function nextQuiz(){
  const g=state.game;if(!g||g.type!=='quiz')return;
  if(g.index>=5){finish(g.mode,10,'五顆勇氣，五次小小進步！','你已經完成 5 道題目。每次觀察，都讓你更認識英雄。');return;}
  g.answered=false;
  const q=g.deck[g.index], easy=state.player!=='big',pool=g.mode==='forms'?FORMS:HEROES;
  g.options=shuffle([q,...shuffle(pool.filter(x=>x.id!==q.id)).slice(0,(easy||g.mode==='forms')?2:3)]);
  const title=g.mode==='quiz'?'這位光之英雄是誰呢？':g.mode==='forms'?'迪卡變成了哪一種型態？':'這個變身器，可以變成誰？';
  const visual=g.mode==='quiz'?heroImage(q):g.mode==='forms'?formFigure(q):devicePicture(q);
  main.innerHTML=screenHead(GAMES.find(x=>x.id===g.mode).title,'慢慢看、慢慢想，答錯也可以再試一次。',`${easy?'暖身':'進階'}挑戰 · ${g.index+1} / 5`)+`<section class="panel center"><div class="quiz-progress" aria-label="第 ${g.index+1} 題，共 5 題">${Array.from({length:5},(_,i)=>`<span class="${i<g.index?'done':i===g.index?'current':''}"></span>`).join('')}</div><h2 class="question-title">${title}</h2><div class="question-visual">${visual}</div><p class="quiz-hint">✦ ${easy?(g.mode==='device'?`小提示：${q.hint}`:q.hint):'仔細看看顏色和形狀，你一定找得到！'}</p><div class="quiz-options ${g.options.length===4?'four':''}">${g.options.map((o,i)=>`<button class="answer" data-action="answer" data-index="${i}"><span class="key-hint">${i+1}</span>${easy&&g.mode!=='forms'?heroImage(o):''}<span>${g.mode==='forms'?o.name:o.short}</span></button>`).join('')}</div><div class="feedback" id="feedback" role="status" aria-live="polite"></div><div class="quiz-toolbar"><span>${iconInlineKeyboard()} 也可以按數字 1～${g.options.length} 選答案</span><button class="read-button" data-action="read-question">${icon('sound')} 聽聽題目</button></div></section>`;
  if(easy)speakQuestion();
}
function iconInlineKeyboard(){return '⌨';}
function speakQuestion(){const g=state.game;if(!g||g.type!=='quiz')return;const q=g.deck[g.index];speak(`${g.mode==='quiz'?'這位英雄是誰呢？':g.mode==='forms'?'迪卡變成了哪一種型態？':`這是${q.device}，可以變成誰呢？`}${state.player!=='big'?q.hint:''}。${g.options.map((o,i)=>`第${i+1}個，${g.mode==='forms'?o.name:o.short}`).join('。')}`);}
function answer(index){
  const g=state.game;if(!g||g.type!=='quiz'||g.answered)return;const q=g.deck[g.index],o=g.options[index];if(!o)return;
  const btn=$$('[data-action="answer"]')[index];
  if(o.id!==q.id){btn.classList.add('wrong');$('#feedback').textContent='很接近了，再仔細看看！你可以的。';tone('try');speak('再仔細看看，你可以的！');return;}
  g.answered=true;btn.classList.remove('wrong');btn.classList.add('correct');$$('[data-action="answer"]').forEach(b=>b.disabled=true);g.stars++;
  $('#feedback').innerHTML=`<span>✦ 答對了！${g.mode==='forms'?q.description:`這是${q.name}！`}</span><button class="primary" data-action="next-question">${g.index===4?'領取星星':'下一題'} ${icon('arrow')}</button>`;
  tone('success');speak(`答對了！${g.mode==='forms'?q.description:`這是${q.name}！`}`);
}
function startSelection(coop){
  state.game={type:'selection',coop,selected:[2,3],pilot:0};
  renderSelection();
}
function renderSelection(){
  const g=state.game;if(!g||g.type!=='selection')return;
  main.innerHTML=screenHead(g.coop?'兄弟合體出任務':'變身！怪獸對戰','先選一位最喜歡的英雄，再一起把勇氣準備好。',g.coop?'雙人合作':'單人冒險')+`<section class="panel center"><h2 class="select-title">${g.coop?'哥哥和弟弟，選好你們的英雄！':'今天想變身成哪一位英雄？'}</h2><p class="select-copy">${g.coop?'兩個人都準備好，光之力量就會加倍！':'沒有倒數時間，準備好了再出發就好。'}</p>${g.coop?`<div class="player-options" style="max-width:500px;margin:22px auto 0">${['哥哥的英雄','弟弟的英雄'].map((s,i)=>`<button class="player-button ${g.pilot===i?'selected':''}" data-action="pilot" data-index="${i}"><span><b>${s}</b><small>已選擇：${HEROES[g.selected[i]].short}</small></span><span class="check-dot">✓</span></button>`).join('')}</div>`:''}<div class="hero-select">${HEROES.map((h,i)=>`<button class="pick-hero ${g.selected[g.pilot]===i?'selected':''}" data-action="pick-hero" data-index="${i}" aria-pressed="${g.selected[g.pilot]===i}">${heroImage(h)}${h.short}</button>`).join('')}</div><div class="coop-hint">${g.coop?'<span>哥哥：<kbd>A</kbd> 攻擊 <kbd>S</kbd> 護盾</span><span>弟弟：<kbd>L</kbd> 攻擊 <kbd>K</kbd> 護盾</span>':'<span><kbd>A</kbd> / <kbd>←</kbd> 攻擊 <kbd>S</kbd> / <kbd>↓</kbd> 護盾</span>'}<span><kbd>空白鍵</kbd> ${g.coop?'合體':'必殺'}光線</span></div><p class="select-copy">也可以點畫面上的大按鈕，不用鍵盤也能玩。</p><button class="primary" data-action="prepare-transform">${icon('sparkle')} 英雄選好了，準備變身！ ${icon('arrow')}</button></section>`;
}
function prepareTransform(){
  const old=state.game;if(!old||old.type!=='selection')return;
  state.game={type:'transform',coop:old.coop,heroes:old.selected.map(i=>HEROES[i]),ready:[false,false],busy:false};renderTransform();
}
function renderTransform(){
  const g=state.game;if(!g||g.type!=='transform')return;
  main.innerHTML=screenHead('把勇氣，變成光！','拿出你的想像力變身器，一起喊出英雄的名字。')+`<section class="transform-panel center"><span class="pill">✦ 光之力量・準備啟動</span><div style="display:flex;justify-content:center;gap:25px;max-width:100%">${g.heroes.slice(0,g.coop?2:1).map((h,i)=>`<div style="min-width:0">${devicePicture(h)}<p>${g.coop?['哥哥','弟弟'][i]+'的':''}${h.device}</p><button class="primary" data-action="transform" data-index="${i}" ${g.ready[i]?'disabled':''}>${g.ready[i]?'✓ 準備好了':`變身！${h.short}！`}${g.coop?` ${i===0?'A':'L'}`:''}</button></div>`).join('')}</div><h2>${g.coop?'一起變身，一起守護！':'你的光，準備好了嗎？'}</h2><p>${g.coop?'兩人各按一下變身按鈕，或按 A 與 L。':'按變身按鈕，或按 A／空白鍵出發！'}</p></section>`;
  speak(g.coop?'哥哥和弟弟，一起按下變身按鈕吧！':`準備好了嗎？一起變身成${g.heroes[0].short}！`);
}
function transform(index){
  const g=state.game;if(!g||g.type!=='transform'||g.busy||index>=(g.coop?2:1)||g.ready[index])return;
  g.ready[index]=true;tone('transform');
  if(!g.ready[0]||(g.coop&&!g.ready[1])){renderTransform();return;}
  g.busy=true;
  $('.transform-panel').innerHTML=`<span class="pill">✦ 變身成功</span><div style="display:flex;gap:15px">${g.heroes.slice(0,g.coop?2:1).map(h=>heroImage(h)).join('')}</div><h2>${g.coop?'兄弟的光，一起出發！':`${g.heroes[0].short}，登場！`}</h2><p>勇氣已充滿，準備守護地球！</p>`;
  speak(g.coop?'變身成功！一起守護地球！':`${g.heroes[0].short}！變身成功！`);
  later(()=>beginBattle(g),1250);
}
function beginBattle(setup){
  state.game={type:'battle',coop:setup.coop,heroes:setup.heroes,hp:100,round:(state.completed[setup.coop?'coop':'battle']||0)%3,energy:[0,0],last:[-Infinity,-Infinity],shieldUntil:[0,0],paused:false,warning:false,warnElapsed:0,nextWarning:6500,warningLimit:state.player==='big'?3500:6000,lastTick:performance.now(),elapsed:0,finished:false,firing:false,beamRemaining:0};
  renderBattle();if(document.hidden)pauseBattle(true);battleTick();
}
function renderBattle(){
  const g=state.game;if(!g||g.type!=='battle')return;
  main.innerHTML=screenHead(g.coop?'兄弟合體出任務':'地球守護大作戰',g.coop?'哥哥和弟弟各自集滿能量，再按空白鍵發射合體光線！':'攻擊集氣、護盾守護，能量滿了就能發射必殺光線！')+`<section class="panel"><div style="display:flex;align-items:center;gap:10px"><span class="pill">✦ ${g.round+1} 號訓練場 · ${g.coop?'最佳拍檔':'勇氣練習'}</span><button class="pause-button" data-action="pause">Ⅱ 暫停</button></div><div class="arena" id="arena"><span class="arena-status">☀ 城市安全・英雄就位</span><div class="monster-label">${['古代怪獸・哥摩拉','訓練怪獸・小紫','訓練怪獸・小綠'][g.round%3]}<div class="hp-bar" role="progressbar" aria-label="怪獸能量" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${g.hp}"><i id="enemy-hp" style="width:${g.hp}%"></i></div></div>${city()}${heroImage(g.heroes[0],'arena-hero',false)}${g.coop?heroImage(g.heroes[1],'arena-hero hero-two',false):''}<span class="arena-vs">VS</span>${monster('arena-monster',g.round%3)}</div><div class="battle-message" id="battle-message" role="status" aria-live="polite">${g.coop?'一人一份能量，準備一起發光！':'勇敢出擊！每次攻擊都會累積能量。'}</div><div class="battle-controls">${Array.from({length:g.coop?2:1},(_,i)=>`<div class="pilot-controls"><strong>${g.coop?['哥哥','弟弟'][i]+'・':''}${g.heroes[i].short}</strong><div class="energy-cells" id="energy-${i}" aria-label="能量 0 / 4">${'<span></span>'.repeat(4)}</div><button class="attack-button" data-action="attack" data-index="${i}">✦ 攻擊 <kbd>${i?'L':'A'}</kbd></button><button class="shield-button" data-action="shield" data-index="${i}">◇ 護盾 <kbd>${i?'K':'S'}</kbd></button></div>`).join('')}</div><button class="primary combo-button" id="combo-button" data-action="beam" disabled>⚡ ${g.coop?'兄弟合體光線':'必殺光線'} <kbd>空白鍵</kbd></button><p class="memory-caption">${g.coop?'兩位英雄的能量都滿 4 格，合體光線就準備好了。':'集滿 4 格能量，發射光線！護盾可以擋住怪獸的能量波。'}</p></section>`;
  updateEnergy();
}
function battleTick(){
  const g=state.game;if(!g||g.type!=='battle'||g.finished)return;
  const now=performance.now(),dt=Math.min(now-g.lastTick,200);g.lastTick=now;
  if(!g.paused&&g.firing){g.beamRemaining-=dt;if(g.beamRemaining<=0){resolveBeam();if(state.game!==g)return;}}
  if(!g.paused&&!g.firing){
    g.elapsed+=dt;
    if(!g.warning&&g.elapsed>=g.nextWarning){g.warning=true;g.warnElapsed=0;$('#battle-message').textContent='怪獸準備發出能量波！按一下護盾保護大家。';$('.arena-status').textContent='◇ 一起開啟護盾！';tone('warning');speak('怪獸要發出能量波了，按一下護盾！');}
    if(g.warning){g.warnElapsed+=dt;if(g.warnElapsed>=g.warningLimit){const protectedAll=g.shieldUntil[0]>now&&(!g.coop||g.shieldUntil[1]>now);$('#battle-message').textContent=protectedAll?'護盾成功！你們把城市保護得很好！':'光之國送來防護罩！沒關係，下次試試護盾。';$('.arena-status').textContent='☀ 城市安全・繼續加油';g.warning=false;g.nextWarning=g.elapsed+8500;if(protectedAll){g.energy[0]=Math.min(4,g.energy[0]+1);if(g.coop)g.energy[1]=Math.min(4,g.energy[1]+1);updateEnergy();tone('success');}}}
  }
  later(battleTick,100);
}
function updateEnergy(){
  const g=state.game;if(!g||g.type!=='battle')return;
  g.energy.slice(0,g.coop?2:1).forEach((n,i)=>{const el=$(`#energy-${i}`);if(!el)return;el.setAttribute('aria-label',`能量 ${n} / 4`);el.innerHTML=Array.from({length:4},(_,j)=>`<span class="${j<n?'full':''}"></span>`).join('');});
  const ready=g.energy[0]>=4&&(!g.coop||g.energy[1]>=4);$('#combo-button').disabled=!ready||g.paused||g.firing;
  if(ready&&!g.warning&&!g.firing)$('#battle-message').textContent=g.coop?'兩份勇氣都充滿了！按空白鍵，一起發射！':'能量充滿！按空白鍵發射必殺光線！';
}
function updateHp(){const g=state.game;$('#enemy-hp').style.width=`${g.hp}%`;$('.hp-bar').setAttribute('aria-valuenow',g.hp);}
function attack(i){
  const g=state.game;if(!g||g.type!=='battle'||g.paused||g.finished||g.firing||i>=(g.coop?2:1))return;
  const now=performance.now();if(now-g.last[i]<180)return;g.last[i]=now;
  g.energy[i]=Math.min(4,g.energy[i]+1);g.hp=Math.max(1,g.hp-2);updateEnergy();updateHp();tone('attack');
  const actor=$$('.arena-hero')[i];actor.classList.remove('punch');void actor.offsetWidth;actor.classList.add('punch');$('.arena-monster').classList.remove('hit');void $('.arena-monster').offsetWidth;$('.arena-monster').classList.add('hit');
  if(g.energy[i]===4&&!g.warning&&!(g.energy[0]>=4&&(!g.coop||g.energy[1]>=4)))$('#battle-message').textContent=`${i?'弟弟':'哥哥'}的能量滿了！幫另一位英雄加油吧！`;
}
function shield(i){
  const g=state.game;if(!g||g.type!=='battle'||g.paused||g.finished||g.firing||i>=(g.coop?2:1))return;
  const now=performance.now();if(g.shieldUntil[i]>now+g.warningLimit-300)return;
  g.shieldUntil[i]=now+g.warningLimit+2000;
  const el=document.createElement('div');el.className=`shield-bubble ${i?'second':''}`;$('#arena').append(el);later(()=>el.remove(),1000);tone('shield');
  $('#battle-message').textContent=g.coop?`${i?'弟弟':'哥哥'}的護盾開啟！我們互相保護。`:'光之護盾開啟！你正在保護城市。';
}
function fireBeam(){
  const g=state.game;if(!g||g.type!=='battle'||g.paused||g.finished||g.firing||g.energy[0]<4||(g.coop&&g.energy[1]<4))return;
  g.firing=true;g.beamRemaining=900;g.energy=[0,0];g.hp=Math.max(0,g.hp-52);updateEnergy();updateHp();
  const el=document.createElement('div');el.className='beam';$('#arena').append(el);tone('beam');
  $('#battle-message').textContent=g.coop?'兄弟合體光線！這就是合作的力量！':`${g.heroes[0].move}！光之力量，發射！`;speak(g.coop?'兄弟合體光線！':`${g.heroes[0].move}！`);
}
function resolveBeam(){
  const g=state.game;if(!g||g.type!=='battle')return;
  $('.beam')?.remove();g.firing=false;
  if(g.hp<=0){g.finished=true;finish(g.coop?'coop':'battle',g.coop?15:10,g.coop?'兄弟齊心，地球平安！':'勇敢的小英雄，任務成功！',g.coop?'哥哥和弟弟互相幫忙，用合作的光守護了城市。':'你的勇氣充滿光之力量，城市裡的大家都在為你歡呼！');}
  else{updateEnergy();$('#battle-message').textContent='怪獸的能量變少了！再一起集氣一次吧！';}
}
function pauseBattle(value){
  const g=state.game;if(!g||g.type!=='battle'||g.finished)return;
  const shouldPause=value===undefined?!g.paused:value;if(g.paused===shouldPause)return;g.paused=shouldPause;
  if(g.paused){g.pauseAt=performance.now();if('speechSynthesis'in window)speechSynthesis.cancel();const el=document.createElement('div');el.className='battle-paused';el.innerHTML='<strong>小英雄休息一下</strong><span>準備好了，我們再繼續。</span><button class="primary" data-action="pause">▶ 繼續冒險</button>';$('#arena').append(el);}
  else{const delta=performance.now()-g.pauseAt;g.shieldUntil=g.shieldUntil.map(t=>t? t+delta:0);$('.battle-paused')?.remove();g.lastTick=performance.now();}
  const button=$('.pause-button');button.textContent=g.paused?'▶ 繼續':'Ⅱ 暫停';updateEnergy();
}
function startMemory(){
  const count=state.player==='big'?6:4,selected=shuffle(HEROES).slice(0,count);
  state.game={type:'memory',mode:'memory',cards:shuffle(selected.flatMap(h=>[{id:h.id,kind:'hero',hero:h},{id:h.id,kind:'device',hero:h}])),flipped:[],matched:[],locked:false,pairs:count,tries:0};
  main.innerHTML=screenHead('英雄翻翻樂','找出「英雄」和「他的變身器」，配成一對！',`${count} 組好搭檔`)+`<section class="panel center"><h2 class="question-title">誰和誰，是變身好搭檔？</h2><p class="select-copy">先翻兩張看看，不一樣也沒關係。</p><div class="memory-board">${state.game.cards.map((c,i)=>`<button class="memory-card" data-action="flip" data-index="${i}" aria-label="第 ${i+1} 張卡片，尚未翻開"><img class="card-back-icon" src="assets/emblem.svg" alt=""></button>`).join('')}</div><p class="memory-caption" id="memory-status" role="status" aria-live="polite">已找到 0 / ${count} 組好搭檔</p><button class="read-button" data-action="memory-help">${icon('sound')} 聽聽怎麼玩</button></section>`;
  speak('找找看，哪位英雄和哪個變身器是一對？點兩張卡片，翻開看看吧！');
}
function flip(index){
  const g=state.game;if(!g||g.type!=='memory'||g.locked||g.flipped.includes(index)||g.matched.includes(index)||!g.cards[index])return;
  g.flipped.push(index);const card=g.cards[index],el=$$('[data-action="flip"]')[index];el.classList.add('flipped');el.innerHTML=(card.kind==='hero'?heroImage(card.hero):devicePicture(card.hero))+`<span>${card.kind==='hero'?card.hero.short:card.hero.device}</span>`;el.setAttribute('aria-label',`${card.kind==='hero'?card.hero.short:card.hero.device}，已翻開`);tone('flip');speak(card.kind==='hero'?card.hero.short:card.hero.device);
  if(g.flipped.length<2)return;
  g.locked=true;g.tries++;const [a,b]=g.flipped;
  if(g.cards[a].id===g.cards[b].id){g.matched.push(a,b);g.flipped=[];[a,b].forEach(i=>{const e=$$('[data-action="flip"]')[i];e.classList.add('matched');e.disabled=true;});$('#memory-status').textContent=`✦ 找到好搭檔！已完成 ${g.matched.length/2} / ${g.pairs} 組`;tone('success');if(g.matched.length===g.cards.length){later(()=>finish('memory',12,'記憶小英雄，配對成功！','你把每位英雄的變身器都找回來了，觀察力真棒！'),900);}else{g.locked=false;}}
  else{$('#memory-status').textContent='還不是同一組，記住位置，再試一次！';later(()=>{[a,b].forEach(i=>{const e=$$('[data-action="flip"]')[i];e.classList.remove('flipped');e.innerHTML='<img class="card-back-icon" src="assets/emblem.svg" alt="">';e.setAttribute('aria-label',`第 ${i+1} 張卡片，尚未翻開`);});g.flipped=[];g.locked=false;},1600);}
}
function finish(mode,stars,title,copy){
  leave();state.game={type:'result',mode};const before=BADGES.filter(b=>hasBadge(b.id)).length;
  state.stars+=stars;state.completed[mode]=(state.completed[mode]||0)+1;save();updateChrome();
  const earned=BADGES.filter(b=>hasBadge(b.id)).length-before;
  main.innerHTML=screenHead('冒險完成','把這份勇氣，收藏在小英雄的心裡。')+`<section class="panel result"><div class="result-symbol">${mode==='coop'?'🏆':'🌟'}</div><p class="eyebrow">MISSION COMPLETE</p><h2>${title}</h2><p>${copy}<br>${earned?`還獲得了 ${earned} 枚新徽章，快去收藏看看吧！`:'每一次勇敢嘗試，都值得給自己一個大大的擁抱。'}</p><div class="result-stars">★ +${stars} 顆冒險星星</div><div class="result-actions"><button class="primary" data-action="start" data-game="${mode}">再玩一次 ${icon('arrow')}</button><button class="secondary" data-action="home">回冒險大廳</button><button class="secondary" data-action="badges">看看我的徽章</button></div></section>`;
  confetti();tone('victory');speak(`${title}！獲得${stars}顆星星，你們好棒！`);main.focus({preventScroll:true});
}
function speak(text){
  if(!state.sound||!('speechSynthesis'in window))return;
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='zh-TW';utterance.rate=.88;utterance.pitch=1.08;
  const voices=speechSynthesis.getVoices();const voice=voices.find(v=>/zh[-_]TW/i.test(v.lang))||voices.find(v=>/^zh/i.test(v.lang));if(voice)utterance.voice=voice;
  speechSynthesis.speak(utterance);
}
function tone(type){
  if(!state.sound)return;
  try{
    const C=window.AudioContext||window.webkitAudioContext;if(!C)return;state.audio ||= new C();if(state.audio.state==='suspended')state.audio.resume();
    const notes={success:[523,659,784],try:[392,330],transform:[261,392,523,784],attack:[180,100],shield:[440,660],beam:[220,440,880,660],warning:[330,330],flip:[520],victory:[523,659,784,1047]}[type]||[440];
    notes.forEach((hz,i)=>{const o=state.audio.createOscillator(),gain=state.audio.createGain(),t=state.audio.currentTime+i*.09;o.type=['attack','beam'].includes(type)?'triangle':'sine';o.frequency.setValueAtTime(hz,t);gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.055,t+.015);gain.gain.exponentialRampToValueAtTime(.001,t+.18);o.connect(gain);gain.connect(state.audio.destination);o.start(t);o.stop(t+.2);});
  }catch{}
}
function toast(text){clearTimeout(state.toastTimer);$('#toast').textContent=text;$('#toast').classList.add('visible');state.toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2800);}
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const box=$('#confetti');box.innerHTML='';for(let i=0;i<45;i++){const el=document.createElement('i');el.style.cssText=`left:${Math.random()*100}%;background:${['#efbc61','#9cc6a4','#e89475','#c6b5d6'][i%4]};--drift:${Math.random()*250-125}px;animation-delay:${Math.random()*.7}s;`;box.append(el);}later(()=>box.innerHTML='',3500);}
function showHelp(){
  $('#dialog-content').innerHTML=`<span class="pill">給爸爸媽媽的小筆記</span><h2>陪孩子，一起變成光。</h2><p>這是為 4 歲與 6 歲小朋友設計的家庭同樂基地，全繁體中文、沒有廣告，也不需要帳號。</p><ul><li><b>弟弟模式：</b>三個選項、英雄圖片提示、語音讀題；翻牌配對四組。</li><li><b>哥哥模式：</b>增加至四個選項，自己觀察線索；翻牌配對六組。迪卡型態題固定三個選項。</li><li><b>兄弟合作：</b>哥哥按 A 攻擊、S 護盾；弟弟按 L 攻擊、K 護盾。兩人的能量滿了，按空白鍵發射光線。</li><li><b>平板也能玩：</b>直接點大按鈕。猜題可按數字鍵，對戰按 Esc 暫停，切換分頁會自動暫停。</li><li>答錯不扣分、不限時間。星星在完成任務後發放，保存在目前瀏覽器。</li><li>聲音可在右上角切換。語音依裝置提供的中文聲音播放；未提供語音的裝置仍可閱讀畫面提示。</li></ul><p>使用本機可用的繁體中文字型顯示（macOS 以蘋方體為主）。角色圖片取自 <a href="https://tsuburaya-prod.com/heroes" target="_blank" rel="noopener">圓谷製作官方英雄圖鑑</a>；變身器、型態與怪獸為遊戲示意插畫。這是家庭自用的非官方粉絲作品，角色權利屬原權利人。</p><button class="primary" data-action="close-help">準備好了，一起玩！</button>`;
  $('#info-dialog').showModal();
}

document.addEventListener('click',event=>{
  const nav=event.target.closest('[data-nav]');if(nav){navigate(nav.dataset.nav);return;}
  const el=event.target.closest('[data-action]');if(!el||el.disabled)return;const action=el.dataset.action,index=Number(el.dataset.index);
  if(action==='home')navigate('home');
  else if(action==='badges')navigate('badges');
  else if(action==='start')startGame(el.dataset.game);
  else if(action==='player'){state.player=el.dataset.player;save();renderHome();tone('flip');toast(state.player==='little'?'弟弟模式：一起慢慢看、慢慢玩！':state.player==='big'?'哥哥模式：小英雄，來挑戰看看！':'兄弟模式：兩份勇氣，一起發光！');}
  else if(action==='help')showHelp();
  else if(action==='close-help')$('#info-dialog').close();
  else if(action==='read-hero'){const h=HEROES.find(h=>h.id===el.dataset.id);speak(`${h.name}。${h.fact}。變身器是${h.device}。必殺技是${h.move}。`);}
  else if(action==='read-question'){if(!state.sound)toast('先按右上角喇叭，開啟聲音喔！');else speakQuestion();}
  else if(action==='answer')answer(index);
  else if(action==='next-question'){if(state.game?.type==='quiz'&&state.game.answered){state.game.index++;nextQuiz();}}
  else if(action==='pilot'){if(state.game?.type==='selection'){state.game.pilot=index;renderSelection();}}
  else if(action==='pick-hero'){if(state.game?.type==='selection'){state.game.selected[state.game.pilot]=index;tone('flip');renderSelection();}}
  else if(action==='prepare-transform')prepareTransform();
  else if(action==='transform')transform(index);
  else if(action==='attack')attack(index);
  else if(action==='shield')shield(index);
  else if(action==='beam')fireBeam();
  else if(action==='pause')pauseBattle();
  else if(action==='flip')flip(index);
  else if(action==='memory-help'){if(state.sound)speak('找出英雄和他的變身器，配成一對。點兩張卡片翻開看看，不一樣就記住位置，下次再試一次！');else toast('點兩張卡片，找出英雄和他的變身器！');}
});
document.addEventListener('keydown',event=>{
  if($('#info-dialog').open||event.ctrlKey||event.altKey||event.metaKey||event.target.matches('input,textarea,select'))return;
  const g=state.game;if(!g)return;const key=event.key.toLowerCase();
  if(g.type==='quiz'){
    if(/^[1-4]$/.test(key)){event.preventDefault();if(!event.repeat)answer(Number(key)-1);}
    if(key==='enter'&&g.answered&&!event.target.closest('button')){event.preventDefault();g.index++;nextQuiz();}
  }
  if(g.type==='transform'&&['a','l',' '].includes(key)){event.preventDefault();if(event.repeat)return;if(key==='l'&&g.coop)transform(1);else if(key!=='l')transform(0);}
  if(g.type==='battle'){
    if(['a','l','s','k',' ','arrowleft','arrowdown','escape'].includes(key))event.preventDefault();
    if(event.repeat)return;
    if(key==='escape')pauseBattle();
    else if(key==='a'||key==='arrowleft')attack(0);else if(key==='l'&&g.coop)attack(1);else if(key==='s'||key==='arrowdown')shield(0);else if(key==='k'&&g.coop)shield(1);else if(key===' ')fireBeam();
  }
});
document.addEventListener('visibilitychange',()=>{if(document.hidden){pauseBattle(true);if('speechSynthesis'in window)speechSynthesis.cancel();}});
$('#sound-button').addEventListener('click',()=>{state.sound=!state.sound;save();updateChrome();if(!state.sound){if('speechSynthesis'in window)speechSynthesis.cancel();toast('聲音關閉，安靜玩也很開心。');}else{tone('success');speak('聲音開啟，小英雄，準備出發！');toast('聲音開啟！準備一起冒險。');}});
$('#fullscreen-button').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else toast('這個瀏覽器沒有提供全螢幕功能。');}catch{toast('可用瀏覽器的全螢幕選單放大遊戲。');}});
$('#help-button').addEventListener('click',showHelp);
$('.dialog-close').addEventListener('click',()=>$('#info-dialog').close());
$('#info-dialog').addEventListener('click',e=>{if(e.target===$('#info-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('.brand').addEventListener('click',e=>{e.preventDefault();navigate('home');});
window.addEventListener('hashchange',()=>{if(['#home','#heroes','#badges'].includes(location.hash))navigate(location.hash.slice(1));});
navigate(['heroes','badges'].includes(location.hash.slice(1))?location.hash.slice(1):'home',false);
