import firebase from 'firebase';
// Initialize Firebase
const config = {
    apiKey: "AIzaSyBw2Vf-CCQedkG0i_7385N_88VBz9S9330",
    authDomain: "login-7ded6.firebaseapp.com",
    databaseURL: "https://login-7ded6.firebaseio.com",
    projectId: "login-7ded6",
    storageBucket: "",
    messagingSenderId: "487699141753"
};
firebase.initializeApp(config);

export default firebase
export const db = firebase.database();
export const auth = firebase.auth();