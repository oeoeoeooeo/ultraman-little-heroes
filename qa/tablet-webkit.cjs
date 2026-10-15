// WebKit desktop runner with touch emulation; this is not a physical iPad test.
const {webkit}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await webkit.launch();
 const context=await browser.newContext({viewport:{width:834,height:1194},hasTouch:true,isMobile:true});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.GAME_URL||'file://'+path.resolve(__dirname,'../index.html'));
 await page.evaluate(()=>{state.sound=false;save();updateChrome();});
 await page.locator('.game-card[data-game="coop"]').click();
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('main *')].filter(e=>/^(auto|scroll)$/.test(getComputedStyle(e).overflowY)&&e.scrollHeight>e.clientHeight+2).map(e=>e.className)),[]);
 await page.locator('.hero-select').scrollIntoViewIfNeeded();const before=await page.evaluate(()=>scrollY);await page.evaluate(()=>window.scrollBy(0,350));await page.waitForTimeout(250);assert.ok(await page.evaluate(()=>scrollY)>before);
 await page.locator('[data-action="prepare-transform"]').click();await page.keyboard.press('a');await page.keyboard.press('l');await page.waitForSelector('.arena');
 for(const [width,height] of [[834,1194],[1024,768],[390,844]]){
  await page.setViewportSize({width,height});await page.locator('#combo-button').scrollIntoViewIfNeeded();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));const r=await page.locator('.arena').boundingBox();assert.ok(r.y>=-1&&r.y+r.height<=height+1,'WebKit visible battle at '+width);
  assert.ok(await page.locator('.attack-button').first().evaluate(e=>parseFloat(getComputedStyle(e).fontSize))>=16);
  await page.screenshot({path:path.join(__dirname,'screenshots','webkit-battle-'+width+'.png'),fullPage:false});
 }
 await page.setViewportSize({width:834,height:1194});for(let i=0;i<4;i++){await page.keyboard.press('a');await page.keyboard.press('l');await page.waitForTimeout(200);}
 await page.locator('#combo-button').click();await page.waitForTimeout(300);assert.equal(await page.locator('.beam').count(),1);await page.screenshot({path:path.join(__dirname,'screenshots','webkit-light-impact.png'),fullPage:false});
 await page.keyboard.press('Escape');const hp=await page.evaluate(()=>state.game.hp);await page.waitForTimeout(1000);assert.equal(await page.evaluate(()=>state.game.hp),hp);await page.keyboard.press('Escape');
 await page.locator('[data-nav="home"]').click();await page.locator('[data-action="help"]').click();await page.locator('[data-action="voice-preview"]').click();await page.waitForFunction(()=>state.cue&&!state.cue.paused&&state.cue.currentTime>.1);assert.equal(await page.evaluate(()=>state.cue.error),null);await page.locator('[data-action="close-help"]').click();await page.locator('#sound-button').click();assert.equal(await page.evaluate(()=>state.cue),null);
 await require('./reaction-browser.cjs')(page,path.join(__dirname,'screenshots'),'webkit');
 await require('./arcade-browser.cjs')(page,path.join(__dirname,'screenshots'),'webkit');
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: WebKit touch emulation, document scrolling, visible battle at three sizes, readable controls layered light/pause and real gesture-started MP3/mute. Not physical-device Safari validation.');
})().catch(e=>{console.error(e);process.exit(1);});
