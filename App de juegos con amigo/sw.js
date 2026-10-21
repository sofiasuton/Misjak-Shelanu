const CACHE = 'duo-v1';
const FILES = ["./","./Duo%20v2.dc.html","./support.js","./trivia-bank.js","./image-slot.js","./Backgammon.dc.html","./Battleship.dc.html","./Checkers.dc.html","./Chess.dc.html","./Connect4.dc.html","./Dots.dc.html","./DrawGuess.dc.html","./Generala.dc.html","./Hangman.dc.html","./Mancala.dc.html","./Memo.dc.html","./RPS.dc.html","./Rummy.dc.html","./Simon.dc.html","./Wordle.dc.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-180.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.pathname.includes('/rest/v1/')) return;
  const sameOrigin = u.origin === location.origin, fonts = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (!sameOrigin && !fonts) return;
  e.respondWith(fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; }).catch(() => caches.match(r, { ignoreSearch:true })));
});
