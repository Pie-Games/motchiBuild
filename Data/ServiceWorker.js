const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/0816966072b00b564173283127685dc7.loader.js",
    "Build/14f310e605f34b639ef723f798176b81.framework.js.br",
    "Build/7716ebfcffa3289893661eaeec623791.data.br",
    "Build/662412d1a3ebbc3171c4761cd0731415.wasm.br",
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
