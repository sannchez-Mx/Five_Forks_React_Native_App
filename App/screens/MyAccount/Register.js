import React, { useRef, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Button, Text, Image } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Formulario
import t from "tcomb-form-native";
const Form = t.form.Form;
import { RegisterStruct, RegisterOptions } from "../../forms/Register";

//Firebase functions
import { firebaseCreateUser } from "../../utils/FireBase";

export default function RegisterScreen(props) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  });

  const [error, setError] = useState("");

  const registerForm = useRef("");
  const toast = useRef("");

  const { navigate } = props.navigation;

  const registerV = () => {
    if (userInfo.password === userInfo.passwordConfirmation) {
      const validate = registerForm.current.getValue();

      if (validate) {
        setError("");
        firebaseCreateUser(
          userInfo.email,
          userInfo.password,
          toast,
          navigate
        );
      } else {
        setError("Formulario Iválido");
      }
    } else {
      setError("Las contraseñas no son iguales");
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
        <Form
          ref={registerForm}
          type={RegisterStruct}
          options={RegisterOptions}
          value={userInfo}
          onChange={text => setUserInfo(text)}
        />
        <Button
          title="Unirse"
          onPress={registerV}
          buttonStyle={styles.buttonRegister}
        />
        <Text style={styles.errorStyle}>{error}</Text>
        <Toast
          ref={toast}
          position="bottom"
          positionValue={250}
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
    justifyContent: "center",
    marginRight: 40,
    marginLeft: 40,
    marginTop: 15
  },
  buttonRegister: {
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
  },
  logo: {
    width: 150,
    height: 150
  },
  containerLogo: {
    alignItems: "center",
    marginBottom: 25
  }
});
