import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyAudsj8rc2TsUjwUx1ISskz-FPwEYuYlCw',
  authDomain: 'think-piece.firebaseapp.com',
  databaseURL: 'https://think-piece.firebaseio.com',
  projectId: 'think-piece',
  storageBucket: 'think-piece.appspot.com',
  messagingSenderId: '98218894562',
};

firebase.initializeApp(config);

window.firebase = firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserDocument = async (user, additionalData) => {
  // If there is no user, let's not do this.
  if (!user) return;

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  const userDocument = await firestore
    .collection('users')
    .doc(uid)
    .get();

  return { uid, ...userDocument.data() };
};

firestore.settings({ timestampsInSnapshots: true });

export default firebase;
