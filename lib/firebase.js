import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDo8-0DAw_Lfbe2As6j9b6EIHfxf3Nh2hk",
  authDomain: "productosnextjs.firebaseapp.com",
  projectId: "productosnextjs",
  storageBucket: "productosnextjs.firebasestorage.app",
  messagingSenderId: "488881230223",
  appId: "1:488881230223:web:61c4ba388fc5b4a177fbfa",
  measurementId: "G-K44BCQ6PDV"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export { db, collection, getDocs, addDoc, doc, getDoc };
