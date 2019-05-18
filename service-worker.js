//update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
    '/offline.html',
]



self.addEventListener('install', function(event){
    console.log('[ServiceWorker] Install');
    //prechache static resource here.
    event.waitUntil(
        // caches.open() open cache.
        caches.open(CACH_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('activate', function(event){
    console.log('[ServiceWorker] Activate');
    //remove previous cached data from disk.
    event.waitUntil(
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

self.addEventListener('fetch', function(event){
    //add fetch event handler here.
    if(event.request.mode !== 'navigate') {
        //not a page navigation, bail.
        return;
    }
    event.respondWith(
        fetch(event.request)
            .cache( () => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('offline.html');
                    });
            })
    );
});