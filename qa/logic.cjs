// Runs the actual UI and event handlers in a DOM, without launching a browser.
// This verifies behavior; viewport layout and audio still require browser QA.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {parseHTML} = require('linkedom');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const code = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const storage = new Map();

function boot() {
  const {document, window: domWindow} = parseHTML(html);
  let clock = 1000, timerId = 0;
  const timers = new Map();
  const dialog = document.querySelector('dialog');
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; };
  document.hidden = false;
  const localStorage = {getItem: k => storage.get(k) || null, setItem: (k,v) => storage.set(k,String(v))};
  const window = {scrollTo(){}, addEventListener(){}};
  const globals = {
    document, window, localStorage, location: {hash:''}, console,
    matchMedia: () => ({matches: true}), performance: {now: () => clock},
    setTimeout: (fn, ms = 0) => { const id=++timerId;timers.set(id,{fn,at:clock+ms});return id; },
    clearTimeout: id => timers.delete(id)
  };
  const context = vm.createContext(globals);
  vm.runInContext(code, context);
  function run(js){return vm.runInContext(js,context);}
  function json(js){return JSON.parse(run(`JSON.stringify(${js})`));}
  function el(selector){const e=document.querySelector(selector);assert.ok(e,`missing element: ${selector}`);return e;}
  function click(selector){const e=el(selector);assert.ok(!e.disabled,`disabled: ${selector}`);e.click();}
  function key(key){const e=new domWindow.Event('keydown',{bubbles:true,cancelable:true});Object.assign(e,{key,repeat:false});document.body.dispatchEvent(e);}
  function advance(ms){const end=clock+ms;let limit=0;while(true){const entry=[...timers.entries()].sort((a,b)=>a[1].at-b[1].at)[0];if(!entry||entry[1].at>end)break;assert.ok(++limit<2000,'runaway timers');clock=entry[1].at;timers.delete(entry[0]);entry[1].fn();}clock=end;}
  return {document,run,json,el,click,key,advance,timers};
}
// Expanded encyclopaedia: source/asset integrity, filters and shared-device ambiguity.
const catalogue=JSON.parse(fs.readFileSync(path.join(root,'hero-catalogue.json'),'utf8'));
assert.equal(catalogue.length,53);assert.equal(new Set(catalogue.map(h=>h.id)).size,53);
for(const h of catalogue){assert.ok(h.source.startsWith('https://tsuburaya-prod.com/heroes/'));assert.equal(fs.readFileSync(path.join(root,'assets',h.id+'.png')).subarray(0,8).toString('hex'),'89504e470d0a1a0a');}
const expanded=boot();assert.deepEqual(expanded.json('HEROES'),catalogue);
expanded.click('[data-nav="heroes"]');expanded.click('[data-filter="latest"]');assert.equal(expanded.document.querySelectorAll('.library-card:not([hidden])').length,4);
expanded.run("catalogueSearch='teo';filterHeroCards()");assert.equal(expanded.document.querySelectorAll('.library-card:not([hidden])').length,1);
expanded.run("catalogueSearch='<img onerror=alert(1)>';filterHeroCards()");assert.equal(expanded.document.querySelectorAll('.library-card:not([hidden])').length,0);
expanded.run("catalogueSearch='';catalogueFilter='all';filterHeroCards()");expanded.click('[data-nav="home"]');expanded.click('[data-action="start"][data-game="device"]');
for(const h of catalogue.filter(h=>h.deviceQuiz)){
 expanded.run(`state.game.deck[0]=HEROES.find(h=>h.id===${JSON.stringify(h.id)});state.game.index=0;nextQuiz()`);
 const options=expanded.json('state.game.options');assert.ok(options.filter(o=>o.deviceKey===h.deviceKey).length===1,'shared device ambiguous: '+h.id);
 assert.match(expanded.el('.question-visual').textContent,new RegExp(h.device.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
}
expanded.click('[data-action="home"]');expanded.click('[data-action="start"][data-game="battle"]');expanded.click('[data-action="pick-hero"][data-index="52"]');expanded.click('[data-action="prepare-transform"]');assert.equal(expanded.run('state.game.heroes[0].id'),'teo');expanded.key(' ');expanded.advance(1300);assert.equal(expanded.run('state.game.heroes[0].id'),'teo');
for(let i=0;i<20;i++){expanded.run('startMemory()');const keys=expanded.json("state.game.cards.filter(c=>c.kind==='device').map(c=>c.hero.deviceKey)");assert.equal(new Set(keys).size,keys.length);}
expanded.click('[data-nav="home"]');

storage.set('ultra-base-v1',JSON.stringify({sound:false}));
let t=boot();
assert.equal(t.document.documentElement.lang,'zh-Hant');
assert.equal(t.document.querySelectorAll('.game-card').length,6);
assert.equal(t.document.querySelectorAll('.player-button.selected').length,1);
for(const e of t.document.querySelectorAll('img[src]'))assert.ok(fs.existsSync(path.join(root,e.getAttribute('src'))),'image exists');
// Use actual click and keyboard events for quiz retry and completion.
for(const mode of ['quiz','forms','device']){
  t.click(`[data-action="start"][data-game="${mode}"]`);
  assert.equal(t.document.querySelectorAll('.answer').length,3);
  const wrong=t.run('state.game.options.findIndex(o=>o.id!==state.game.deck[state.game.index].id)');
  t.key(String(wrong+1));assert.equal(t.run('state.game.answered'),false);assert.ok(t.el('.answer.wrong'));
  for(let i=0;i<5;i++){
    const right=t.run('state.game.options.findIndex(o=>o.id===state.game.deck[state.game.index].id)');
    t.key(String(right+1));assert.equal(t.run('state.game.answered'),true);
    // Duplicate key cannot grant stars or skip a question.
    t.key(String(right+1));assert.equal(t.run('state.game.index'),i);
    t.click('[data-action="next-question"]');
  }
  assert.equal(t.run(`state.completed.${mode}`),1);assert.ok(t.el('.result'));t.click('[data-action="home"]');
}
assert.equal(t.run('state.stars'),30);
t.click('[data-player="big"]');t.click('[data-action="start"][data-game="quiz"]');assert.equal(t.document.querySelectorAll('.answer').length,4);
t.click('[data-action="home"]');t.click('[data-action="start"][data-game="forms"]');assert.equal(t.document.querySelectorAll('.answer').length,3);
t.click('[data-action="home"]');
// Co-op hero selection and transformation require both players.
t.click('[data-action="start"][data-game="coop"]');t.click('[data-action="pilot"][data-index="1"]');t.click('[data-action="pick-hero"][data-index="4"]');assert.deepEqual(t.json('state.game.selected'),[2,4]);
t.click('[data-action="prepare-transform"]');t.key('a');assert.deepEqual(t.json('state.game.ready'),[true,false]);t.key('l');t.advance(1300);assert.equal(t.run('state.game.type'),'battle');
for(let i=0;i<4;i++){t.key('a');t.advance(200);}
assert.deepEqual(t.json('state.game.energy'),[4,0]);assert.ok(t.el('#combo-button').disabled);t.key(' ');assert.equal(t.run('state.game.hp'),92);
t.key('Escape');t.key('l');t.advance(1000);assert.deepEqual(t.json('state.game.energy'),[4,0]);assert.equal(t.run('state.game.paused'),true);
t.click('.battle-paused [data-action="pause"]');
for(let i=0;i<4;i++){t.key('l');t.advance(200);}
assert.equal(t.el('#combo-button').disabled,false);t.key(' ');
// Pausing also freezes a beam already in flight.
t.key('Escape');t.advance(2000);assert.equal(t.run('state.game.type'),'battle');assert.equal(t.run('state.game.firing'),true);
t.key('Escape');t.advance(1000);assert.equal(t.run('state.game.hp'),32);
for(let i=0;i<4;i++){t.click('[data-action="attack"][data-index="0"]');t.click('[data-action="attack"][data-index="1"]');t.advance(200);}
t.click('#combo-button');t.advance(1100);assert.equal(t.run('state.completed.coop'),1);assert.equal(t.run('state.stars'),45);
t.click('[data-action="home"]');
// Device/hero memory pairs and mismatch delay.
t.click('[data-player="little"]');t.click('[data-action="start"][data-game="memory"]');assert.equal(t.document.querySelectorAll('.memory-card').length,8);
const wrongPair=t.run('state.game.cards.findIndex(c=>c.id!==state.game.cards[0].id)');t.click('[data-action="flip"][data-index="0"]');t.click(`[data-action="flip"][data-index="${wrongPair}"]`);assert.equal(t.run('state.game.locked'),true);t.advance(1700);assert.equal(t.document.querySelectorAll('.flipped').length,0);
const pairs=t.json('Object.values(state.game.cards.reduce((a,c,i)=>{(a[c.id]||=[]).push(i);return a;},{}))');
for(const pair of pairs)for(const i of pair)t.click(`[data-action="flip"][data-index="${i}"]`);
t.advance(1000);assert.equal(t.run('state.completed.memory'),1);t.click('[data-action="home"]');
// Single player fight, visible warning and actual defensive success.
t.click('[data-action="start"][data-game="battle"]');t.click('[data-action="prepare-transform"]');t.key(' ');t.advance(1300);
t.advance(6500);assert.equal(t.run('state.game.warning'),true);t.key('s');t.advance(6000);assert.equal(t.run('state.game.warning'),false);assert.match(t.el('#battle-message').textContent,/護盾成功/);
for(let round=0;round<2;round++){
  for(let i=0;i<4;i++){t.key('ArrowLeft');t.advance(200);}
  t.key(' ');t.advance(1100);
}
assert.equal(t.run('state.completed.battle'),1);
t.click('[data-action="badges"]');assert.equal(t.document.querySelectorAll('.achievement.earned').length,9);
const total=t.run('state.stars');t=boot();assert.equal(t.run('state.stars'),total);assert.equal(t.run('hasBadge("explorer")'),true);
t.click('[data-nav="heroes"]');assert.equal(t.document.querySelectorAll('.library-card').length,53);
// Leaving an in-progress game cancels delayed work and cannot overwrite the library.
t.click('[data-nav="home"]');t.click('[data-action="start"][data-game="memory"]');const mismatch=t.run('state.game.cards.findIndex(c=>c.id!==state.game.cards[0].id)');t.click('[data-action="flip"][data-index="0"]');t.click(`[data-action="flip"][data-index="${mismatch}"]`);t.click('[data-nav="heroes"]');t.advance(3000);assert.equal(t.document.querySelectorAll('.library-card').length,53);assert.equal(t.run('state.game'),null);
// Backgrounding a battle pauses it; dialog and audio controls update their state.
t.click('[data-nav="home"]');t.click('[data-action="start"][data-game="battle"]');t.click('[data-action="prepare-transform"]');t.key(' ');t.advance(1300);t.document.hidden=true;t.document.dispatchEvent(new (t.document.defaultView.Event)('visibilitychange'));assert.equal(t.run('state.game.paused'),true);t.document.hidden=false;
t.click('[data-action="home"]');t.click('[data-action="help"]');assert.equal(t.el('dialog').open,true);t.click('[data-action="close-help"]');assert.equal(t.el('dialog').open,false);
t.click('#sound-button');assert.equal(t.el('#sound-button').getAttribute('aria-pressed'),'true');t.click('#sound-button');assert.equal(t.el('#sound-button').getAttribute('aria-pressed'),'false');
// Unavailable storage is handled and game still loads.
const last=storage.get('ultra-base-v1');storage.set('ultra-base-v1','not json');const fallback=boot();assert.equal(fallback.document.querySelectorAll('.game-card').length,6);storage.set('ultra-base-v1',last);
console.log(`PASS: 6 complete game modes; actual click/keyboard handlers; quiz retries; age difficulty; 2-player transform/energy; pause including beams; shields; memory mismatch; 9 badges; ${total} persistent stars; navigation cancellation; background pause; dialog; audio toggle; corrupt-storage recovery.`);
console.log('Browser screenshots and responsive layout are not validated by this DOM test.');
