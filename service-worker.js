const CACHE_NAME = "gymlog-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/main.html",
  "/me.html",
  "/schedule.html",
  "/style.css",
  "/script.js",
  "/auth.js",
  "/me.js",
  "/schedule.js",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});