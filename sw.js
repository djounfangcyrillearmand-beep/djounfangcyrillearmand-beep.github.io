const V='fcm-ultra-pub-1',F=['./','index.html','manifest.webmanifest','pub-config.js','icon-192.png','icon-512.png','icon-maskable-512.png','privacy.html','terms.html','about.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* Le jeu est pris en ligne d'abord (mises à jour immédiates), la copie enregistrée sert hors-ligne. */
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(r.mode==='navigate'||/\.(html|js)$/.test(u.pathname)||u.pathname.endsWith('/')){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(n=>{const k=n.clone();caches.open(V).then(x=>x.put(r,k));return n})))});
