/* eslint-disable no-restricted-globals */
let doCache = false;
let CACHE_NAME = 'my-pwa-cache-v0.1.01';

const CACHE_FILES = [
    '/',
    '/index.html',
    '/tv',
    '/restourant',
    '/basket',
    '/excursions',
    '/ex/*',
    '/service',
    '/main'
];
self.addEventListener("activate", event => {
    console.log('activate')
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(caches.keys().then(keyList =>
            Promise.all(keyList.map(key => {
                if (!cacheWhitelist.includes(key)) {
                    console.log('Deleting cache: ' + key)
                    return caches.delete(key);
                }
            }))
        )
    );
});

self.addEventListener('install', function (e) {
    if (doCache) {
        e.waitUntil(
            // после установки service worker
            // открыть новый кэш
            caches.open(CACHE_NAME).then(function (cache) {
                fetch("asset-manifest.json").then(response => {
                    response.json()
                }).then(assets => {

                    console.log('cached');
                    // добавляем все URL ресурсов, которые хотим закэшировать
                    return cache.addAll(CACHE_FILES)
                })
            })
        );
    }
});

//В fetch описываем логику работы при запросе. В нашем случае применяем стратегию Cache First

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request);
//         })
//     );
// });

self.addEventListener('fetch', function (event) {
    if (!navigator.onLine) {
        if (event.request.url === 'https://firegzhel.ru/asset-manifest.json') { //! firegzhel.ru заменить
            event.waitUntil(
                this.registration.showNotification("hello", { //
                    body: "the internet is not working!",
                }))
        }
    }
    if (doCache) {
        event.respondWith(fetch(event.request).then(function (res) {
                if (res) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        if (
                            event.request.url.indexOf("http") === 0 ||
                            event.request.url.indexOf("https") === 0
                        ) {
                            cache.put(event.request.url, res.clone());
                            return res;
                        }
                    });
                }
            }).catch(function () {
                return caches.match(event.request);
            })
        );
    }
})


