import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyACSN2Ylv6uEcGXrcjlGUt3mEcXAUmLmYM",
  authDomain: "stonesoup-2c869.firebaseapp.com",
  databaseURL: "https://stonesoup-2c869.firebaseio.com",
  projectId: "stonesoup-2c869",
  storageBucket: "stonesoup-2c869.appspot.com",
  messagingSenderId: "18965843734",
  appId: "1:18965843734:web:463c59bfaadfb502d98a37",
  measurementId: "G-76LHQY0J36"
};
firebase.initializeApp(firebaseConfig)

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
