import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "@firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDZySvF0SYvE4BdU57Of4P1_ekfOCnGvio",
  authDomain: "epgghl.firebaseapp.com",
  projectId: "epgghl",
  storageBucket: "epgghl.appspot.com",
  messagingSenderId: "1027773975545",
  appId: "1:1027773975545:web:721e84a865e1d24874cb28",
  measurementId: "G-V6N9RPV8S5"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);

    if(permission ==="granted"){
    const token = await getToken(messaging, {
        vapidKey:"BKs6fImd8pb2-bkztLR99893-3GHacanTpWkm9M0G7L-7bwYR9juPZ63olumvdiI-52sOA55iY-CORlDoVWvTss"
    });
    }
}