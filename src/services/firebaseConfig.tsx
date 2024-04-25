 import { initializeApp } from "firebase/app";
 import { getFirestore } from 'firebase/firestore';
 import { getStorage } from 'firebase/storage'
 import { getAuth } from 'firebase/auth'

const firebaseApp = {
  apiKey: import.meta.env.VITE_SERVICE_ACCESS_API_KEY,
  authDomain: "lab-agendamento.firebaseapp.com",
  projectId: "lab-agendamento",
  storageBucket: "lab-agendamento.appspot.com",
  messagingSenderId: "477253349616",
  appId: "1:477253349616:web:baa3022d482d3d35411235",
  measurementId: "G-B9MRTVP66N"
 };

 const app = initializeApp(firebaseApp)

 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export const auth = getAuth(app)

