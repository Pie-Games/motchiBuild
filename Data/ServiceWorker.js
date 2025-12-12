const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/36322547a2867d2dee4bbaf0d52de4a0.loader.js",
    "Build/a14c08fe9ee19f9b70150408923c5644.framework.js.br",
    "Build/44a40be49c5f2b5e9fbf4a797c421dcf.data.br",
    "Build/1cc4095f20296bbe9dbc2b61543494f4.wasm.br",
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
