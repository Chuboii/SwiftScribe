// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy7i5Jln3xpMlfLLM16qiYAPRekSMq220",
  authDomain: "swiftscribe-ee6a0.firebaseapp.com",
  projectId: "swiftscribe-ee6a0",
  storageBucket: "swiftscribe-ee6a0.appspot.com",
  messagingSenderId: "158662559945",
  appId: "1:158662559945:web:e3f5e73a4ee42d94cae518",
  measurementId: "G-KWTG236WTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);