import React, { useEffect, useState, Fragment } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

//Components
import MyAccountGuest from "../../components/MyAccount/MyAccountGuest";
import MyAccountUser from '../../components/MyAccount/MyAccountUser';

//Firebase function
import { firebaseAuthState } from "../../utils/FireBase";

export default function MyAccount(props) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    firebaseAuthState(setIsLogin);
  }, []);

  const { navigate } = props.navigation;

  const goToScreen = nameScreen => {
    navigate(nameScreen);
  };

  return (
    <Fragment>
      {isLogin ? (
        <MyAccountUser/>
      ) : (
        <MyAccountGuest goToScreen={goToScreen} />
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
