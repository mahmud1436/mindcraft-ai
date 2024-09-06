import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAcUOZEMGhuPnxlzhg0RImTed03yVLXNUo",
  authDomain: "mindcraft-ai-f418c.firebaseapp.com",
  projectId: "mindcraft-ai-f418c",
  storageBucket: "mindcraft-ai-f418c.appspot.com",
  messagingSenderId: "339038031126",
  appId: "1:339038031126:web:4c1f94c792a4805bd95437"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
