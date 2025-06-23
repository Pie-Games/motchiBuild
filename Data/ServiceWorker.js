const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/0462025c20438dd98c386c6288a53e52.loader.js",
    "Build/dd441c4921d9a3424c2c546c284067fb.framework.js.br",
    "Build/47580b9395e1f7105777db21200e3292.data.br",
    "Build/8deacab6cac29898e03efbb0a1f3cd47.wasm.br",
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
