// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT0WUtfbbI8yCRUb4yINelrlPrGcS2DkY",
  authDomain: "chatapp-54f7d.firebaseapp.com",
  projectId: "chatapp-54f7d",
  storageBucket: "chatapp-54f7d.appspot.com",
  messagingSenderId: "881261162650",
  appId: "1:881261162650:web:ce18485f971ea615aaef23"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db =getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {db ,auth , provider}

