const CACHE_NAME = 'gfibion-jm-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png',
  '/lovable-uploads/e3e47c12-8857-4731-b46f-75afe5159159.png',
  '/lovable-uploads/530a9f4b-2998-47ff-8c7f-869444ff18ac.png',
  '/lovable-uploads/8dac904e-399f-485c-bbe1-d1f051fd857c.png',
  '/lovable-uploads/91d89c08-ff38-450a-b2a5-543fb578f2d3.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        self.skipWaiting();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request for fetch
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone response for cache
          const responseToCache = response.clone();
          
          // Add to cache for future offline use
          caches.open(CACHE_NAME)
            .then((cache) => {
              // Only cache GET requests and avoid caching API calls that require authentication
              if (event.request.method === 'GET' && 
                  !event.request.url.includes('/api/') &&
                  !event.request.url.includes('supabase.co')) {
                cache.put(event.request, responseToCache);
              }
            });
          
          return response;
        }).catch(() => {
          // If both cache and network fail, provide fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients
      return self.clients.claim();
    })
  );
});

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    // Handle any pending operations when connection is restored
  }
});

// Push notifications support (optional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png',
        badge: '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png'
      })
    );
  }
});