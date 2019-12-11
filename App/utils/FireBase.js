import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import { FireSQL } from "firesql";

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
const firebaseApp = firebase.initializeApp(firebaseConfig);

// FIREBASE INITIALIZE AND REFS
export const firestore = firebase.firestore(firebaseApp);

// Initialize FireSQL
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

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
export const firebaseUserStatus = setUserInfo => {
  const user = firebase.auth().currentUser;
  user.providerData.forEach(value => setUserInfo(value));
};

//Firebase Update User
export const firebaseUpdateUser = async update => {
  await firebase.auth().currentUser.updateProfile(update);
};

//Firebase Reauthenticate User
export const firebaseReauthenticate = currentPassword => {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return user.reauthenticateWithCredential(credential);
};

//Firebase Update Email
export const firebaseUpdateUserEmail = (currentEmail, toast) => {
  const user = firebase.auth().currentUser;
  user
    .updateEmail(currentEmail)
    .then(() => {
      toast.current.show("Email actualizado", 400, () => {
        firebase.auth().signOut();
      });
    })
    .catch(err => toast.current.show(err, 600));
};

//Firebase Update Password
export const firebaseUpdateUserPassword = (newPassword, toast) => {
  const user = firebase.auth().currentUser;
  user
    .updatePassword(newPassword)
    .then(() => {
      toast.current.show("Contraseña actualizada", 400, () => {
        firebase.auth().signOut();
      });
    })
    .catch(err => toast.current.show(err, 600));
};

//Firebase Upload Avatar
export const firebaseUploadAvatar = (blob, uid) => {
  let ref = firebase
    .storage()
    .ref()
    .child(`avatar/${uid}`);
  return ref.put(blob);
};

//Firebase Download Avatar
export const firebaseDownloadAvatar = (uid, toast, updateUserPhoto) => {
  firebase
    .storage()
    .ref(`avatar/${uid}`)
    .getDownloadURL()
    .then(res => updateUserPhoto(res))
    .catch(() =>
      toast.current.show("Error en el servidor, Intentelo más tarde")
    );
};

//Firebase Load Restaurants
export const firebaseLoadRestaurants = async (
  limitRestaurant,
  setStartRestaurants,
  setRestaurants
) => {
  const resultRestaurant = [],
    restaurants = firestore
      .collection("restaurants")
      .orderBy("createAt", "desc")
      .limit(limitRestaurant);

  await restaurants.get().then(res => {
    setStartRestaurants(res.docs[res.docs.length - 1]);
    res.forEach(doc => {
      let restaurant = doc.data();
      restaurant.id = doc.id;
      resultRestaurant.push({ restaurant });
    });
    setRestaurants(resultRestaurant);
  });
};

//Firebase Reload Restaurants
export const firebaseReloadRestaurants = async (
  startRestaurants,
  limitRestaurants,
  setStartRestaurants,
  setLoading,
  setRestaurants,
  restaurants
) => {
  const resultRestaurant = restaurants,
    restaurant = firestore
      .collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants);

  await restaurant.get().then(res => {
    if (res.docs.length > 0) {
      setStartRestaurants(res.docs[res.docs.length - 1]);
    } else {
      setLoading(false);
    }
    res.forEach(doc => {
      let restaurant = doc.data();
      restaurant.id = doc.id;
      resultRestaurant.push({ restaurant });
    });
    setRestaurants(resultRestaurant);
  });
};

//Firebase User Status 2
export const firebaseReviewUserStatus = (
  id,
  validate,
  ratingValue,
  setLoading,
  toast,
  goBack,
  limitReview,
  setReviews,
  setStartReviews,
  setRating
) => {
  const userInfo = firebase.auth().currentUser.providerData,
    [photoURL] = userInfo.map(doc => doc["photoURL"]),
    user = firebase.auth().currentUser,
    data = {
      id_user: user.uid,
      id_restaurant: id,
      image_user: photoURL,
      title: validate.title,
      review: validate.review,
      rating: ratingValue,
      createAt: new Date()
    };

  firestore
    .collection("reviews")
    .add(data)
    .then(res => {
      const restaurantRef = firestore.collection("restaurants").doc(id);
      restaurantRef.get().then(res => {
        const restaurantData = res.data();

        const rating_Total = restaurantData.rating_Total
          ? restaurantData.rating_Total + ratingValue
          : ratingValue;
        const quantity_Voting = restaurantData.quantity_Voting
          ? restaurantData.quantity_Voting + 1
          : 1;
        const rating = rating_Total / quantity_Voting;

        restaurantRef
          .update({
            rating,
            rating_Total,
            quantity_Voting
          })
          .then(() => {
            setLoading(false);
            toast.current.show("Comentario enviado con exito", 1500, () => {
              firebaseLoadReviews(
                id,
                limitReview,
                setStartReviews,
                setReviews,
                setRating
              );
              goBack();
            });
          });
      });
    })
    .catch(err => {
      setLoading(false);
      toast.current.show(
        "Error al enviar el comentario, intentelo más tarde.",
        1500
      );
    });
};

//Firebase Check User Review
export const checkUserReview = id => {
  const user = firebase.auth().currentUser,
    id_user = user.uid,
    id_restaurant = id,
    query = firestore
      .collection("reviews")
      .where("id_user", "==", id_user)
      .where("id_restaurant", "==", id_restaurant);

  return query.get().then(res => (res.size > 0 ? true : false));
};

//Firebase Load Reviews
export const firebaseLoadReviews = async (
  id,
  limitReview,
  setStartReviews,
  setReviews,
  setRating
) => {
  const resultReviews = [],
    arrayRating = [],
    reviews = firestore
      .collection("reviews")
      .where("id_restaurant", "==", id)
      .limit(limitReview);

  return await reviews.get().then(res => {
    setStartReviews(res.docs[res.docs.length - 1]);
    res.forEach(doc => {
      let review = doc.data();
      resultReviews.push({ review });
      arrayRating.push(doc.data().rating);
    });
    let sum = 0;
    arrayRating.map(value => {
      sum = sum + value;
    });
    const countRating = arrayRating.length,
      resultRating = sum / countRating,
      resultRatingF = resultRating ? resultRating : 0;

    setReviews(resultReviews);
    setRating(resultRatingF);
  });
};

//Firebase Load Top Five Restaurants
export const firebaseTopFive = async setRestaurants => {
  const restaurants = firestore
    .collection("restaurants")
    .orderBy("rating", "desc")
    .limit(10);

  let restaurantArray = [];

  await restaurants.get().then(res => {
    res.forEach(doc => {
      let restaurant = doc.data();
      restaurant.id = doc.id;
      restaurantArray.push(restaurant);
    });
  });

  setRestaurants(restaurantArray);
};

//Firebase Search Restaurant
export const firebaseSearchRestaurant = async (search, setRestaurants) => {
  if (search) {
    const restaurants = fireSQL.query(`
    SELECT * 
    FROM restaurants 
    WHERE name LIKE '${search}%'`);

    await restaurants.then(res => {
      setRestaurants(res);
    });
  } else {
    setRestaurants(null);
  }
};
