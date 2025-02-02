const CACHE_NAME = "pwa-cache-v6";
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