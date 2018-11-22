// Initialize Firebase
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDqTbBeG6PhBKGz2v3k2OOx9C-zwTHqDNY",
  authDomain: "master-2cd3a.firebaseapp.com",
  databaseURL: "https://master-2cd3a.firebaseio.com",
  projectId: "master-2cd3a",
  storageBucket: "master-2cd3a.appspot.com",
  messagingSenderId: "955481318327"
};

export const firebaseApp = firebase.initializeApp(config);
