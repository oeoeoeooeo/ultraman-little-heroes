const assert=require('node:assert/strict');
const path=require('node:path');
module.exports=async function guardQA(page,out,prefix='chromium'){
 await page.evaluate(()=>{navigate('home');state.sound=false;state.player='together';});
 await page.locator('.game-card[data-game="guard"]').click();
 await page.locator('[data-guard-hero="0"]').selectOption('tiga');
 await page.locator('[data-guard-level="0"]').selectOption('1');
 await page.locator('[data-guard-level="1"]').selectOption('0');
 await page.locator('[data-action="guard-begin"]').click();
 await page.keyboard.press('a');assert.deepEqual(await page.evaluate(()=>state.game.ready),[true,false]);
 await page.keyboard.press('j');await page.waitForFunction(()=>state.game.phase==='tutorial');
 // Mobile WebKit fires orientationchange when viewport orientation changes.
 // Verify the game pauses, then explicitly resume, as a player would.
 const resize=async(width,height)=>{
  await page.setViewportSize({width,height});await page.waitForTimeout(120);
  if(await page.evaluate(()=>state.game.paused)){
   const clock=await page.evaluate(()=>state.game.clock);await page.waitForTimeout(160);assert.equal(await page.evaluate(()=>state.game.clock),clock,'orientation pause freezes game clock');
   await page.locator('.guard-pause [data-action="guard-pause"]').click();
  }
 };
 const solve=async()=>{
  for(let i=0;i<2;i++){
   while(await page.evaluate(i=>state.game.done[i]<state.game.tasks[i].sequence.length,i)){
    const choice=await page.evaluate(i=>state.game.tasks[i].sequence[state.game.done[i]],i);
    await page.locator(`[data-action="guard-input"][data-index="${i}"][data-choice="${choice}"]`).click();
   }
  }
 };
 await solve();await page.waitForFunction(()=>state.game.phase==='mission');
 // Actual preview expiration, hint replay and pause use the game's own clock.
 await page.waitForFunction(()=>state.game.clock>=state.game.tasks[0].revealUntil);
 assert.match(await page.locator('#guard-clue-0').textContent(),/？/);
 await page.locator('[data-action="guard-hint"][data-index="0"]').click();assert.ok(await page.locator('[data-action="guard-input"][data-index="0"]').first().isDisabled());
 await page.keyboard.press('Escape');const clock=await page.evaluate(()=>state.game.clock);await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>state.game.clock),clock);await page.keyboard.press('Escape');
 await page.waitForFunction(()=>state.game.clock>=state.game.tasks[0].revealUntil);
 for(const [w,h]of[[834,1194],[1024,768],[390,844],[320,740],[844,390]]){
  await resize(w,h);await page.locator('.guard-controls').scrollIntoViewIfNeeded();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'guard overflow '+w);
  const b=await page.locator('[data-action="guard-input"]').first().boundingBox();assert.ok(b.width>=60&&b.height>=64,'guard touch size '+w+' '+JSON.stringify(b));
  const r=await page.locator('.guard-stage').boundingBox();assert.ok(r.y>=-1&&r.y+r.height<=h+1,'guard stage visible '+w+' '+JSON.stringify(r));
  await page.screenshot({path:path.join(out,prefix+'-guard-mission-'+w+'.png'),fullPage:false});
 }
 await resize(834,1194);await solve();await page.waitForFunction(()=>state.game.phase==='checkpoint');
 await page.screenshot({path:path.join(out,prefix+'-guard-checkpoint.png'),fullPage:true});
 await page.locator('[data-action="guard-swap"]').click();assert.deepEqual(await page.evaluate(()=>state.game.roles),[1,0]);assert.equal(await page.evaluate(()=>state.game.tasks[0].count),3);
 await page.waitForFunction(()=>state.game.clock>=state.game.tasks[0].revealUntil);
 await resize(320,740);await page.locator('.guard-controls').scrollIntoViewIfNeeded();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 for(const r of await page.locator('[data-action="guard-input"]').evaluateAll(es=>es.map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))))assert.ok(r.width>=60&&r.height>=64,'all three-symbol pads remain large');
 await page.screenshot({path:path.join(out,prefix+'-guard-swapped-320.png'),fullPage:true});
 await resize(834,1194);
 for(let round=1;round<3;round++){
  await page.waitForFunction(()=>state.game.clock>=state.game.tasks[0].revealUntil);await solve();await page.waitForFunction(()=>state.game.phase==='checkpoint');await page.locator('[data-action="guard-next"]').click();
 }
 assert.equal(await page.evaluate(()=>state.game.phase),'ready');
 const stars=await page.evaluate(()=>state.stars);await page.keyboard.press('a');await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>state.game.phase),'ready');
 await page.keyboard.press('j');await page.keyboard.press('Escape');await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>state.game.phase),'beam');await page.keyboard.press('Escape');
 await page.screenshot({path:path.join(out,prefix+'-guard-beam.png'),fullPage:true});
 await page.waitForSelector('.result');assert.equal(await page.evaluate(()=>state.stars),stars+24);assert.equal(await page.evaluate(()=>state.completed.guard),1);
 await page.screenshot({path:path.join(out,prefix+'-guard-result.png'),fullPage:true});
 await page.locator('[data-action="start"][data-game="guard"]').click();await page.locator('[data-action="guard-mode"][data-index="1"]').click();await page.locator('[data-action="guard-begin"]').click();assert.equal(await page.evaluate(()=>state.game.solo),true);
 await page.evaluate(()=>navigate('home'));assert.equal(await page.locator('#confetti i').count(),0);
 console.log('PASS: '+prefix+' guard rescue at five sizes, independent difficulty, real memory/hint timing, both-pilot tutorial and three stations, role swap, pause, delayed readiness, beam/result, exact-once reward and solo mode.');
};
module.exports.multiTouch=async(browser,base)=>{
 const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
 await page.evaluate(()=>{state.sound=false;state.player='together';state.guardLevels=[0,0];startGame('guard');guardBegin()});
 const session=await context.newCDPSession(page);
 const point=async(selector,id)=>{const r=await page.locator(selector).boundingBox();assert.ok(r.y>=0&&r.y+r.height<=768,'guard simultaneous pad visible');return {x:r.x+r.width/2,y:r.y+r.height/2,id};};
 await page.locator('.guard-controls').scrollIntoViewIfNeeded();
 const a=await point('[data-action="guard-ready"][data-index="0"]',1),b=await point('[data-action="guard-ready"][data-index="1"]',2);
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[a,b]});assert.deepEqual(await page.evaluate(()=>state.game.ready),[true,true]);
 await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[a]});assert.equal(await page.evaluate(()=>heldPointers.size),1);
 await session.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});assert.equal(await page.evaluate(()=>heldPointers.size),0);
 await page.waitForFunction(()=>state.game.phase==='tutorial');await page.locator('.guard-controls').scrollIntoViewIfNeeded();
 const targets=await page.evaluate(()=>state.game.tasks.map(t=>t.sequence[0]));
 const c=await point(`[data-action="guard-input"][data-index="0"][data-choice="${targets[0]}"]`,3),d=await point(`[data-action="guard-input"][data-index="1"][data-choice="${targets[1]}"]`,4);
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[c,d]});assert.equal(await page.evaluate(()=>state.game.phase),'reward');await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 assert.deepEqual(await page.evaluate(()=>state.game.done),[1,1]);assert.equal(await page.evaluate(()=>visualViewport.scale),1);assert.equal(await page.evaluate(()=>String(getSelection())),'');assert.deepEqual(errors,[]);
 await context.close();console.log('PASS: guard simultaneous CDP transform and two different jobs; independent release/cancel, no zoom/selection or duplicate actions.');
};
