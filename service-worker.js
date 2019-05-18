self.addEventListener('install', function(e){
    console.log('[ServiceWorke] Install');
});

self.addEventListener('activate', function(e){
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(event){});