import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAT390DVY7orRo2z-KreMXCDRXYVcbEkd0',
  authDomain: 'nwitter-9d7d7.firebaseapp.com',
  projectId: 'nwitter-9d7d7',
  storageBucket: 'nwitter-9d7d7.appspot.com',
  messagingSenderId: '987255372441',
  appId: '1:987255372441:web:0b9055f9569c13fcc11608',
  measurementId: 'G-GECWK7X84G',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const dbService = getFirestore();
