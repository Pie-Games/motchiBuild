const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/a0e20d589a08ccf324b255055b809cb9.loader.js",
    "Build/09f6c74eb1a42f8816da41165c1e880b.framework.js.br",
    "Build/9b34a4ebd0df92594208857a5ac0a9cd.data.br",
    "Build/d295d250eaefc71b5fa74ff85dd1c018.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
