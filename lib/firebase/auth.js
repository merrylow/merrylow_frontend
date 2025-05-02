// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYHrnYqQrFgXWR-Ohmw19Ea7suHE2YAG8",
    authDomain: "merrylow-site.firebaseapp.com",
    projectId: "merrylow-site",
    storageBucket: "merrylow-site.firebasestorage.app",
    messagingSenderId: "235243221217",
    appId: "1:235243221217:web:3d6852c0da18bcbf46c7a0",
    measurementId: "G-M32405P933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);