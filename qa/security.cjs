'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const version=JSON.parse(read('package.json')).version;
const cfg=JSON.parse(read('firebase.json'));
assert.deepEqual(Object.keys(cfg),['hosting']);
assert.equal(cfg.hosting.public,'dist');
assert.ok(!cfg.hosting.rewrites&&!cfg.functions&&!cfg.firestore&&!cfg.storage,'No backend deployment');
const headers=cfg.hosting.headers[0].headers;
const csp=headers.find(h=>h.key==='Content-Security-Policy').value;
assert.ok(csp.includes("connect-src 'none'"));
assert.ok(csp.includes("script-src 'self';"));
assert.ok(csp.includes("frame-ancestors 'none'"));
assert.ok(headers.some(h=>h.key==='Permissions-Policy'&&h.value.includes('microphone=()')));
const app=read('app.js');
assert.ok(!/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|importScripts)\b/.test(app),'No network/API/analytics runtime');
assert.ok(!/\b(?:eval|Function)\s*\(/.test(app),'No dynamic code evaluation');
const secrets=[/AIza[0-9A-Za-z_-]{30,}/,/\bgh[pousr]_[A-Za-z0-9]{20,}/,/\bgithub_pat_[A-Za-z0-9_]{20,}/,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{24,}/,/"private_key"\s*:/,/"refresh_token"\s*:/];
const allow=new Set(['index.html','style.css','app.js','404.html','version.json',...JSON.parse(read('asset-manifest.json')).map(f=>'assets/'+f)]);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk(path.join(root,'dist'));
assert.equal(files.length,allow.size);
for(const file of files){
  const relative=path.relative(path.join(root,'dist'),file).split(path.sep).join('/');
  assert.ok(allow.has(relative),`Forbidden deployed file: ${relative}`);
  if(/\.(?:js|html|css|json|svg)$/.test(file)){
    const content=fs.readFileSync(file,'utf8');
    for(const pattern of secrets)assert.ok(!pattern.test(content),`Potential credential in ${relative}`);
    assert.ok(!/\/Users\/|\/private\/tmp\/|service-account|firebaseConfig/.test(content),`Private configuration/path in ${relative}`);
  }
}
for(const name of ['index.html','style.css','app.js','404.html'])assert.ok(fs.readFileSync(path.join(root,'dist',name)).equals(fs.readFileSync(path.join(root,name))),`${name} matches reviewed source`);
assert.equal(JSON.parse(read('dist/version.json')).version,version);
assert.ok(read('index.html').includes(`content="${version}"`));
assert.ok(read('index.html').includes(`v${version}`));
assert.ok(!/<script(?![^>]*src=)[^>]*>/i.test(read('index.html')),'No inline scripts in hosted HTML');
assert.ok(!/on(?:click|load|error|mouseover)\s*=/i.test(read('index.html')),'No inline event handlers');
for(const match of read('index.html').matchAll(/(?:src|href)="([^"#]+)"/g))assert.ok(!/^https?:\/\//i.test(match[1]),'No remote startup dependency');
// Local progress is untrusted data; injecting it must never create DOM markup.
assert.ok(app.includes('Number(saved.stars)'),'Progress display must be numeric');
console.log(`PASS: v${version}; exactly ${files.length} whitelisted static files; no credentials, network APIs, remote startup dependencies or backend; CSP blocks all connections and inline scripts.`);
