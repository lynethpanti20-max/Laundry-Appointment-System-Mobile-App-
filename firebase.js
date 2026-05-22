import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBfhm1c8tcJZuOqtFDOxBzzhe8uSM1qLiI",
  authDomain: "quickwash-scheduler-app.firebaseapp.com",
  projectId: "quickwash-scheduler-app",
  storageBucket: "quickwash-scheduler-app.firebasestorage.app",
  messagingSenderId: "202349544247",
  appId: "1:202349544247:web:564451991e44d5fb4390b2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);