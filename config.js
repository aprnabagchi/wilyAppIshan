import firebase from 'firebase';

require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBRnlWoY9S1llPaqqD5c4wXKMu721JFkLM",
  authDomain: "wili-app-3df5f.firebaseapp.com",
  projectId: "wili-app-3df5f",
  storageBucket: "wili-app-3df5f.appspot.com",
  messagingSenderId: "38594783237",
  appId: "1:38594783237:web:0144414650e042069b546c",
  databaseURL:'https://console.firebase.google.com/project/undefined/firestore/data/'
};

firebase.initializeApp(firebaseConfig)
export default firebase.firestore()