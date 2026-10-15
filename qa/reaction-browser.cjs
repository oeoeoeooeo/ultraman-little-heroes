// Called by the existing Chromium and WebKit runners with their real page.
const assert=require('node:assert/strict');
const path=require('node:path');
module.exports=async function reactionQA(page,out,prefix='chromium'){
 await page.locator('[data-nav="home"]').click();
 await page.evaluate(()=>{state.sound=false;save();updateChrome();});
 const rendered=await page.evaluate(async()=>{
  const results=[];const previous=state.audio;state.sound=true;stopVoice();
  for(const type of ['success','try','transform','attack','shield','beam','warning','flip','victory','signal']){
   const ctx=new OfflineAudioContext(1,36000,24000);ctx.resume=()=>Promise.resolve();state.audio=ctx;lastToneAt=-Infinity;tone(type);const buffer=await ctx.startRendering();let peak=0,energy=0;for(const x of buffer.getChannelData(0)){peak=Math.max(peak,Math.abs(x));energy+=x*x;}results.push({type,peak,energy});
  }
  state.audio=previous;stopVoice();state.sound=false;return results;
 });
 assert.ok(rendered.every(x=>x.peak>.005&&x.peak<.35&&x.energy>0),'every synthesized effect renders with bounded levels');
 await page.locator('.game-card[data-game="reaction"]').click();
 assert.equal(await page.evaluate(()=>state.game.level),1);
 for(const [w,h] of [[834,1194],[390,844],[320,740],[844,390]]){
  await page.setViewportSize({width:w,height:h});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:path.join(out,prefix+'-reaction-setup-'+w+'.png'),fullPage:true});
 }
 await page.locator('[data-action="reaction-level"][data-index="2"]').click();
 await page.evaluate(()=>{state.sound=true;});
 await page.locator('[data-action="reaction-begin"]').click();
 await page.waitForFunction(()=>state.game.phase==='live');
 await page.locator('[data-action="reaction-pause"]').first().click();
 const clock=await page.evaluate(()=>state.game.clock);await page.waitForTimeout(350);assert.equal(await page.evaluate(()=>state.game.clock),clock);
 assert.ok(await page.locator('[data-action="reaction-input"]').first().isDisabled());await page.locator('.reaction-pause [data-action="reaction-pause"]').click();
 for(const [w,h] of [[834,1194],[390,844],[320,740],[844,390]]){
  await page.setViewportSize({width:w,height:h});await page.locator('[data-action="reaction-input"]').last().scrollIntoViewIfNeeded();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const r=await page.locator('.reaction-stage').boundingBox();assert.ok(r.y>=-1&&r.y+r.height<=h+1,'reaction signals visible at '+w);
  assert.ok(await page.locator('[data-action="reaction-input"]').first().evaluate(e=>parseFloat(getComputedStyle(e).fontSize))>=18);
  await page.screenshot({path:path.join(out,prefix+'-reaction-play-'+w+'.png'),fullPage:false});
 }
 await page.setViewportSize({width:834,height:1194});
 for(let round=0;round<12;round++){
  await page.waitForFunction(n=>state.game.type==='reaction'&&state.game.round===n&&['live','lure'].includes(state.game.phase),round);
  if(await page.evaluate(()=>state.game.phase==='lure')){
   await page.locator('[data-action="reaction-input"][data-index="0"][data-kind="light"]').click();assert.equal(await page.evaluate(()=>state.game.done.length),0);
   await page.screenshot({path:path.join(out,prefix+'-reaction-lure.png'),fullPage:false});
   await page.waitForFunction(()=>state.game.phase==='live');
  }
  if(round===3){
   assert.equal(await page.locator('.reaction-signal').count(),4);
   assert.ok(await page.locator('#reaction-signals').textContent().then(t=>t.includes('想想剛才的動作')));
   await page.screenshot({path:path.join(out,prefix+'-reaction-memory.png'),fullPage:false});
  }
  const steps=await page.evaluate(()=>state.game.steps);
  for(const s of steps)await page.locator(`[data-action="reaction-input"][data-index="${s.pilot}"][data-kind="${s.action}"]`).click();
  assert.equal(await page.evaluate(()=>state.game.phase),'reward');
 }
 await page.waitForSelector('.result');assert.ok(await page.locator('.result').textContent().then(t=>t.includes('12 回合成功')));
 await page.screenshot({path:path.join(out,prefix+'-reaction-result.png'),fullPage:true});
 await page.locator('[data-action="start"][data-game="reaction"]').click();assert.equal(await page.evaluate(()=>state.game.level),2);
 await page.locator('[data-nav="home"]').click();await page.evaluate(()=>{state.sound=false;save();updateChrome();});
 console.log('PASS: '+prefix+' complete 12-round reaction challenge with real clicks, audio signals, pause, lure, concealed memory, four responsive layouts and selected-level replay.');
};
