const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/54a93fab187a6446e6ba060e0f51adb8.loader.js",
    "Build/f9dfffc94f5543a886d401a773caea4b.framework.js.br",
    "Build/9b6287d39bcba1429f4e9747af00e402.data.br",
    "Build/ec5f35daaca7b42433bcc8d2512e470a.wasm.br",
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
