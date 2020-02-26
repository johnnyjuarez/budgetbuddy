import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-database';

const firebaseConfig = {
    apiKey: "AIzaSyCjELBZITBuOkFMhfZ1zQ7SLKcblUOATGI",
    authDomain: "budgetbuddy-24c2e.firebaseapp.com",
    databaseURL: "https://budgetbuddy-24c2e.firebaseio.com",
    projectId: "budgetbuddy-24c2e",
    storageBucket: "budgetbuddy-24c2e.appspot.com",
    messagingSenderId: "291447648698",
    appId: "1:291447648698:web:9ed53365031b655f86ed83",
    measurementId: "G-E71M602QCJ"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut();
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        this.db.collection(this.auth.currentUser.uid).doc('transactions').set({
            total: 'EMPTY',
            transactonHistory: {
                date: new Date()
            }
        })
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    getCurrentUserId() {
        return this.auth.currentUser.uid
    }
    writeInitData(userId, total) {
        this.db.ref('users/' + userId).set({
            total: total
        })
    }
    // attempt to create individual objects based on uid
    // logic for writing to db

    // USER API
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    // TOTAL API
    total = uid => this.db.ref(`totals${uid}`)
    totals = () => this.db.ref('totals')
}

export default new Firebase()