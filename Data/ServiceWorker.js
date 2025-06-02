const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/6d45ea94a09b8ef026d9e3b4b6d85858.loader.js",
    "Build/ac88148e47cf000af1364fab36e65211.framework.js.br",
    "Build/012e2dd41009594d74889f4a7c151b15.data.br",
    "Build/7a304ed08f5bdd0c5f40f54835124793.wasm.br",
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
