import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCkUIaXf-SsKxtBOCJ-NHEZdtSNmno3YhI",
    authDomain: "fem-learn-a43c4.firebaseapp.com",
    databaseURL: "https://fem-learn-a43c4.firebaseio.com",
    projectId: "fem-learn-a43c4",
    storageBucket: "fem-learn-a43c4.appspot.com",
    messagingSenderId: "793663122044",
    appId: "1:793663122044:web:bbe6941f244c479924b7f9"
};

firebase.initializeApp(firebaseConfig);

// Temp, only for debugingn purposes
window.firebase = firebase;

export default firebase;