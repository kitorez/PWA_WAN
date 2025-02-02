const CACHE_NAME = "pwa-cache-v6";
const STATIC_FILES = [
    "./",  
    "./index.html",
    "./script.js",
    "./style.css",
    "./manifest.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: Caching files...");
            return cache.addAll(STATIC_FILES);
        })
    );
});