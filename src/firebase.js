import firebase from "firebase"
require("firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyBxTqkpCsU01fq25prTxvielYWw_XnVU5U",
    authDomain: "thetopphotos.firebaseapp.com",
    projectId: "thetopphotos",
    storageBucket: "thetopphotos.appspot.com",
    messagingSenderId: "36126032837",
    appId: "1:36126032837:web:4fb752516b58885fefc1ac",
    measurementId: "G-V7DFW36Y8P"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db }