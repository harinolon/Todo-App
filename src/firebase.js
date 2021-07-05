import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAoDfCmm7mhCAAasn6WXJmlsZhCtVq2rXs",
    authDomain: "todo-app-84477.firebaseapp.com",
    projectId: "todo-app-84477",
    storageBucket: "todo-app-84477.appspot.com",
    messagingSenderId: "618564934696",
    appId: "1:618564934696:web:1756c9a317c71330e5a91d",
    measurementId: "G-2ZV1QFJKFM"
})

const db = firebaseApp.firestore();

export default db;