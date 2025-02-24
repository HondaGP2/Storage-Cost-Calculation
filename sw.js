// 检查浏览器是否支持 Service Worker
if ('serviceWorker' in navigator) {
    // 等待页面加载完成后再注册 Service Worker
    window.addEventListener('load', () => {
      // 注册 Service Worker
      navigator.serviceWorker.register('/sw.js')  // 指向你的 sw.js 文件
        .then(registration => {
          console.log('Service Worker 注册成功:', registration);
        })
        .catch(error => {
          console.log('Service Worker 注册失败:', error);
        });
    });
  } else {
    console.log('该浏览器不支持 Service Worker');
  }

  const cacheName = 'calculator-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
];

// 安装 Service Worker，缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

// 激活 Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求并使用缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果请求在缓存中，则返回缓存，否则发起网络请求
        return response || fetch(event.request);
      })
  );
});