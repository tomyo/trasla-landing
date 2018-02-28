self.addEventListener('install', function(event) {
  console.log('Install Event', event);
  event.waitUntil(precache());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fromCache(event.request));
  event.waitUntil(update(event.request));
});

function precache() {
  return caches.open('v1').then(function (cache) {
    return cache.addAll([
      '/sw.js',
      '/modules/photoTilt/photoTilt.js',
      '/modules/photoTilt/style.css',
      '/index.html',
      '/index.css',
      '/img/trasla.jpg',
      '/fonts/Arber-Vintage-Free.woff',
    ]);
  });
}

function fromCache(request) {
  return caches.open('v1').then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open('v1').then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
