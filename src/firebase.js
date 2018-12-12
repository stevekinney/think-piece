import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAudsj8rc2TsUjwUx1ISskz-FPwEYuYlCw',
  authDomain: 'think-piece.firebaseapp.com',
  databaseURL: 'https://think-piece.firebaseio.com',
  projectId: 'think-piece',
  storageBucket: 'think-piece.appspot.com',
  messagingSenderId: '98218894562',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });

export default firebase;
