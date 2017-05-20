/* import the cache polyfill in case we're using an old browser */
importScripts('cache-polyfill.js');

/* cache the necessary files */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('twinepm').then(function(cache) {
            return cache.addAll([
                '/twinepm/tpmClient',
                '/twinepm/tpmClient/index.html',
            ]);
        })
    );
});

/* fetch the necessary files */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response && /\.map\.(js|css)$/i.test(response.url)) {
                return fetch(response);
            }

            /* Cache hit - return response */
            if (response) {
                return response;
            }

            /* IMPORTANT: Clone the request. A request is a stream and
             * can only be consumed once. Since we are consuming this
             * once by cache and once by the browser for fetch, we need
             * to clone the response. */
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(function(response) {
                /* Check if we received a valid response */
                if (!response ||
                    response.status !== 200 ||
                    response.type !== 'basic')
                {
                    return response;
                }

                /* IMPORTANT: Clone the response. A response is a
                 * stream and because we want the browser to consume
                 * the response as well as the cache consuming the
                 * response, we need to clone it so we have two 
                 * streams. */
                var responseToCache = response.clone();

                caches.open('twinepm').then(function(cache) {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});