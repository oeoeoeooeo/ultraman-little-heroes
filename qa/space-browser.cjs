const assert=require('node:assert/strict');
const path=require('node:path');
module.exports=async function spaceQA(page,out,prefix='chromium'){
 await page.evaluate(()=>{navigate('home');state.sound=false;state.player='together';});
 await page.locator('.game-card[data-game="space"]').click();
 await page.locator('[data-space-hero="0"]').selectOption('tiga');await page.locator('[data-space-hero="1"]').selectOption('zero');
 await page.locator('[data-space-level="0"]').selectOption('1');await page.locator('[data-space-level="1"]').selectOption('0');
 await page.screenshot({path:path.join(out,prefix+'-space-setup.png'),fullPage:true});
 await page.locator('[data-action="space-begin"]').click();await page.waitForFunction(()=>state.game.phase==='flight');
 assert.deepEqual(await page.evaluate(()=>state.game.levels),[1,0]);
 const resize=async(width,height)=>{await page.setViewportSize({width,height});await page.waitForTimeout(120);if(await page.evaluate(()=>state.game.paused))await page.locator('.space-pause [data-action="space-pause"]').click();};
 for(const [width,height]of[[1440,1100],[834,1194],[1024,768],[390,844],[320,740],[844,390]]){
  await resize(width,height);await page.locator('.space-controls').scrollIntoViewIfNeeded();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'space overflow '+width);
  const r=await page.locator('.space-stage').boundingBox();assert.ok(r.y>=-1&&r.y+r.height<=height+1,'space stage stays visible '+width+' '+JSON.stringify(r));
  for(const b of await page.locator('.space-pad button').evaluateAll(es=>es.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))))assert.ok(b.w>=44&&b.h>=54,'space usable pads '+width+' '+JSON.stringify(b));
  assert.ok(await page.locator('.space-pause').isHidden());await page.screenshot({path:path.join(out,prefix+'-space-flight-'+width+'.png'),fullPage:false});
 }
 await resize(834,1194);
 await page.keyboard.press('Escape');const clock=await page.evaluate(()=>state.game.clock);await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>state.game.clock),clock);assert.ok(await page.locator('[data-action="space-fire"]').first().isDisabled());await page.screenshot({path:path.join(out,prefix+'-space-paused.png'),fullPage:false});await page.keyboard.press('Escape');
 const move=async(i,lane)=>{while(await page.evaluate(i=>state.game.lanes[i],i)!==lane){const dir=(await page.evaluate(i=>state.game.lanes[i],i))<lane?1:-1;await page.locator(`[data-action="space-move"][data-index="${i}"][data-dir="${dir}"]`).click();}};
 const target=(i,kind)=>page.evaluate(({i,kind})=>state.game.objects[i].findIndex(o=>o.kind===kind),{i,kind});
 const endWave=async()=>{
  const wave=await page.evaluate(()=>state.game.wave);
  await page.evaluate(()=>{state.game.waveStart=state.game.clock-4020;});await page.waitForFunction(()=>state.game.resolved.every(Boolean));
  await page.evaluate(()=>{state.game.waveStart=state.game.clock-4720;});await page.waitForFunction(w=>state.game.phase==='checkpoint'||state.game.wave>w,wave);await page.waitForTimeout(500);
 };
 // Reset only the clock to the current wave's start; all decisions use actual controls.
 await page.evaluate(()=>{state.game.wave=0;spaceWave()});
 for(let chapter=0;chapter<2;chapter++){
  for(let wave=1;wave<=4;wave++){
   for(let i=0;i<2;i++){
    if(chapter===1){await move(i,await target(i,'rock'));await page.locator(`[data-action="space-fire"][data-index="${i}"]`).click();}
    await move(i,await target(i,'star'));
   }
   if(chapter===1&&wave===1){await page.waitForFunction(()=>state.game.cleared.every(n=>n>0));await page.screenshot({path:path.join(out,prefix+'-space-rocks.png'),fullPage:false});}
   else if(chapter===1)await page.waitForTimeout(240);
   await endWave();
  }
  await page.screenshot({path:path.join(out,prefix+'-space-checkpoint-'+chapter+'.png'),fullPage:false});await page.locator('[data-action="space-next"]').click();
 }
 const stars=await page.evaluate(()=>state.stars);
 for(let wave=0;wave<3;wave++){
  for(let i=0;i<2;i++){await move(i,await target(i,'core'));await page.locator(`[data-action="space-fire"][data-index="${i}"]`).click();}
  await page.waitForFunction(n=>state.game.hits.every(x=>x>=n),wave+1);
  if(wave===0){await page.screenshot({path:path.join(out,prefix+'-space-boss.png'),fullPage:false});}
  if(wave<2)await endWave();
 }
 assert.equal(await page.evaluate(()=>state.game.phase),'ready');await page.locator('[data-action="space-ready"][data-index="0"]').click();await page.waitForTimeout(250);assert.deepEqual(await page.evaluate(()=>state.game.ready),[true,false]);assert.equal(await page.evaluate(()=>state.stars),stars);
 await page.screenshot({path:path.join(out,prefix+'-space-ready.png'),fullPage:false});await page.locator('[data-action="space-ready"][data-index="1"]').click();await page.waitForTimeout(600);await page.screenshot({path:path.join(out,prefix+'-space-beam.png'),fullPage:false});await page.waitForSelector('.result');
 assert.ok(await page.evaluate(s=>state.stars>s,stars));assert.equal(await page.evaluate(()=>state.completed.space),1);await page.screenshot({path:path.join(out,prefix+'-space-result.png'),fullPage:true});
 await page.locator('[data-action="start"][data-game="space"]').click();assert.equal(await page.evaluate(()=>state.game.solo),false);await page.locator('[data-action="space-mode"][data-index="1"]').click();assert.equal(await page.locator('[data-space-hero]').count(),1);
 await page.locator('[data-action="space-begin"]').click();await page.waitForFunction(()=>state.game.phase==='flight');await page.keyboard.press('ArrowLeft');assert.deepEqual(await page.evaluate(()=>state.game.lanes),[0]);
 await page.evaluate(()=>{document.dispatchEvent(new Event('visibilitychange'));spacePause(true)});const frozen=await page.evaluate(()=>state.game.clock);await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>state.game.clock),frozen);await page.locator('.space-pause [data-action="space-pause"]').click();
 await page.screenshot({path:path.join(out,prefix+'-space-solo.png'),fullPage:false});await page.locator('[data-action="home"]').first().click();assert.equal(await page.evaluate(()=>heldPointers.size),0);
 console.log('PASS: '+prefix+' space rescue, six viewports, 44px+ controls, real hero/difficulty selection and three sectors, flight/shot/boss/ready/result, pause, solo, replay and navigation.');
};
module.exports.multiTouch=async function spaceTouch(browser,base){
 const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
 await page.evaluate(()=>{state.sound=false;state.player='together';startGame('space');spaceBegin()});await page.waitForFunction(()=>state.game.phase==='flight');await page.locator('.space-controls').scrollIntoViewIfNeeded();
 const session=await context.newCDPSession(page),point=async(selector,id)=>{const r=await page.locator(selector).boundingBox();assert.ok(r.y>=0&&r.y+r.height<=768,'space touch visible');return {x:r.x+r.width/2,y:r.y+r.height/2,id};};
 const a=await point('[data-action="space-fire"][data-index="0"]',91),b=await point('[data-action="space-fire"][data-index="1"]',92);
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[a,b]});assert.equal(await page.evaluate(()=>heldPointers.size),2);assert.ok(await page.evaluate(()=>state.game.shots.every(Boolean)));await page.waitForTimeout(250);
 await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[b]});const first=await page.evaluate(()=>state.game.cooldown[0]);await page.waitForTimeout(600);assert.equal(await page.evaluate(()=>state.game.cooldown[0]),first);assert.ok(await page.evaluate(v=>state.game.cooldown[1]>v,first));assert.equal(await page.evaluate(()=>heldPointers.size),1);
 await session.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});assert.equal(await page.evaluate(()=>heldPointers.size),0);
 const left=await point('[data-action="space-move"][data-index="0"][data-dir="-1"]',93),right=await point('[data-action="space-move"][data-index="1"][data-dir="1"]',94);
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[left,right]});await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.deepEqual(await page.evaluate(()=>state.game.lanes),[0,2]);assert.equal(await page.evaluate(()=>visualViewport.scale),1);assert.equal(await page.evaluate(()=>String(getSelection())), '');assert.deepEqual(errors,[]);await context.close();
 console.log('PASS: real simultaneous space touch steering/fire, independent hold/release/cancel, no compatibility double-fire, zoom or selection.');
};
