// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj2Qtt12HxbydTkxdWuuCoKh_pyKtdcqA",
  authDomain: "oneflix-b1e34.firebaseapp.com",
  projectId: "oneflix-b1e34",
  storageBucket: "oneflix-b1e34.firebasestorage.app",
  messagingSenderId: "158744824421",
  appId: "1:158744824421:web:f0a60ed06be1912b8b948c",
  measurementId: "G-TMHQ1Q4W92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
