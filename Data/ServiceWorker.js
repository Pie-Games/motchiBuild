const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/ffc678ccb74161940c805decf25f7b6f.loader.js",
    "Build/e8933203207db0990f4be133ade7385c.framework.js.br",
    "Build/f5f2581addb019b0456fce52b5176675.data.br",
    "Build/8dd3582106749753c36c82e4ad45648b.wasm.br",
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
