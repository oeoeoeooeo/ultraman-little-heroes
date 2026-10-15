const assert=require('node:assert/strict');
const path=require('node:path');
module.exports=async function arcadeQA(page,out,prefix='chromium'){
 await page.evaluate(()=>{navigate('home');state.sound=false;state.player='big';});
 await page.locator('.game-card[data-game="flight"]').click();
 await page.locator('[data-action="flight-level"][data-index="0"]').click();await page.locator('[data-action="flight-begin"]').click();
 for(const [w,h]of[[834,1194],[1024,768],[390,844],[320,740],[844,390]]){
  await page.setViewportSize({width:w,height:h});await page.locator('.flight-controls').scrollIntoViewIfNeeded();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'flight overflow '+w);
  const b=await page.locator('[data-action="flight-move"]').first().boundingBox();assert.ok(b.width>=44&&b.height>=60,'large flight pad '+w);
  if(w>=768&&h>=700){const r=await page.locator('.flight-stage').boundingBox();assert.ok(r.y>=-1&&r.y+r.height<=h+1,'visible flight on tablet '+w);}
  await page.screenshot({path:path.join(out,prefix+'-arcade-flight-'+w+'.png'),fullPage:false});
 }
 await page.locator('[data-action="arcade-pause"]').first().click();const clock=await page.evaluate(()=>state.game.elapsed);await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>state.game.elapsed),clock);
 await page.screenshot({path:path.join(out,prefix+'-arcade-pause.png'),fullPage:false});await page.locator('.reaction-pause [data-action="arcade-pause"]').click();
 await page.evaluate(()=>{state.game.lanes=[1,1];state.game.resolved=false;state.game.elapsed=0;flightPaint()});await page.keyboard.press('a');await page.keyboard.press('l');assert.deepEqual(await page.evaluate(()=>state.game.lanes),[0,2]);
 for(let wave=await page.evaluate(()=>state.game.wave);wave<=12;wave++){
  await page.evaluate(()=>{state.game.lanes=[...state.game.targets];state.game.elapsed=FLIGHT_LEVELS[state.game.level].ms-40;flightPaint()});await page.waitForFunction(()=>state.game.resolved);await page.evaluate(()=>state.game.elapsed=FLIGHT_LEVELS[state.game.level].ms+850);await page.waitForFunction(w=>state.game.type==='result'||state.game.wave>w,wave);
 }
 assert.equal(await page.evaluate(()=>state.game.type),'result');await page.screenshot({path:path.join(out,prefix+'-arcade-result.png'),fullPage:true});
 await page.evaluate(()=>navigate('home'));await page.locator('.game-card[data-game="circuit"]').click();
 for(let round=1;round<=3;round++){
  for(const [w,h]of(round===2?[[834,1194],[390,844],[320,740],[844,390]]:[[834,1194]])){
   await page.setViewportSize({width:w,height:h});await page.locator('.circuit-grid').scrollIntoViewIfNeeded();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'circuit overflow '+w);assert.ok((await page.locator('[data-action="circuit-turn"]').first().boundingBox()).width>=40,'readable puzzle tile '+w);
   await page.screenshot({path:path.join(out,prefix+'-arcade-circuit-'+round+'-'+w+'.png'),fullPage:true});
  }
  let steps=0;while(!await page.evaluate(()=>state.game.solved)){assert.ok(++steps<=30);await page.locator('[data-action="circuit-hint"]').click();}
  assert.ok(await page.locator('[data-action="circuit-turn"]').first().isDisabled());await page.locator('[data-action="circuit-next"]').click();
 }
 assert.equal(await page.evaluate(()=>state.game.type),'result');await page.evaluate(()=>navigate('home'));
 console.log('PASS: '+prefix+' arcade at five viewports, usable pads, pause/keyboard, 12-wave result, three solvable circuit rounds and readable puzzle controls.');
};
// CDP dispatches two *simultaneous* touch contacts (not two sequential taps).
module.exports.multiTouch=async function(browser,base){
 const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
 await page.evaluate(()=>{state.sound=false;leave();beginBattle({coop:true,heroes:[HEROES[2],HEROES[3]],forms:['multi','zero-base'],monsterId:'gomora'})});
 await page.locator('.battle-dock').scrollIntoViewIfNeeded();const session=await context.newCDPSession(page);
 const center=async selector=>{const r=await page.locator(selector).boundingBox();assert.ok(r.y>=0&&r.y+r.height<=768,'touch pad visible');return {x:r.x+r.width/2,y:r.y+r.height/2};};
 const a={...await center('[data-action="attack"][data-index="0"]'),id:1},b={...await center('[data-action="attack"][data-index="1"]'),id:2};
 assert.equal(await page.locator('.attack-button').first().evaluate(e=>getComputedStyle(e).touchAction),'none');
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[a,b]});assert.deepEqual(await page.evaluate(()=>state.game.energy),[1,1]);await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...a,x:a.x-15},{...b,x:b.x+15}]});await page.waitForTimeout(330);assert.ok(await page.evaluate(()=>state.game.energy.every(x=>x>=2)));assert.equal(await page.evaluate(()=>heldPointers.size),2);
 await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[b]});const before=await page.evaluate(()=>state.game.energy[0]);await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>state.game.energy[0]),before);assert.equal(await page.evaluate(()=>state.game.energy[1]),4);assert.equal(await page.evaluate(()=>heldPointers.size),1);
 await session.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});const hp=await page.evaluate(()=>state.game.hp);await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>state.game.hp),hp);assert.equal(await page.evaluate(()=>heldPointers.size),0);assert.equal(await page.evaluate(()=>visualViewport.scale),1);assert.equal(await page.evaluate(()=>String(getSelection())), '');
 await page.evaluate(()=>{navigate('home');startGame('flight');flightBegin(0)});await page.locator('.flight-controls').scrollIntoViewIfNeeded();
 const left={...await center('[data-action="flight-move"][data-index="0"][data-dir="-1"]'),id:3},right={...await center('[data-action="flight-move"][data-index="1"][data-dir="1"]'),id:4};
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[left,right]});await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.deepEqual(await page.evaluate(()=>state.game.lanes),[0,2]);
 await page.evaluate(()=>{navigate('home');reactionSetup(0);reactionBegin();state.game.phase='live';state.game.kind='parallel';state.game.steps=[{pilot:0,action:'light'},{pilot:1,action:'shield'}];state.game.done=[];state.game.roundQuick=true;reactionSignals()});await page.locator('.reaction-controls').scrollIntoViewIfNeeded();
 const light={...await center('[data-action="reaction-input"][data-index="0"][data-kind="light"]'),id:5},shield={...await center('[data-action="reaction-input"][data-index="1"][data-kind="shield"]'),id:6};
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[light,shield]});await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.equal(await page.evaluate(()=>state.game.phase),'reward');assert.equal(await page.evaluate(()=>state.game.done.length),2);assert.deepEqual(errors,[]);
 await context.close();console.log('PASS: real simultaneous CDP touch points, independent held attack/release/cancel, no zoom/selection, concurrent flight directions and reaction actions.');
};
