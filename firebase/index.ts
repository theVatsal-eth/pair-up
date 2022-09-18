import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

initializeApp({
  apiKey: 'AIzaSyCu6MyLVQLTLxRbQaN63mEeE48XtbrqzTg',
  authDomain: 'pair-up-17feb.firebaseapp.com',
  projectId: 'pair-up-17feb',
  storageBucket: 'pair-up-17feb.appspot.com',
  messagingSenderId: '348659092019',
  appId: '1:348659092019:web:2164f2a85123a89f8e3146',
});

const firestore = getFirestore();

export { firestore };
