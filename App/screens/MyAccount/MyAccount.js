import React, { useEffect, useState, Fragment } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

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
        <Text>Bienvenido</Text>
      ) : (
        <View style={styles.viewBody}>
          <Text>MyAccount Screen</Text>
          <Button title="Registro" onPress={() => goToScreen("Register")} />
          <Button title="Login" onPress={() => goToScreen("Login")} />
        </View>
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
