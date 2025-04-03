const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9853637125e801e9aae48e78dbbdcfca.loader.js",
    "Build/c358fddc4660aaca1cda3012b7632790.framework.js.unityweb",
    "Build/4b19a9ec79ad5ca12d605c8b14b4c847.data.unityweb",
    "Build/fadcca8c99819b7b168a3b89d526a7be.wasm.unityweb",
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
