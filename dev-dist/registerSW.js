if('serviceWorker' in navigator) navigator.serviceWorker.register('/dev-sw.js?dev-sw', { scope: '/', type: 'classic' })

if('serviceWorker' in navigator) navigator.serviceWorker.register("/service-worker.js?service-worker", { scope: "/", type: "classic" });