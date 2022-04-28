import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC-jilNehA8LuhIDAlGZEpX82VZCE8zjA",
  authDomain: "todoapp2-0.firebaseapp.com",
  projectId: "todoapp2-0",
  storageBucket: "todoapp2-0.appspot.com",
  messagingSenderId: "324303748353",
  appId: "1:324303748353:web:6f2b10bb76bc8026ce2f00"
}

class Fire {
  constructor(callback) {
    this.init(callback)
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback(null, user)
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            callback(error)
          });
      }
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('lists');

    this.unsubscribe = ref.onSnapshot(snapshot => {
      lists = []

      snapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()})
      })

      callback(lists)
    })
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;