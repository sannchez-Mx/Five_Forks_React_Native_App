import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Image, Button, Divider, SocialIcon } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Formulario
import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";
import {
  firebaseLogIn,
  firebaseFacebookLogIn,
  firebaseGoogleLogIn
} from "../../utils/FireBase";

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
  const { navigate } = props.navigation;

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
        <Text style={styles.textRegister}>
          ¿Aún no tienes una cuenta? {" "}
          <Text style={styles.btnRegister} onPress={() => navigate("Register")}>
            Regístrate
          </Text>
        </Text>
        <Text style={styles.errorStyle}>{error}</Text>
        <Divider style={styles.divider} />
        <SocialIcon
          title="Iniciar Sesión con Facebook"
          button
          type="facebook"
          onPress={() => firebaseFacebookLogIn(navigation, toast)}
        />
        <SocialIcon
          title="Iniciar Sesión con Google"
          button
          type="google-plus"
          style={styles.googleButton}
          onPress={() => firebaseGoogleLogIn(navigation, toast)}
        />
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
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40
  },
  containerLogo: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150
  },
  viewForm: {
    marginTop: 30
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
    marginBottom: 20,
    fontSize: 20
  },
  divider: {
    backgroundColor: "#00a680",
    marginBottom: 20
  },
  googleButton: {
    backgroundColor: "#df4a32"
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    textAlign: "center"
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  }
});
