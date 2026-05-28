import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAs5yw5jXNvPev4dk5_e1RcEFObwYVK43k",
  authDomain: "insurance-ff9ec.firebaseapp.com",
  projectId: "nsurance-ff9ec",
  storageBucket: "insurance-ff9ec.firebasestorage.app",
  messagingSenderId: "674323252190",
  appId: "1:674323252190:web:8a25ba5f3d6de98bbc534f"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
