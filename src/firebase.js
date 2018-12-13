import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCcCh4dS3sm_VYit66Edm1Y8-vQaLqzwJk',
  authDomain: 'think-piece-live.firebaseapp.com',
  databaseURL: 'https://think-piece-live.firebaseio.com',
  projectId: 'think-piece-live',
  storageBucket: 'think-piece-live.appspot.com',
  messagingSenderId: '293948081167',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase;

export default firebase;
