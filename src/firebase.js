import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKsySXMiEoAh7oGX6nl8C-5dhUXAofHjs",
  authDomain: "shopping-eca38.firebaseapp.com",
  projectId: "shopping-eca38",
  storageBucket: "shopping-eca38.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "370486321369",
  appId: "1:370486321369:web:ae2a9bf36124558f19dec8",
  measurementId: "G-RW3LRLPJT9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Renamed to be more descriptive