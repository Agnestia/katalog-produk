import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Konfigurasi dari Firebase Anda yang benar
const firebaseConfig = {
  apiKey: "AIzaSyA9Ej7P3ycVplPyBc0daS9F-GePkGxl4i0",
  authDomain: "katalog-victory-snack.firebaseapp.com",
  projectId: "katalog-victory-snack",
  storageBucket: "katalog-victory-snack.firebasestorage.app",
  messagingSenderId: "727491621205",
  appId: "1:727491621205:web:809a2a20204531849dffdc",
  measurementId: "G-WYFH56S5ES"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor layanan
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);