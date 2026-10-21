const assert=require('node:assert/strict');
module.exports=function spaceLogic(boot,pointer,storage){
 const start=(solo=false)=>{storage.clear();const t=boot();t.run(`state.sound=false;state.player='together';state.spaceLevels=[1,0]`);t.click('.game-card[data-game="space"]');if(solo)t.click('[data-action="space-mode"][data-index="1"]');t.click('[data-action="space-begin"]');t.advance(1440);return t;};
 const move=(t,i,lane)=>{while(t.run(`state.game.lanes[${i}]`)!==lane){const dir=t.run(`state.game.lanes[${i}]`)<lane?1:-1;t.click(`[data-action="space-move"][data-index="${i}"][data-dir="${dir}"]`);}};
 const target=(t,i,kind)=>t.run(`state.game.objects[${i}].findIndex(o=>o.kind==='${kind}')`);
 const endWave=t=>{const left=t.run('4700-(state.game.clock-state.game.waveStart)');t.advance(Math.max(0,left)+60);};
 const t=start();assert.deepEqual(t.json('state.game.levels'),[1,0]);assert.equal(t.run('state.game.count'),2);
 // A shot follows the lane in which it was fired; pause freezes its pending impact.
 for(let i=0;i<2;i++){move(t,i,target(t,i,'rock'));t.click(`[data-action="space-fire"][data-index="${i}"]`);}
 const rockLane=t.run('state.game.lanes[0]');move(t,0,(rockLane+1)%3);
 t.key('Escape');const clock=t.run('state.game.clock');t.advance(2500);assert.equal(t.run('state.game.clock'),clock);assert.deepEqual(t.json('state.game.cleared'),[0,0]);assert.equal(t.el('[data-action="space-fire"]').disabled,true);
 t.key('Escape');t.advance(240);assert.deepEqual(t.json('state.game.cleared'),[1,1]);assert.equal(t.run(`state.game.objects[0][${rockLane}].cleared`),true);
 t.run('spaceMove(-1,1);spaceMove(9,1);spaceFire(NaN);spaceReady(5)');
 for(let i=0;i<2;i++)move(t,i,target(t,i,'star'));t.advance(2800);assert.deepEqual(t.json('state.game.stars'),[1,0],'each pilot gets their own travel time');t.advance(1200);assert.deepEqual(t.json('state.game.stars'),[1,1]);
 t.click('[data-action="home"]');t.advance(5000);assert.equal(t.run('state.game'),null);assert.equal(t.run('state.stars'),0,'abandoning never pays a completion reward');
 // Both simultaneous contacts own their repeat loop; releasing either preserves the other.
 const touch=start();
 for(let i=0;i<2;i++)move(touch,i,target(touch,i,'rock'));
 pointer(touch,'pointerdown','[data-action="space-fire"][data-index="0"]',801);pointer(touch,'pointerdown','[data-action="space-fire"][data-index="1"]',802);assert.equal(touch.run('heldPointers.size'),2);
 touch.advance(250);assert.deepEqual(touch.json('state.game.cleared'),[1,1]);pointer(touch,'pointerup',null,801);const cooldown=touch.run('state.game.cooldown[0]');touch.advance(800);assert.equal(touch.run('state.game.cooldown[0]'),cooldown);assert.ok(touch.run('state.game.cooldown[1]')>cooldown);assert.equal(touch.run('heldPointers.size'),1);
 pointer(touch,'pointercancel',null,802);assert.equal(touch.run('heldPointers.size'),0);touch.document.hidden=true;touch.document.dispatchEvent(new touch.document.defaultView.Event('visibilitychange'));assert.equal(touch.run('state.game.paused'),true);
 touch.click('[data-action="home"]');touch.advance(5000);assert.equal(touch.run('state.game'),null);
 // Complete the real three-sector flow through controls and the game's virtual clock.
 const g=start();
 for(let chapter=0;chapter<2;chapter++){
  for(let wave=1;wave<=4;wave++){
   assert.equal(g.run('state.game.wave'),wave);assert.equal(g.run('state.game.chapter'),chapter);
   for(let i=0;i<2;i++){
    if(chapter===1){move(g,i,target(g,i,'rock'));g.click(`[data-action="space-fire"][data-index="${i}"]`);}
    move(g,i,target(g,i,'star'));
   }
   endWave(g);
  }
  assert.equal(g.run('state.game.phase'),'checkpoint');const button=g.el('[data-action="space-next"]');g.advance(1200);assert.equal(g.el('[data-action="space-next"]'),button,'checkpoint control stays stable between animation ticks');g.click('[data-action="space-next"]');
 }
 assert.deepEqual(g.json('state.game.stars'),[8,8]);assert.deepEqual(g.json('state.game.cleared'),[4,4]);assert.equal(g.run('state.stars'),0);
 for(let wave=0;wave<3;wave++){move(g,0,target(g,0,'core'));g.key('s');g.advance(240);if(wave<2)endWave(g);}
 assert.deepEqual(g.json('state.game.hits'),[3,0]);assert.equal(g.run('state.game.phase'),'boss','one pilot cannot finish for the other');
 for(let wave=0;wave<3;wave++){if(wave)endWave(g);move(g,1,target(g,1,'core'));g.key('k');g.advance(240);}
 assert.deepEqual(g.json('state.game.hits'),[3,3]);assert.equal(g.run('state.game.phase'),'ready');assert.equal(g.el('[data-action="space-fire"]').disabled,true);
 g.key('s');g.advance(5000);assert.equal(g.run('state.game.phase'),'ready');assert.deepEqual(g.json('state.game.ready'),[true,false]);assert.equal(g.run('state.stars'),0);
 g.key('k');assert.equal(g.run('state.game.phase'),'beam');g.key('Escape');g.advance(5000);assert.equal(g.run('state.game.phase'),'beam');g.key('Escape');g.advance(2400);
 assert.equal(g.run('state.game.type'),'result');assert.equal(g.run('state.stars'),36);assert.equal(g.run('state.completed.space'),1);g.advance(5000);assert.equal(g.run('state.stars'),36);
 g.click('[data-action="start"][data-game="space"]');assert.equal(g.run('state.game.solo'),false);assert.deepEqual(g.json('state.spaceLevels'),[1,0]);g.click('[data-action="home"]');
 const solo=start(true);assert.equal(solo.run('state.game.count'),1);solo.key('ArrowLeft');assert.equal(solo.run('state.game.lanes[0]'),0);solo.key('j');assert.deepEqual(solo.json('state.game.lanes'),[0]);
 // Collisions keep the adventure going, without subtracting earned energy.
 move(solo,0,target(solo,0,'rock'));solo.advance(2850);assert.deepEqual(solo.json('state.game.bumps'),[1]);assert.equal(solo.run('state.game.type'),'space');solo.click('#help-button');assert.equal(solo.run('state.game.paused'),true);solo.click('[data-action="close-help"]');assert.equal(solo.run('state.game.paused'),true);
 solo.click('[data-action="home"]');storage.clear();
 console.log('PASS: space rescue three-sector controls, per-pilot speed, projected shots/pause, independent held touch/release/cancel, safe collisions, both required boss contributions, retained readiness, exact-once reward, replay, solo, help/background and navigation cleanup.');
};
