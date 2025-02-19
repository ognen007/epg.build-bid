/// <reference lib="webworker" />

// Declare firebase as any since we're using the compat libraries loaded via importScripts.
declare var firebase: any;
declare var self: ServiceWorkerGlobalScope;

// Import the Firebase scripts using importScripts
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZySvF0SYvE4BdU57Of4P1_ekfOCnGvio",
  authDomain: "epgghl.firebaseapp.com",
  projectId: "epgghl",
  storageBucket: "epgghl.appspot.com",
  messagingSenderId: "1027773975545",
  appId: "1:1027773975545:web:721e84a865e1d24874cb28",
  measurementId: "G-V6N9RPV8S5"
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload: any) => {
  console.log("[firebase-messaging-sw.ts] Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
