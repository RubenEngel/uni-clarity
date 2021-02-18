import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
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
      firebase.auth.EmailAuthProvider.PROVIDER_ID,      
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
