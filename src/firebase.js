// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcUOZEMGhuPnxlzhg0RImTed03yVLXNUo",
  authDomain: "mindcraft-ai-f418c.firebaseapp.com",
  projectId: "mindcraft-ai-f418c",
  storageBucket: "mindcraft-ai-f418c.appspot.com",
  messagingSenderId: "339038031126",
  appId: "1:339038031126:web:4c1f94c792a4805bd95437"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the db and auth for use in other parts of the app
export { db, auth };
