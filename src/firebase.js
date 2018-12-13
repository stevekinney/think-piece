import firebase from 'firebase/app';
import 'firebase/firestore';

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

firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase;

export default firebase;
