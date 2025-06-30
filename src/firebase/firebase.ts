import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6hhayWRgHERc0XQvaDYiXYwO4TM4ie-g",
  authDomain: "extensao-rfcc-queicy.firebaseapp.com",
  projectId: "extensao-rfcc-queicy",
  storageBucket: "extensao-rfcc-queicy.firebasestorage.app",
  messagingSenderId: "66130175319",
  appId: "1:66130175319:web:fbbbaf4775cdcee87bca12",
};

// Initialize Firebase - check if app already exists
const app = getApps().find(app => app.name === 'main') || initializeApp(firebaseConfig, 'main');

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
