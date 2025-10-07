// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQw2c4KB0ulLrK5rAo6n_YD1yUNRDoNdM",
  authDomain: "smart-waste-scanner-ea7cf.firebaseapp.com",
  projectId: "smart-waste-scanner-ea7cf",
  storageBucket: "smart-waste-scanner-ea7cf.firebasestorage.app",
  messagingSenderId: "668293378271",
  appId: "1:668293378271:web:27df992bb5a36464ac796a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

