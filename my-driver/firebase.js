// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZQiKXTumfZ3R9HTes2dl-84EwLstcRTQ",
  authDomain: "transitx-driver.firebaseapp.com",
  projectId: "transitx-driver",
  storageBucket: "transitx-driver.appspot.com",
  messagingSenderId: "567367550008",
  appId: "1:567367550008:web:352c12023d2cb49f4792cd",
  measurementId: "G-D8SHSPSLD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


