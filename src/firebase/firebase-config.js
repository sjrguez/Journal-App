import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBpAdTAjCxKD3rdz8pmEW0sxDRm8e6YfdY",
    authDomain: "react-app-6e736.firebaseapp.com",
    projectId: "react-app-6e736",
    storageBucket: "react-app-6e736.appspot.com",
    messagingSenderId: "638793712598",
    appId: "1:638793712598:web:db11797e4c108b9b7fda77"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}