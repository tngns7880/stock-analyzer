const CACHE_NAME = 'ai-stock-analyzer-cache-v1';
const urlsToCache = [
  '/',
  '/stock_analyzer.html'
];

// 1. 서비스 워커 설치
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. 캐시된 자원 요청 시 반환
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 데이터가 있으면 그걸 반환, 없으면 네트워크로 요청
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

