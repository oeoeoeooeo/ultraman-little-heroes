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
t.advance(6500);assert.equal(t.run('state.game.warning'),true);t.key('s');t.advance(6000);assert.equal(t.run('state.game.warning'),false);assert.match(t.el('#battle-message').textContent,/挑戰成功/);
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

// Every new authored entry has a valid owner, asset and independently reviewable source.
const adventure=JSON.parse(fs.readFileSync(path.join(root,'adventure-catalogue.json'),'utf8'));
const more=boot();
for(const [key,constant,count] of [['forms','FORMS',55],['devices','DEVICES',60],['moves','MOVES',90],['monsters','MONSTERS',30]]){
 assert.equal(adventure[key].length,count);assert.deepEqual(more.json(constant),adventure[key]);assert.equal(new Set(adventure[key].map(x=>x.id)).size,count);
 for(const x of adventure[key]){assert.match(x.source,/^https:\/\/(zh\.wikipedia\.org|tsuburaya-prod\.com)\//);for(const id of x.owners||[x.heroId].filter(Boolean))assert.ok(catalogue.some(h=>h.id===id));}
 more.click('[data-nav="heroes"]');more.click(`[data-action="encyclopedia-tab"][data-tab="${key}"]`);assert.equal(more.document.querySelectorAll('.extra-card').length,count);
}
for(const m of adventure.monsters)assert.equal(fs.readFileSync(path.join(root,'assets','monster-'+m.id+'.png')).subarray(0,8).toString('hex'),'89504e470d0a1a0a');
// Each form question contains only forms of its own hero and remains retryable.
for(const f of adventure.forms){more.run(`startQuiz('forms');state.game.deck[0]=FORMS.find(f=>f.id===${JSON.stringify(f.id)});nextQuiz()`);const opts=more.json('state.game.options');assert.equal(opts.length,3);assert.ok(opts.every(o=>o.heroId===f.heroId));assert.equal(opts.filter(o=>o.id===f.id).length,1);}
// All added non-weapon devices participate; shared owners never appear as wrong choices.
for(const d of adventure.devices.filter(d=>d.kind!=='武器')){more.run(`startQuiz('device');state.game.deck[0]=deviceQuestion(DEVICES.find(d=>d.id===${JSON.stringify(d.id)}));nextQuiz()`);const opts=more.json('state.game.options');assert.equal(opts.filter(o=>d.owners.includes(o.id)).length,1);assert.equal(more.run('state.game.deck[0].device'),d.name);}
function setupMore(monsterId,heroId='tiga',formId='multi'){
 more.run(`leave();beginBattle({coop:false,heroes:[HEROES.find(h=>h.id===${JSON.stringify(heroId)})],forms:[${JSON.stringify(formId)}],monsterId:${JSON.stringify(monsterId)}})`);
}
setupMore('red-king');more.advance(6500);more.key('d');assert.equal(more.run('activeForm(state.game,0).role'),'power');more.key('a');assert.equal(more.run('state.game.challengeSolved'),true);assert.equal(more.run('state.game.hp'),97);assert.equal(more.run('state.game.energy[0]'),2);
const beforeForm=more.run('state.game.forms[0]');more.key('Escape');more.key('d');assert.equal(more.run('state.game.forms[0]'),beforeForm);more.key('Escape');
setupMore('melba','decker','decker-flash');more.key('d');more.key('d');assert.equal(more.run('activeForm(state.game,0).role'),'speed');more.advance(6500);more.key('a');assert.equal(more.run('state.game.challengeSolved'),true);
for(const monsterId of ['baltan','gubila','pucchi']){setupMore(monsterId);more.advance(6500);assert.equal(more.document.querySelectorAll('[data-action="challenge-target"]').length,3);const target=more.run('state.game.targetIndex');more.click(`[data-action="challenge-target"][data-index="${(target+1)%3}"]`);assert.equal(more.run('state.game.challengeSolved'),false);more.key('Escape');more.click(`[data-action="challenge-target"][data-index="${target}"]`);assert.equal(more.run('state.game.challengeSolved'),false);more.key('Escape');more.click(`[data-action="challenge-target"][data-index="${target}"]`);assert.equal(more.run('state.game.challengeSolved'),true);assert.equal(more.run('state.game.energy[0]'),1);}
// Friendly monsters are a rescue, and calming forms have an actual rescue bonus.
setupMore('pucchi','cosmos','cosmos-luna');assert.match(more.el('[data-action="attack"]').textContent,/送點心/);for(let j=0;j<2;j++){for(let i=0;i<4;i++){more.key('a');more.advance(200);}more.key(' ');more.advance(1000);}assert.match(more.el('.result h2').textContent,/好朋友救援成功/);
setupMore('gomora');const originalMove=more.run('chosenMove(state.game).id');more.click('[data-action="pick-move"]:last-child');assert.notEqual(more.run('chosenMove(state.game).id'),originalMove);more.key('Escape');const pausedMove=more.run('state.game.moveId');assert.equal(more.el('[data-action="pick-move"]:first-child').disabled,true);more.el('[data-action="pick-move"]:first-child').click();assert.equal(more.run('state.game.moveId'),pausedMove);
more.run('leave()');
console.log('PASS: 55 forms, 60 items, 90 moves, 30 monsters; owner-safe quizzes, same-hero form choices, power/speed bonuses, pause-protected changes, clone/burrow targets, friendly rescue and calming bonus.');

// Player-focused journey: no bypass, duplicate reward, stale timer or forged sticker.
storage.set('ultra-base-v1',JSON.stringify({sound:false,collection:['pucchi','pucchi','<img onerror=alert(1)>'],team:['bad','zero']}));
let play=boot();assert.deepEqual(play.json('state.collection'),['pucchi']);assert.deepEqual(play.json('state.team'),['tiga','zero']);
play.click('[data-action="start-quest"]');assert.equal(play.run('state.game.type'),'quest-map');assert.equal(play.document.querySelectorAll('.quest-route li').length,3);
const route=play.json('state.game.quest.route');assert.equal(new Set(route).size,3);
play.click('[data-action="quest-transform"]');play.key(' ');play.advance(1300);assert.equal(play.run('state.game.quest.stage'),0);
play.run('state.game.energy=[4,0];updateEnergy()');play.key(' ');assert.equal(play.run('state.game.hp'),100,'must find clues before beam');assert.equal(play.el('#combo-button').disabled,true);
play.key('1');play.key('1');assert.equal(play.run('state.game.questFound'),1,'same star cannot be counted twice');
play.key('Escape');play.key('2');assert.equal(play.run('state.game.questFound'),1);play.advance(20000);assert.equal(play.run('state.game.questFound'),1);play.key('Escape');play.key('2');play.key('3');assert.equal(play.run('state.game.questFound'),3);
function winStage(t){for(let j=0;j<2;j++){for(let i=0;i<4;i++){t.key('a');t.advance(200);}t.key(' ');t.advance(1100);}}
winStage(play);assert.equal(play.run('state.game.type'),'quest-checkpoint');assert.equal(play.run('state.collection.includes('+JSON.stringify(route[0])+')'),true);assert.equal(play.run('state.completed.battle'),0,'journey award only at end');
for(let stage=1;stage<3;stage++){
 play.click('[data-action="quest-next"]');assert.equal(play.run('state.game.quest.stage'),stage);play.advance(9000);assert.equal(play.run('state.game.warning'),false,'story targets have no time limit');
 for(let k=0;k<3;k++){const answer=play.run('state.game.questTarget');play.key(String((answer+1)%3+1));assert.equal(play.run('state.game.questFound'),k);play.key(String(answer+1));}
 winStage(play);
}
assert.equal(play.run('state.questRuns'),1);assert.equal(play.run('state.completed.battle'),1);assert.equal(play.run('state.stars'),20);assert.ok(route.every(id=>play.run('state.collection.includes('+JSON.stringify(id)+')')));const earnedCount=play.run('state.collection.length');play.click('.result .primary');assert.equal(play.run('state.game.type'),'quest-map','replay must return to the rescue journey');assert.equal(play.run('state.stars'),20);
play.run('rememberMonster(MONSTERS.find(m=>m.id===\'pucchi\'))');assert.equal(play.run('state.collection.length'),earnedCount,'no duplicated sticker');
play.click('[data-action="badges"]');assert.equal(play.document.querySelectorAll('.sticker.collected').length,earnedCount);const reloaded=boot();assert.equal(reloaded.run('state.collection.length'),earnedCount);assert.equal(reloaded.run('state.questRuns'),1);
// Holding stops on release, pause and navigation, and does not create a delayed attack.
play.run('leave();beginBattle({coop:false,heroes:[HEROES[2]],forms:[\'multi\'],monsterId:\'gomora\'})');
function down(t){const e=new t.document.defaultView.Event('pointerdown',{bubbles:true});Object.assign(e,{button:0,pointerId:1});t.el('[data-action="attack"]').dispatchEvent(e);}
down(play);play.advance(1000);assert.equal(play.run('state.game.energy[0]'),4);play.document.dispatchEvent(new play.document.defaultView.Event('pointerup'));const hp=play.run('state.game.hp');play.advance(2000);assert.equal(play.run('state.game.hp'),hp);
down(play);play.key('Escape');play.advance(1000);assert.equal(play.run('state.game.hp'),hp);play.key('Escape');down(play);play.click('[data-nav="heroes"]');play.advance(2000);assert.equal(play.run('state.game'),null);
// Co-op: one extra attack when full sends exactly one energy, once per pilot per fight.
play.run('leave();beginBattle({coop:true,heroes:[HEROES[2],HEROES[3]],forms:[\'multi\',\'zero-base\'],monsterId:\'gomora\'})');for(let i=0;i<4;i++){play.key('a');play.advance(200);}play.key('a');play.advance(200);assert.deepEqual(play.json('state.game.energy'),[4,1]);play.key('a');assert.deepEqual(play.json('state.game.energy'),[4,1]);
play.run('leave()');console.log('PASS: complete three-stage journey, compulsory clues, no countdown, wrong/repeat answers, final-only reward, persistent sanitized stickers, held charge cancellation and one-use co-op assistance.');
