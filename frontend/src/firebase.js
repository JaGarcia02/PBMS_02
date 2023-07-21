import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9OFI2ov7ng2CQq57KdMEmG4JhxQIlup4",
  authDomain: "prdc-chat-ff917.firebaseapp.com",
  projectId: "prdc-chat-ff917",
  storageBucket: "prdc-chat-ff917.appspot.com",
  messagingSenderId: "841073373564",
  appId: "1:841073373564:web:a5db9eb6b653dbb9bb74f9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
