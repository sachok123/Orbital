import {firebase} from '@firebase/app'
//import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC9fO1ycj9WjY-pwT_14LZbI0BaIMPXaMU",
    authDomain: "forest-d6f85.firebaseapp.com",
    projectId: "forest-d6f85",
    databaseURL: "https://forest-d6f85-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "forest-d6f85.appspot.com",
    messagingSenderId: "756087407506",
    appId: "1:756087407506:web:6962b939badc2494dcb74b",
    measurementId: "G-LF6TCYXJS1"
  };

 
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  
  export default firebase;