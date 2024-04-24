 import { initializeApp } from "firebase/app";
 import { getFirestore } from 'firebase/firestore';
 import { getStorage } from 'firebase/storage'
 import { getAuth } from 'firebase/auth'

const firebaseApp = {
  apiKey: "AIzaSyDQ40S9LEJ59fB7GpUar_Ejh9mWS6lvwK0",  
  authDomain: "lab-agendamento.firebaseapp.com",   projectId: "lab-agendamento",
  storageBucket: "lab-agendamento.appspot.com",
  messagingSenderId: "477253349616",
  appId: "1:477253349616:web:baa3022d482d3d35411235",
  measurementId: "G-B9MRTVP66N"
 };

 const app = initializeApp(firebaseApp)

 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export const auth = getAuth(app)

