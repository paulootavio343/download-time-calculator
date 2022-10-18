const cacheName = 'download-time-calculator-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/site.webmanifest',
    '/assets/js/cookie-code.js',
    '/assets/js/live-time.js',
    '/assets/js/calculator.js',
    '/assets/js/service-worker-registration.js',
    '/assets/css/cookie-style.css',
    '/assets/css/style.css',
    '/assets/fonts/Electrolize/Electrolize-Regular.ttf',
    '/assets/fonts/Electrolize/OFL.txt',
    '/assets/fonts/Montserrat/Montserrat-Regular.ttf',
    '/assets/fonts/Montserrat/OFL.txt',
    '/assets/fonts/Open_Sans/OpenSans-Regular.ttf',
    '/assets/fonts/Open_Sans/LICENSE.txt',
    '/assets/icons/close_black_24dp.svg',
    '/assets/icons/about.txt',
];

self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    // Remove old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // Cache and network fallback
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
});
