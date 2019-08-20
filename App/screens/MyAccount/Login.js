import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Image, Button } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Formulario
import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";
import { firebaseLogIn } from "../../utils/FireBase";

//Firebase Function

export default function LoginScreen(props) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const loginForm = useRef("");
  const toast = useRef("");

  const { navigation } = props;

  const login = () => {
    const validate = loginForm.current.getValue();

    if (validate) {
      setError("");
      firebaseLogIn(validate.email, validate.password, toast, navigation);
    } else {
      setError("Formulario Iválido");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-logo.png")}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
          containerStyle={styles.containerLogo}
        />
        <View style={styles.viewForm}>
          <Form
            ref={loginForm}
            type={LoginStruct}
            options={LoginOptions}
            value={loginInfo}
            onChange={text => setLoginInfo(text)}
          />
          <Button
            title="Log In"
            onPress={login}
            buttonStyle={styles.buttonLogin}
          />
        </View>
        <Text style={styles.errorStyle}>{error}</Text>
        <Toast
          ref={toast}
          position="bottom"
          positionValue={350}
          fadeInDuration={850}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "white" }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40
  },
  containerLogo: {
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 180
  },
  viewForm: {
    marginTop: 55
  },
  buttonLogin: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  errorStyle: {
    color: "red",
    textAlign: "center",
    marginTop: 30,
    fontSize: 20
  }
});
