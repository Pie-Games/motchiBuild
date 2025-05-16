const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/950db911f4f64a528c992d35f35335a3.loader.js",
    "Build/af8685e6295e9cb21d2c39f016bdc1a7.framework.js.br",
    "Build/001c6782dc869d553faea25bbc39529f.data.br",
    "Build/f5924b2ba2cf0f57048136cdea5c990d.wasm.br",
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
