import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/firebase-storage';

const config = {
  apiKey: "AIzaSyDQowf1hDdsvThHZ5MpnMaeB_L4gp8hovw",
  authDomain: "jetcake-1180a.firebaseapp.com",
  databaseURL: "https://jetcake-1180a.firebaseio.com",
  projectId: "jetcake-1180a",
  storageBucket: "jetcake-1180a.appspot.com",
  messagingSenderId: "210212379309",
  appId: "1:210212379309:web:cd7f88c6e0efdf9e95c424",
  measurementId: "G-VEZEMG3PTY"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore()
    this.storage = app.storage().ref();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  createOrUpdateUserDocument = (uid, data) => this.db.collection('users').doc(uid).set(data)

  getUserDocument = uid => this.db.collection('users').doc(uid).get()

  uploadProfilePicture = file => this.storage.child(file.name).put(file)

  getPRofilePictureUrl = filename => this.storage.child(filename).getDownloadURL()
}

export default Firebase;