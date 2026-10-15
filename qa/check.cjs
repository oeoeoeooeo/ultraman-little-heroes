const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const out=path.join(__dirname,'screenshots');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const executablePath=process.env.CHROME_PATH || undefined;
 const browser=await chromium.launch({headless:true,executablePath});
 const page=await browser.newPage({viewport:{width:1440,height:1100}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.GAME_URL || 'file://'+path.resolve(__dirname,'../index.html');
 const foreignRequests=[];page.on('request',r=>{if(/^https?:/.test(base)&&new URL(r.url()).origin!==new URL(base).origin)foreignRequests.push(r.url());});
 await page.goto(base);
 assert.equal(await page.locator('meta[name="game-version"]').getAttribute('content'),'1.5.0');
 await page.evaluate(()=>{state.sound=false;save();updateChrome();});
 assert.equal(await page.locator('.game-card').count(),7);
 assert.equal(await page.locator('.player-button.selected').count(),1);
 for(const [width,height,label] of [[1920,1080,'full-hd'],[1440,1100,'desktop'],[1366,768,'laptop'],[1280,720,'hd'],[1024,768,'tablet-landscape'],[834,1194,'tablet'],[390,844,'phone'],[320,740,'small-phone'],[844,390,'phone-landscape']]){
   await page.setViewportSize({width,height});await page.waitForTimeout(250);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),label+' home overflow');
   assert.ok(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)),label+' image load');
   await page.screenshot({path:path.join(out,label+'-home.png'),fullPage:true});
   await page.locator('[data-action="start"][data-game="coop"]').first().click();
   assert.equal(await page.locator('.pick-hero').count(),53);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),label+' selection overflow');
   await page.screenshot({path:path.join(out,label+'-selection.png'),fullPage:true});
   await page.locator('[data-action="prepare-transform"]').click();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),label+' transform overflow');
   await page.screenshot({path:path.join(out,label+'-transform.png'),fullPage:true});
   await page.keyboard.press('a');await page.keyboard.press('l');await page.waitForSelector('.arena');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),label+' battle overflow');
   if(width<=600){const clear=await page.evaluate(()=>{const h=[...document.querySelectorAll('.arena-hero')].map(e=>e.getBoundingClientRect()),m=document.querySelector('.arena-monster').getBoundingClientRect();return h.every(r=>r.right<=m.left+1)&&h[0].right<=h[1].left+5;});assert.ok(clear,label+' co-op heroes must remain visible beside monster');}
   await page.screenshot({path:path.join(out,label+'-coop.png'),fullPage:true});
   await page.locator('[data-action="home"]').first().click();
 }
 await page.setViewportSize({width:1440,height:1100});
 // Verify wrong answers are retryable, correct answers advance explicitly, and all quizzes finish.
 for(const mode of ['quiz','forms','device']){
   await page.locator(`[data-action="start"][data-game="${mode}"]`).first().click();
   assert.equal(await page.locator('.answer').count(),3);
   const wrong=await page.evaluate(()=>state.game.options.findIndex(o=>o.id!==state.game.deck[state.game.index].id));
   await page.keyboard.press(String(wrong+1));assert.equal(await page.locator('.answer.wrong').count(),1);
   assert.equal(await page.evaluate(()=>state.game.answered),false);
   for(let i=0;i<5;i++){
     const right=await page.evaluate(()=>state.game.options.findIndex(o=>o.id===state.game.deck[state.game.index].id));
     await page.keyboard.press(String(right+1));assert.equal(await page.locator('.answer.correct').count(),1);
     if(i===0&&mode==='quiz')await page.screenshot({path:path.join(out,'quiz.png'),fullPage:true});
     await page.locator('[data-action="next-question"]').click();
   }
   assert.equal(await page.locator('.result').count(),1);await page.locator('[data-action="home"]').first().click();
 }
 assert.equal(await page.evaluate(()=>state.stars),30);
 // Big brother difficulty, forms capped to 3 choices.
 await page.locator('[data-player="big"]').click();
 await page.locator('[data-action="start"][data-game="quiz"]').click();assert.equal(await page.locator('.answer').count(),4);
 await page.locator('[data-action="home"]').first().click();
 // Co-op must have both heroes' energy; pause suppresses input.
 await page.locator('[data-action="start"][data-game="coop"]').first().click();
 await page.locator('[data-action="pilot"][data-index="1"]').click();
 await page.locator('[data-action="pick-hero"][data-index="4"]').click();
 assert.deepEqual(await page.evaluate(()=>state.game.selected),[2,4]);
 await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('a');
 assert.deepEqual(await page.evaluate(()=>state.game.ready),[true,false]);
 await page.keyboard.press('l');await page.waitForSelector('.arena');
 for(let i=0;i<4;i++){await page.keyboard.press('a');await page.waitForTimeout(190);}
 assert.deepEqual(await page.evaluate(()=>state.game.energy),[4,0]);assert.ok(await page.locator('#combo-button').isDisabled());
 await page.keyboard.press('Space');assert.equal(await page.evaluate(()=>state.game.hp),92);
 await page.keyboard.press('Escape');assert.equal(await page.locator('.battle-paused').count(),1);
 await page.keyboard.press('l');assert.deepEqual(await page.evaluate(()=>state.game.energy),[4,0]);
 await page.locator('.battle-paused [data-action="pause"]').click();
 for(let i=0;i<4;i++){await page.keyboard.press('l');await page.waitForTimeout(190);}
 assert.ok(await page.locator('#combo-button').isEnabled());await page.keyboard.press('Space');await page.waitForTimeout(1000);
 assert.equal(await page.evaluate(()=>state.game.hp),32);
 for(let i=0;i<4;i++){await page.locator('[data-action="attack"][data-index="0"]').click();await page.locator('[data-action="attack"][data-index="1"]').click();await page.waitForTimeout(190);}
 await page.locator('#combo-button').click();await page.waitForSelector('.result');
 assert.equal(await page.evaluate(()=>state.completed.coop),1);assert.equal(await page.evaluate(()=>state.stars),45);
 await page.screenshot({path:path.join(out,'victory.png'),fullPage:true});
 await page.locator('[data-action="home"]').first().click();
 // Memory mismatch flips back, then complete every actual hero/device pair via clicks.
 await page.locator('[data-player="little"]').click();await page.locator('[data-action="start"][data-game="memory"]').click();
 assert.equal(await page.locator('.memory-card').count(),8);
 const mismatch=await page.evaluate(()=>[0,state.game.cards.findIndex(c=>c.id!==state.game.cards[0].id)]);
 for(const i of mismatch)await page.locator(`[data-action="flip"][data-index="${i}"]`).click();
 assert.equal(await page.evaluate(()=>state.game.locked),true);await page.waitForTimeout(1700);assert.equal(await page.locator('.flipped').count(),0);
 const pairs=await page.evaluate(()=>Object.values(state.game.cards.reduce((a,c,i)=>{(a[c.id]||=[]).push(i);return a;},{})));
 for(const pair of pairs)for(const i of pair)await page.locator(`[data-action="flip"][data-index="${i}"]`).click();
 await page.waitForSelector('.result');assert.equal(await page.evaluate(()=>state.completed.memory),1);
 await page.locator('[data-action="home"]').first().click();
 // Single player transform and complete fight.
 await page.locator('.game-card[data-action="start"][data-game="battle"]').click();await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('Space');await page.waitForSelector('.arena');
 for(let round=0;round<2;round++){
   for(let i=0;i<4;i++){await page.keyboard.press('a');await page.waitForTimeout(190);}
   await page.keyboard.press('s');await page.keyboard.press('Space');await page.waitForTimeout(1000);
 }
 await page.waitForSelector('.result');assert.equal(await page.evaluate(()=>state.completed.battle),1);
 await page.locator('[data-action="badges"]').click();assert.equal(await page.locator('.achievement.earned').count(),9);
 await page.screenshot({path:path.join(out,'achievements.png'),fullPage:true});
 const total=await page.evaluate(()=>state.stars);await page.reload();assert.equal(await page.evaluate(()=>state.stars),total);
 await page.locator('[data-nav="heroes"]').click();assert.equal(await page.locator('.library-card').count(),53);await page.screenshot({path:path.join(out,'heroes.png'),fullPage:true});
 // Verify all 53 assets and select the latest hero through real controls.
 await page.waitForFunction(()=>[...document.querySelectorAll('.library-card img')].every(i=>i.complete&&i.naturalWidth>0));
 await page.locator('[data-filter="latest"]').click();assert.equal(await page.locator('.library-card:visible').count(),4);
 await page.locator('#hero-search').fill('Teo');assert.equal(await page.locator('.library-card:visible').count(),1);
 await page.screenshot({path:path.join(out,'latest-teo-desktop.png'),fullPage:true});
 await page.locator('#hero-search').fill('<img onerror=alert(1)>');assert.equal(await page.locator('.library-card:visible').count(),0);
 await page.locator('#hero-search').fill('');
 for(const [width,height,label] of [[320,740,'small-phone'],[390,844,'phone'],[834,1194,'tablet']]){
   await page.setViewportSize({width,height});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'latest library overflow');
   await page.screenshot({path:path.join(out,label+'-latest-heroes.png'),fullPage:true});
 }
 await page.locator('[data-filter="all"]').click();
 await page.locator('[data-nav="home"]').click();await page.locator('.game-card[data-action="start"][data-game="battle"]').click();
 await page.locator('#hero-search').fill('Teo');await page.locator('[data-action="pick-hero"][data-index="52"]').click();
 await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('a');await page.waitForSelector('.arena');
 assert.equal(await page.evaluate(()=>state.game.heroes[0].id),'teo');
 await page.screenshot({path:path.join(out,'tablet-teo-battle.png'),fullPage:true});
 await page.locator('[data-action="home"]').first().click();await page.locator('[data-nav="heroes"]').click();
 await page.locator('#hero-search').fill('');
 for(const [width,height] of [[390,844],[320,740]]){
   await page.setViewportSize({width,height});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'library overflow');
   await page.locator('[data-nav="badges"]').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'badges overflow');
   await page.locator('[data-nav="home"]').click();
   for(const mode of ['quiz','forms','device','memory']){
     await page.locator(`[data-action="start"][data-game="${mode}"]`).first().click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),mode+' small screen overflow');await page.locator('[data-action="home"]').first().click();
   }
 }
 await page.locator('[data-action="help"]').click();assert.ok(await page.locator('dialog').evaluate(el=>el.open));await page.locator('[data-action="close-help"]').click();
 await page.locator('#sound-button').click();assert.equal(await page.locator('#sound-button').getAttribute('aria-pressed'),'true');await page.locator('#sound-button').click();
 // Expanded catalogues are usable at desktop, tablet, phone and narrow phone widths.
 for(const [width,height,label] of [[1440,1100,'desktop'],[834,1194,'tablet'],[390,844,'phone'],[320,740,'small-phone']]){
  await page.setViewportSize({width,height});await page.locator('[data-nav="heroes"]').click();
  for(const [tab,count] of [['forms',55],['devices',60],['moves',90],['monsters',30]]){
   await page.locator(`[data-action="encyclopedia-tab"][data-tab="${tab}"]`).click();assert.equal(await page.locator('.extra-card').count(),count);
   await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(i=>i.complete&&i.naturalWidth>0));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),label+' '+tab+' library overflow');
   await page.screenshot({path:path.join(out,label+'-'+tab+'.png'),fullPage:false});
  }
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('[data-action="try-monster"][data-id="pucchi"]').click();
 assert.equal(await page.evaluate(()=>state.game.monsterId),'pucchi');await page.locator('#hero-search').fill('');await page.locator('[data-action="pick-hero"][data-index="28"]').click();
 assert.equal(await page.evaluate(()=>HEROES[state.game.selected[0]].id),'cosmos');await page.locator('[data-action="pick-form"][data-id="cosmos-luna"]').click();
 await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('a');await page.waitForSelector('.arena');
 assert.match(await page.locator('[data-action="attack"]').textContent(),/送點心/);await page.screenshot({path:path.join(out,'phone-pucchi-rescue.png'),fullPage:true});
 for(let j=0;j<2;j++){for(let i=0;i<4;i++){await page.locator('[data-action="attack"]').click();await page.waitForTimeout(190);}await page.locator('#combo-button').click();await page.waitForTimeout(1000);}
 assert.match(await page.locator('.result h2').textContent(),/好朋友救援成功/);
 await page.locator('[data-action="home"]').first().click();await page.locator('.game-card[data-action="start"][data-game="battle"]').click();await page.locator('[data-action="pick-monster"][data-id="baltan"]').click();
 await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('a');await page.waitForSelector('.arena');await page.waitForSelector('.challenge-targets');
 assert.equal(await page.locator('[data-action="challenge-target"]').count(),3);await page.screenshot({path:path.join(out,'phone-baltan-clones.png'),fullPage:true});
 const target=await page.evaluate(()=>state.game.targetIndex);await page.locator(`[data-action="challenge-target"][data-index="${target}"]`).click();assert.equal(await page.evaluate(()=>state.game.challengeSolved),true);
 await page.locator('[data-action="cycle-form"]').click();assert.equal(await page.evaluate(()=>activeForm(state.game,0).role),'power');await page.locator('[data-action="pick-move"]').last().click();assert.equal(await page.locator('[data-action="pick-move"][aria-pressed="true"]').count(),1);
 // Decode every MP3 to catch silent/invalid production assets, then verify actual playback and mute.
 const encoded=Object.fromEntries(fs.readdirSync(path.resolve(__dirname,'../assets')).filter(f=>f.startsWith('voice-')&&f.endsWith('.mp3')).map(f=>[f.slice(6,-4),fs.readFileSync(path.resolve(__dirname,'../assets',f)).toString('base64')]));
 const sounds=await page.evaluate(async(encoded)=>{const ctx=new AudioContext();const result=[];for(const [id,data] of Object.entries(encoded)){const bytes=Uint8Array.from(atob(data),c=>c.charCodeAt(0));const buffer=await ctx.decodeAudioData(bytes.buffer);const samples=buffer.getChannelData(0);let peak=0;for(const v of samples)peak=Math.max(peak,Math.abs(v));result.push({id,duration:buffer.duration,peak});}await ctx.close();return result;},encoded);
 assert.equal(sounds.length,9);assert.ok(sounds.every(s=>s.duration>1&&s.duration<8&&s.peak>.03&&s.peak<1),'all voice clips decode and contain unclipped sound');
 await page.locator('[data-action="home"]').first().click();await page.locator('[data-action="help"]').click();await page.locator('[data-action="voice-preview"]').click();
 await page.waitForFunction(()=>state.cue&&!state.cue.paused&&state.cue.currentTime>.1);assert.equal(await page.evaluate(()=>state.cue.error),null);assert.ok(await page.evaluate(()=>state.cue.src.includes('?v=1.5.0')),'versioned audio bypasses older tablet cache');await page.locator('[data-action="close-help"]').click();await page.locator('#sound-button').click();assert.equal(await page.evaluate(()=>state.cue),null);
 await page.locator('#sound-button').click();await page.waitForFunction(()=>state.cue&&!state.cue.paused);await page.locator('[data-nav="heroes"]').click();assert.equal(await page.evaluate(()=>state.cue),null);
 await page.locator('#sound-button').click();assert.equal(await page.evaluate(()=>state.sound),false);
 console.log('PASS: all expanded galleries across four widths, Pucchi rescue, real clone target, form/move switching, all 9 local MP3 decodes/playback, and mute/navigation cancellation.');

 // Play the new journey as a player, using visible buttons at phone width.
 await page.locator('[data-nav="home"]').click();await page.setViewportSize({width:390,height:844});
 await page.locator('[data-player="together"]').click();await page.locator('[data-action="start-quest"]').click();
 assert.equal(await page.locator('.quest-route li').count(),3);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:path.join(out,'phone-quest-map.png'),fullPage:true});
 await page.locator('[data-action="quest-transform"]').click();await page.keyboard.press('a');await page.keyboard.press('l');await page.waitForSelector('.quest-arena');
 assert.equal(await page.evaluate(()=>state.game.quest.stage),0);
 for(let stage=0;stage<3;stage++){
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'quest stage overflow');
  await page.locator('.quest-objective').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'phone-quest-stage-'+stage+'.png'),fullPage:true});
  await page.keyboard.press('Escape');const found=await page.evaluate(()=>state.game.questFound);await page.keyboard.press('1');assert.equal(await page.evaluate(()=>state.game.questFound),found);await page.keyboard.press('Escape');
  for(let k=0;k<3;k++){
   const index=stage===0?k:await page.evaluate(()=>state.game.questTarget);
   if(stage>0){const wrong=(index+1)%3;await page.locator(`[data-action="quest-target"][data-index="${wrong}"]`).click();assert.equal(await page.evaluate(()=>state.game.questFound),k);}
   await page.locator(`[data-action="quest-target"][data-index="${index}"]`).click();
  }
  assert.equal(await page.evaluate(()=>state.game.questFound),3);
  for(let round=0;round<2;round++){
   for(let i=0;i<4;i++){await page.keyboard.press('a');await page.keyboard.press('l');await page.waitForTimeout(190);}
   await page.locator('#combo-button').click();await page.waitForTimeout(1000);
  }
  if(stage<2){await page.waitForSelector('[data-action="quest-next"]');await page.screenshot({path:path.join(out,'phone-quest-checkpoint-'+stage+'.png'),fullPage:true});await page.locator('[data-action="quest-next"]').click();}
 }
 await page.waitForSelector('.result');assert.equal(await page.evaluate(()=>state.questRuns),1);assert.equal(await page.locator('.result .primary').getAttribute('data-action'),'start-quest');assert.equal(await page.evaluate(()=>window.scrollY),0,'victory should start at the top');await page.screenshot({path:path.join(out,'phone-quest-victory.png'),fullPage:true});
 const stickerCount=await page.evaluate(()=>state.collection.length);assert.ok(stickerCount>=3);
 await page.locator('[data-action="badges"]').click();assert.equal(await page.locator('.sticker.collected').count(),stickerCount);
 for(const [width,height,label] of [[320,740,'small-phone'],[390,844,'phone'],[834,1194,'tablet'],[1440,1100,'desktop']]){
  await page.setViewportSize({width,height});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'sticker book '+label+' overflow');await page.screenshot({path:path.join(out,label+'-sticker-book.png'),fullPage:false});
 }
 await page.reload();assert.equal(await page.evaluate(()=>state.collection.length),stickerCount);
 // Real pointer holding: releasing and pausing must stop repeat attacks.
 await page.setViewportSize({width:390,height:844});await page.locator('[data-action="start"][data-game="battle"]').first().click();await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('a');await page.waitForSelector('.arena');
 const attackButton=page.locator('[data-action="attack"]').first();await attackButton.scrollIntoViewIfNeeded();const box=await attackButton.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.waitForTimeout(1100);await page.mouse.up();
 assert.equal(await page.evaluate(()=>state.game.energy[0]),4,'hold collects energy');const heldHp=await page.evaluate(()=>state.game.hp);await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>state.game.hp),heldHp,'release stops repeat');
 await page.keyboard.press('Escape');assert.ok(await page.locator('[data-action="attack"]').isDisabled());await page.screenshot({path:path.join(out,'phone-hold-charge-paused.png'),fullPage:true});await page.keyboard.press('Escape');
 await page.locator('[data-nav="home"]').click();assert.equal(await page.evaluate(()=>heldAttack),null);
 console.log('PASS: visible-control three-stage phone co-op journey, clue gating, wrong answers, pause, checkpoints, final reward, persisted sticker book at four sizes, and real pointer hold/release.');

 // Tablet regression: root scrolling, readable controls and effects visible while operating.
 const touchContext=await browser.newContext({viewport:{width:834,height:1194},hasTouch:true,isMobile:true});
 const tablet=await touchContext.newPage();tablet.on('pageerror',e=>errors.push(e.message));
 tablet.on('request',r=>{if(/^https?:/.test(base)&&new URL(r.url()).origin!==new URL(base).origin)foreignRequests.push(r.url());});
 await tablet.goto(base);await tablet.evaluate(()=>{state.sound=false;save();updateChrome();});
 await tablet.locator('.game-card[data-game="coop"]').click();
 const nestedScrolls=()=>[...document.querySelectorAll('main *')].filter(e=>/^(auto|scroll)$/.test(getComputedStyle(e).overflowY)&&e.scrollHeight>e.clientHeight+2).map(e=>e.className);
 assert.deepEqual(await tablet.evaluate(nestedScrolls),[],'selection has no nested scroll containers');assert.equal(await tablet.locator('iframe').count(),0);
 await tablet.locator('.hero-select').scrollIntoViewIfNeeded();const beforeWheel=await tablet.evaluate(()=>scrollY);await tablet.mouse.wheel(0,400);await tablet.waitForTimeout(250);assert.ok(await tablet.evaluate(()=>scrollY)>beforeWheel,'wheel scroll reaches document');
 await tablet.evaluate(()=>window.scrollTo(0,document.querySelector('.hero-select').getBoundingClientRect().top+scrollY+100));
 const beforeTouch=await tablet.evaluate(()=>scrollY),session=await touchContext.newCDPSession(tablet);
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:400,y:850}]});
 for(const y of [780,700,620,540,460])await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:400,y}]});
 await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await tablet.waitForTimeout(250);assert.ok(await tablet.evaluate(()=>scrollY)>beforeTouch+100,'touch swipe reaches document');
 await tablet.screenshot({path:path.join(out,'tablet-root-scroll-selection.png'),fullPage:false});
 await tablet.locator('[data-action="prepare-transform"]').click();await tablet.keyboard.press('a');await tablet.keyboard.press('l');await tablet.waitForSelector('.is-transforming');await tablet.waitForTimeout(250);await tablet.screenshot({path:path.join(out,'tablet-transformation-portal.png'),fullPage:false});await tablet.waitForSelector('.arena');
 for(const [width,height] of [[768,1024],[834,1194],[1024,768],[1180,820],[390,844],[844,390]]){
  await tablet.setViewportSize({width,height});await tablet.locator('#combo-button').scrollIntoViewIfNeeded();
  assert.deepEqual(await tablet.evaluate(nestedScrolls),[],'battle has no nested scroll at '+width);assert.ok(await tablet.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'battle overflow '+width);
  const rect=await tablet.locator('.arena').boundingBox();assert.ok(rect.y>=-1&&rect.y+rect.height<=height+1,'arena visible while using controls '+width);
  for(const selector of ['.attack-button','.form-button','.move-choice','.combo-button'])assert.ok(await tablet.locator(selector).first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=16,'readable '+selector);
  await tablet.screenshot({path:path.join(out,'battle-visible-'+width+'.png'),fullPage:false});
 }
 await tablet.setViewportSize({width:834,height:1194});
 for(let k=0;k<4;k++){await tablet.keyboard.press('a');await tablet.keyboard.press('l');await tablet.waitForTimeout(200);}
 assert.ok(await tablet.locator('.arena').evaluate(e=>e.classList.contains('energy-ready')));await tablet.locator('#combo-button').scrollIntoViewIfNeeded();await tablet.screenshot({path:path.join(out,'tablet-energy-halo.png'),fullPage:false});
 await tablet.locator('#combo-button').click();await tablet.waitForTimeout(320);assert.equal(await tablet.locator('.beam').count(),1);assert.ok(await tablet.locator('.arena').evaluate(e=>e.classList.contains('is-firing')));await tablet.screenshot({path:path.join(out,'tablet-light-impact.png'),fullPage:false});
 await tablet.keyboard.press('Escape');assert.equal(await tablet.locator('.beam').evaluate(e=>getComputedStyle(e,'::after').animationPlayState),'paused');await tablet.keyboard.press('Escape');
 await tablet.locator('[data-nav="home"]').click();
 // Native MP3 playback with instrumented TTS: answer reveal follows the actual ended event.
 await tablet.evaluate(()=>{
  window.voiceEvents=[];speechSynthesis.speak=u=>voiceEvents.push({kind:'speech',text:u.text,time:performance.now()});speechSynthesis.cancel=()=>{};
  const Original=window.Audio;window.Audio=class extends Original{constructor(url){super(url);this.addEventListener('playing',()=>voiceEvents.push({kind:'clip',time:performance.now()}));this.addEventListener('ended',()=>voiceEvents.push({kind:'ended',time:performance.now()}));}};
  state.sound=true;
 });
 for(const mode of ['quiz','forms','device']){
  await tablet.locator(`.game-card[data-game="${mode}"]`).click();await tablet.waitForTimeout(200);
  assert.ok(await tablet.evaluate(()=>voiceEvents.filter(x=>x.kind==='speech').every(x=>!x.text.includes('第1個')&&!x.text.includes('小提示'))));
  const correct=await tablet.evaluate(()=>state.game.options.findIndex(x=>x.id===state.game.deck[0].id));await tablet.locator(`[data-action="answer"][data-index="${correct}"]`).click();
  await tablet.waitForFunction(()=>state.cue&&!state.cue.paused&&state.cue.currentTime>.05);assert.equal(await tablet.evaluate(()=>activeTones.size),0);
  await tablet.waitForFunction(()=>voiceEvents.some(x=>x.kind==='ended')&&voiceEvents.at(-1).kind==='speech');
  const events=await tablet.evaluate(()=>voiceEvents);const ended=events.find(x=>x.kind==='ended');assert.ok(events.at(-1).time-ended.time>=100,'answer waits for cheer and gap');
  await tablet.locator('[data-nav="home"]').click();await tablet.evaluate(()=>voiceEvents=[]);
 }
 await tablet.evaluate(()=>{playCue('correct','這句不能播放');stopVoice()});await tablet.waitForTimeout(350);assert.equal(await tablet.evaluate(()=>state.cue),null);assert.deepEqual(await tablet.evaluate(()=>voiceEvents),[]);
 await touchContext.close();console.log('PASS: real tablet touch/wheel document scrolling, no inner frames, visible battle at six sizes, readable controls, layered light and pause, and actual MP3-to-reveal sequencing.');

 await require('./reaction-browser.cjs')(page,out);
 assert.deepEqual(errors,[]);
 assert.deepEqual(foreignRequests,[],'game must not request any external API or asset');
 console.log('PASS: 6 game modes, 9 viewport sizes (320px to 1920px), portrait/landscape, images, keyboard/touch controls, co-op energy, pause, retries, memory, 9 badges, persistence, and no browser errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
