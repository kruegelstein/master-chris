// Initialize Firebase
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDv_O0dK7GhDDq7wTTWi4g87_WW11BrCZ4",
  authDomain: "masterchris-5640d.firebaseapp.com",
  databaseURL: "https://masterchris-5640d.firebaseio.com",
  projectId: "masterchris-5640d",
  storageBucket: "",
  messagingSenderId: "981761666227"
};

export const firebaseApp = firebase.initializeApp(config);
