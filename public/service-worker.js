// sw.js (or service-worker.js)
importScripts("https://www.gstatic.com/firebasejs/9.x/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.x/firebase-messaging.js");

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDZySvF0SYvE4BdU57Of4P1_ekfOCnGvio",
  authDomain: "epgghl.firebaseapp.com",
  projectId: "epgghl",
  storageBucket: "epgghl.appspot.com",
  messagingSenderId: "1027773975545",
  appId: "1:1027773975545:web:721e84a865e1d24874cb28",
  measurementId: "G-V6N9RPV8S5"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message Received:", payload);

  // Customize notification content
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/path/to/icon.png", // Replace with your app's icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});