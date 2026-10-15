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
 assert.equal(await page.locator('meta[name="game-version"]').getAttribute('content'),'1.2.0');
 await page.evaluate(()=>{state.sound=false;save();updateChrome();});
 assert.equal(await page.locator('.game-card').count(),6);
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
   await page.screenshot({path:path.join(out,label+'-coop.png'),fullPage:true});
   await page.locator('[data-action="home"]').click();
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
 await page.locator('[data-action="home"]').click();
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
 await page.locator('[data-action="start"][data-game="battle"]').click();await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('Space');await page.waitForSelector('.arena');
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
 await page.locator('[data-nav="home"]').click();await page.locator('[data-action="start"][data-game="battle"]').click();
 await page.locator('#hero-search').fill('Teo');await page.locator('[data-action="pick-hero"][data-index="52"]').click();
 await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('a');await page.waitForSelector('.arena');
 assert.equal(await page.evaluate(()=>state.game.heroes[0].id),'teo');
 await page.screenshot({path:path.join(out,'tablet-teo-battle.png'),fullPage:true});
 await page.locator('[data-action="home"]').click();await page.locator('[data-nav="heroes"]').click();
 await page.locator('#hero-search').fill('');
 for(const [width,height] of [[390,844],[320,740]]){
   await page.setViewportSize({width,height});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'library overflow');
   await page.locator('[data-nav="badges"]').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'badges overflow');
   await page.locator('[data-nav="home"]').click();
   for(const mode of ['quiz','forms','device','memory']){
     await page.locator(`[data-action="start"][data-game="${mode}"]`).first().click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),mode+' small screen overflow');await page.locator('[data-action="home"]').click();
   }
 }
 await page.locator('[data-action="help"]').click();assert.ok(await page.locator('dialog').evaluate(el=>el.open));await page.locator('[data-action="close-help"]').click();
 await page.locator('#sound-button').click();assert.equal(await page.locator('#sound-button').getAttribute('aria-pressed'),'true');await page.locator('#sound-button').click();
 assert.deepEqual(errors,[]);
 assert.deepEqual(foreignRequests,[],'game must not request any external API or asset');
 console.log('PASS: 6 game modes, 9 viewport sizes (320px to 1920px), portrait/landscape, images, keyboard/touch controls, co-op energy, pause, retries, memory, 9 badges, persistence, and no browser errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
