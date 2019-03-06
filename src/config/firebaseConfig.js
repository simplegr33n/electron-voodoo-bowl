import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth' // not used yet


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDcnuP-fx2zLEW74c_QaZNXx-eIIK4M-LY",
    authDomain: "react-firebase-demo-72725.firebaseapp.com",
    databaseURL: "https://react-firebase-demo-72725.firebaseio.com",
    projectId: "react-firebase-demo-72725",
    storageBucket: "react-firebase-demo-72725.appspot.com",
    messagingSenderId: "56743861930"
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);

        this.db = firebase.database()
    }
}

export default Firebase;
