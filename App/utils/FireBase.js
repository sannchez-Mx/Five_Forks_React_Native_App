import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

//Facebook Log In
import { FacebookApi } from "./Social";
import * as Facebook from "expo-facebook";

//Google Log In
import { GoogleApi } from "./Social";
import * as Google from "expo-google-app-auth";

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
    user ? setIsLogin(true) : setIsLogin(false);
  });
};

//Firebase LogOut
export const firebaseLogOut = () => {
  firebase.auth().signOut();
};

//Firebase Facebook LogIn
export const firebaseFacebookLogIn = async (navigation, toast) => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    FacebookApi.application_id,
    { permissions: FacebookApi.permissions }
  );

  if (type === "success") {
    const credentials = firebase.auth.FacebookAuthProvider.credential(token);
    firebase
      .auth()
      .signInWithCredential(credentials)
      .then(res => {
        toast.current.show(`Bienvenido ${res.user.displayName}`, 200, () => {
          navigation.goBack();
        });
      })
      .catch(err => {
        err.code === "auth/account-exists-with-different-credential"
          ? toast.current.show("La cuenta ya existe", 200)
          : err.code;
      });
  } else if (type === "cancel") {
    toast.current.show("Inicio de Sesión Cancelado", 400);
  } else {
    toast.current.show("Error Desconocido, Intentelo más Tarde", 400);
  }
};

//Firebase Google Log In
export const firebaseGoogleLogIn = async (navigation, toast) => {
  const { type, idToken } = await Google.logInAsync(GoogleApi);

  if (type === "success") {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(res => {
        toast.current.show(`Bienvenido ${res.user.displayName}`, 200, () => {
          navigation.goBack();
        });
      })
      .catch(err => {
        console.log("Google err", err.code);
        console.log("Google err", err.message);
      });
  } else if (type === "cancel") {
    toast.current.show("Inicio de Sesión Cancelado", 400);
  } else {
    toast.current.show("Error Desconocido, Intentelo más Tarde", 400);
  }
};

//Firebase User Status
export const firebaseUserStatus = async setUserInfo => {
  const user = firebase.auth().currentUser;
  await user.providerData.forEach(value => setUserInfo(value));
};

//Firebase Update User
export const firebaseUpdateUser = async info => {
  await firebase.auth().currentUser.updateProfile(info);
};

// FIREBASE INITIALIZE AND REFS
let firestore = firebase.firestore();
export let firestoreCollection = firestore.collection("users");
