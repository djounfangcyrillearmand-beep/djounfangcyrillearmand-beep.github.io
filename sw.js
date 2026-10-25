const V='fcm-ultra-v4',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* Le jeu (index.html) est toujours pris en ligne en premier : une mise à jour arrive dès l'ouverture. Hors-ligne, la copie enregistrée sert. */
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html')){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put('index.html',c));return n}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(n=>{const k=n.clone();caches.open(V).then(x=>x.put(r,k));return n})))});
