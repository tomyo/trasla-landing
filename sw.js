self.addEventListener('install', function(event) {
  console.log('event', event)
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/sw.js',
        '/modules/photoTilt/photoTilt.js',
        '/modules/photoTilt/style.css',
        '/index.html',
        '/index.css',
        '/img/trasla.jpg',
        '/fonts/koara_regular.otf',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log('fetch', event, response);
      return response || fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
