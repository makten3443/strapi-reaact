import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// npm i -g firebase-tools paketet 
// npm i firebase
//....
//.env 
//config  exportera objectet
// object.apikey

//npm i dotenv 
//require('dotenv').config()

const firebaseConfig = {
  apiKey: "AIzaSyA-xv85Ae-4ZvdweBDYgG_musGOaklwTyI",
  authDomain: "wieutprojekt.firebaseapp.com",
  databaseURL: "https://wieutprojekt.firebaseio.com",
  projectId: "wieutprojekt",
  storageBucket: "wieutprojekt.appspot.com",
  messagingSenderId: "451795026873",
  appId: "1:451795026873:web:854707e91dff42bac46c68",
  measurementId: "G-LH9EDH9EQ4"
};

//initialize 
firebase.initializeApp(firebaseConfig);



//export const googleProvider = new firebase.auth.GoogleAuthProvider();
// en till 

//export const auth = firebase.auth();
export  default firebase;