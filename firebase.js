import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyD640tg70IDxtLekY6Cntma78P5o62_uIY",
  authDomain: "rey-walker-nmax.firebaseapp.com",
  projectId: "rey-walker-nmax",
  storageBucket: "rey-walker-nmax.firebasestorage.app",
  messagingSenderId: "793511355795",
  appId: "1:793511355795:web:7365c52e01dccafe36f466"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);