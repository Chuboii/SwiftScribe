// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth'
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

export const auth = getAuth()

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

googleProvider.setCustomParameters({
 params: "select_account"
})
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider)


export const signUpWithEmail = async (email, password) => {
    if (!email || !password) return
    
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithEmail = async (email, password) => {
    if (!email || !password) return
    
    return await signInWithEmailAndPassword(auth, email, password)
}

export const onAuthChanged = (callback) => onAuthStateChanged(auth, callback)

export const signUserOut = () => signOut(auth)