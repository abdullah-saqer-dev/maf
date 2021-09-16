const staticCacheName = 'site-static-v1';
const assets = [
    '/',
    '/index.html',
    '/images/HG.w_1920.png',
    '/images/MG.w_1920.png',
    '/images/VG.w_1920.png',
    '/images/HG.w_1920.webp',
    '/images/HG.w_1017.webp',
    '/images/HG.w_768.webp',
    '/images/MG.w_1920.webp',
    '/images/MG.w_1017.webp',
    '/images/MG.w_768.webp',
    '/images/VG.w_1920.webp',
    '/images/VG.w_1017.webp',
    '/images/VG.w_768.webp',
    '/icons/icon-128x128.png',
    '/icons/icon-192x192.png',
    '/icons/icon-256x256.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    'https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap',
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});