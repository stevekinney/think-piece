import firebase from 'firebase/app';
import 'firebase/firestore'; // NEW
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCjbGVRb0ZYCTZ-oS3pBH5tCoI1VIcn_d8",
  authDomain: "second-run.firebaseapp.com",
  databaseURL: "https://second-run.firebaseio.com",
  projectId: "second-run",
  storageBucket: "second-run.appspot.com",
  messagingSenderId: "919902331302"
};

window.firebase = firebase;

firebase.initializeApp(config);

export const firestore = firebase.firestore(); // NEW
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

firestore.settings({ timestampsInSnapshots: true });

export default firebase;
