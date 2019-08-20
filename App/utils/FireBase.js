import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwH3FPvDDxswbkNAlKqOfegAZKtIST4vU",
  authDomain: "five-forks-app.firebaseapp.com",
  databaseURL: "https://five-forks-app.firebaseio.com",
  projectId: "five-forks-app",
  storageBucket: "five-forks-app.appspot.com",
  messagingSenderId: "931969882394",
  appId: "1:931969882394:web:8b4a6af8b523cc40"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Firebase registro
export const firebaseCreateUser = (email, password, toast, navigate) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res =>
      toast.current.show("Registro Correcto", 200, () => {
        navigate("MyAccount");
      })
    )
    .catch(err => toast.current.show("El email ya está en uso", 1500));
};

//Firebase Log In
export const firebaseLogIn = (email, password, toast, navigation) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res =>
      toast.current.show(`Inicio de sesión correcto`, 200, () => {
        navigation.goBack();
      })
    )
    .catch(err => {
      err.code === "auth/wrong-password"
        ? toast.current.show("Contraseña Incorrecta", 1500)
        : err.code === "auth/user-not-found"
        ? toast.current.show("Email Incorrecto", 1500)
        : err;
    });
};

//Firebase estado de login
export const firebaseAuthState = setIsLogin => {
         firebase.auth().onAuthStateChanged(user => {
           user ? setIsLogin(true) : setIsLogin(false)
         });
       };

// FIREBASE INITIALIZE AND REFS
let firestore = firebase.firestore();
export let firestoreCollection = firestore.collection("users");
