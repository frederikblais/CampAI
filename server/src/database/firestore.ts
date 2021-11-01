import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// API Key + FB config
const firebaseConfig = {
    apiKey: process.env.DB_API_KEY,
    authDomain: "frederik530.firebaseapp.com",
    projectId: "frederik530",
    storageBucket: "frederik530.appspot.com",
    messagingSenderId: "719042083877",
    appId: "1:719042083877:web:0ffd9dae9ea6a3829d93cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Connection to Database ok')
export const db = getFirestore(app);