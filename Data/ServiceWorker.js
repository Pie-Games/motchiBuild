const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/1a9a9f468d05d1b435deef442fcd3630.loader.js",
    "Build/c594758b06473d0579dcaf664b4e0831.framework.js.br",
    "Build/8fede5e490e7c931048f5d4c81b0ad44.data.br",
    "Build/f5f680dbf444ffa325472b3b223d4986.wasm.br",
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
