import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

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
    <View style={styles.viewBody}>
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
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: "center",
    marginRight: 40,
    marginLeft: 40
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
  }
});
