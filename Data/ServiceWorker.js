const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/d39f51e52c3ffa19ef1af6e121fd32db.loader.js",
    "Build/6c7b9546a1c4e36ea0c2ce72e476c74d.framework.js.br",
    "Build/adefad641c3ef1fb7cf71b510be100ab.data.br",
    "Build/44716d38537500d54b81cc18047e3066.wasm.br",
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
