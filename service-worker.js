const CACHE_NAME = "pwa-cache-v6"; // Increment to force updates
const STATIC_FILES = [
    "/PWA_WAN/",
    "/PWA_WAN/index.html",
    "/PWA_WAN/script.js",
    "/PWA_WAN/style.css",
    "/PWA_WAN/manifest.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: Caching files...");
            return cache.addAll(STATIC_FILES);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    console.log("Service Worker: Activated, old caches cleared.");
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});