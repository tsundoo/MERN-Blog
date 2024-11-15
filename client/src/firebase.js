// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-306cf.firebaseapp.com",
  projectId: "mern-blog-306cf",
  storageBucket: "mern-blog-306cf.firebasestorage.app",
  messagingSenderId: "455901327150",
  appId: "1:455901327150:web:67968d952f61f7f80954bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);