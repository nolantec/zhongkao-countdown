// 上海中考倒计时 · 离线缓存：首次打开后即可断网查看
// 页面更新策略：HTML 走「网络优先」（保证内容是最新的，断网时回退缓存），
// 图片/图标走「缓存优先 + 后台更新」。
// 注意：修改 index.html / 图片后如想强制所有设备刷新，把下面的版本号 +1 即可。
var CACHE = "zhongkao-countdown-v2";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/day-1.jpg",
  "./assets/day-2.jpg",
  "./assets/day-3.jpg",
  "./assets/day-4.jpg",
  "./assets/day-5.jpg",
  "./assets/day-6.jpg",
  "./assets/day-7.jpg"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  var accept = req.headers.get("accept") || "";
  var isPage = req.mode === "navigate" || accept.indexOf("text/html") > -1;

  if(isPage){
    // 网络优先：拿到最新页面；断网时用缓存打开
    e.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); }).catch(function(){});
        return res;
      }).catch(function(){
        return caches.match(req, { ignoreSearch: true }).then(function(hit){
          return hit || caches.match("./index.html");
        });
      })
    );
    return;
  }

  // 静态资源：先用缓存，后台顺手更新
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function(hit){
      var fresh = fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); }).catch(function(){});
        return res;
      }).catch(function(){ return hit; });
      return hit || fresh;
    })
  );
});
