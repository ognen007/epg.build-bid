import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDZySvF0SYvE4BdU57Of4P1_ekfOCnGvio",
    authDomain: "epgghl.firebaseapp.com",
    projectId: "epgghl",
    storageBucket: "epgghl.appspot.com",
    messagingSenderId: "1027773975545",
    appId: "1:1027773975545:web:721e84a865e1d24874cb28",
    measurementId: "G-V6N9RPV8S5"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted");
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
}

export async function getFcmToken(): Promise<string | null> {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BKs6fImd8pb2-bkztLR99893-3GHacanTpWkm9M0G7L-7bwYR9juPZ63olumvdiI-52sOA55iY-CORlDoVWvTss",
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.error("No FCM token available. Check permissions or browser compatibility.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
    return null;
  }
}