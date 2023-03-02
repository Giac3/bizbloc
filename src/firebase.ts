import { FirebaseApp, initializeApp } from "firebase/app"
import "firebase/auth"
import { Auth, getAuth } from "firebase/auth"
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Firestore, getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDkPCSnXQS3-VJ4Wafw0_4hl4B9OmnjcfU",
    authDomain: "bizblok-ec78b.firebaseapp.com",
    projectId: "bizblok-ec78b",
    storageBucket: "bizblok-ec78b.appspot.com",
    messagingSenderId: "109242549386",
    appId: "1:109242549386:web:914cd81cd1b23c9800d973"
  }
const app: FirebaseApp = initializeApp(firebaseConfig);


export const auth: Auth = getAuth(app)
export const storage: FirebaseStorage = getStorage()
export const db: Firestore = getFirestore(app)
export default app