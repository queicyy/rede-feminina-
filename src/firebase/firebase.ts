import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCSSirtNuWWVy6EJTO7QI7bRJeJmDE5bhI',
  authDomain: 'rfcc-itapema.firebaseapp.com',
  projectId: 'rfcc-itapema',
  storageBucket: 'rfcc-itapema.appspot.com',
  messagingSenderId: '457569534088',
  appId: '1:457569534088:web:1650b9106f5b6609231f3d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
