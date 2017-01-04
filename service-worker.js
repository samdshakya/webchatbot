var cacheName = 'WebChatbot-V1';
var filesToCache = [
  'https://samdshakya.github.io/webchatbot/',
  'https://samdshakya.github.io/webchatbot/index.html',
  'https://samdshakya.github.io/webchatbot/images/bot.svg',
  'https://samdshakya.github.io/webchatbot/images/send-button.svg',
  'https://samdshakya.github.io/webchatbot/scripts/app.js',
  'https://samdshakya.github.io/webchatbot/styles/inline.css',
  'https://samdshakya.github.io/webchatbot/js/jquery.min.js',
  'https://samdshakya.github.io/webchatbot/js/datadumper.js',
  'https://samdshakya.github.io/webchatbot/js/rivescript.min.js',
  'https://samdshakya.github.io/webchatbot/js/main.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});