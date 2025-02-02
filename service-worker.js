const CACHE_NAME = "pwa-cache-v4"; // Increment cache version to force an update
const STATIC_FILES = [
    "/",
    "/index.html",
    "/script.js",
    "/style.css",
    "/manifest.json"
];

// Install service worker and cache files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: Caching files...");
            return cache.addAll(STATIC_FILES);
        }).catch(error => console.error("Service Worker: Caching failed", error))
    );
});

// Activate service worker and delete old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        }).then(() => {
            console.log("Service Worker: Old caches deleted.");
            return self.clients.claim(); // Ensure all clients are controlled immediately
        })
    );
});

// Intercept fetch requests and serve from cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    // Cache the new network response (except for non-GET requests)
                    if (event.request.method === "GET") {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });
            });
        }).catch(() => {
            console.warn("Service Worker: Fetch failed, user might be offline.");
        })
    );
});

// Handle messages from the client (checking cache)
self.addEventListener("message", async (event) => {
    if (event.data === "checkCaches") {
        const cacheNames = await caches.keys();
        console.log("Service Worker Cache Names:", cacheNames);
    }
});