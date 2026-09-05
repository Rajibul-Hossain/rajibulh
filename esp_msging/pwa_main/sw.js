self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
    // Required to be a valid PWA, but we don't need offline caching for this project
});