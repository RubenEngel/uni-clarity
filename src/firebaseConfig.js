import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBybnFKJ8XidoCYIb1EPyUUi93evWSKo_g",
    authDomain: "uniclarity-880cf.firebaseapp.com",
    databaseURL: "https://uniclarity-880cf.firebaseio.com",
    projectId: "uniclarity-880cf",
    storageBucket: "uniclarity-880cf.appspot.com",
    messagingSenderId: "333121435549",
    appId: "1:333121435549:web:7b03eb8018ede6fa212174",
    measurementId: "G-8BTZEKCDVE"
});


const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: () => false
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'redirect',
    // signInSuccessUrl: ,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    credentialHelper: 'none',
    // Terms of service url.
    tosUrl: 'terms-of-service',
    // Privacy policy url.
    privacyPolicyUrl: 'privacy-policy'
  };

// Firebase Database
const db = firebase.firestore();

// Sign-out of Firebase
function signOut() {
  firebase.auth().signOut()
}

const authChange = (user) => firebase.auth().onAuthStateChanged(user)

//------------------------------ Firestore setup

export { authChange, signOut, db, uiConfig, firebase}
