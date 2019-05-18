//update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
    '/offline.html',
]

self.addEventListener('install', function(evt){
    console.log('[ServiceWorker] Install');
    //prechache static resource here.
    evt.waitUntil(
        // caches.open() open cache.
        caches.open(CACH_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('activate', function(evt){
    console.log('[ServiceWorker] Activate');
    //remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if(key !== CACHE_NAME){
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(evt){
    //add fetch event handler here.
    if(evt.request.mode !== 'navigate') {
        //not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .cache( () => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('offline.html');
                    });
            })
    );
});