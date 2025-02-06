const CACHE_NAME = "pwa-cache-v7"; // Increment this every time we update
const STATIC_FILES = [
    "/PWA_WAN/",
    "/PWA_WAN/index.html",
    "/PWA_WAN/script.js",
    "/PWA_WAN/style.css",
    "/PWA_WAN/manifest.json"
];

// Install Event - Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: Caching files...");
            return cache.addAll(STATIC_FILES);
        })
    );
});

// Activate Event - Delete Old Caches
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

// Fetch Event - Always Try Network First
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            return response;
        }).catch(() => {
            return caches.match(event.request);
        })
    );
});