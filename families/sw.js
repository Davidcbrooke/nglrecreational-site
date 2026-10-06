// NGL Recreational Families: opens instantly and works on a weak signal.
// Network first, so families always get the latest version when online.
const CACHE = 'ngl-families-v1';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/families/']).catch(() => {}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if(r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { if(res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(r.mode === 'navigate' ? '/families/' : r, copy)); } return res; })
    .catch(() => caches.match(r.mode === 'navigate' ? '/families/' : r).then(m => m || caches.match('/families/'))));
});
