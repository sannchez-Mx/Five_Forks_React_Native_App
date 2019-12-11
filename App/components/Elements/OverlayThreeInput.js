import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay, Input, Button, Icon } from "react-native-elements";

export default function OverlayThreeInput({
  isVisibleOverlay,
  placeholder,
  placeholderTwo,
  placeholderThree,
  inputValueOne,
  inputValueTwo,
  inputValueThree,
  isPassword,
  updateFunction
}) {
  const [visible, setVisible] = useState(isVisibleOverlay);

  const [inputData, setInputData] = useState(inputValueOne);
  const [inputDataTwo, setInputDataTwo] = useState(inputValueTwo);
  const [inputDataThree, setInputDataThree] = useState(inputValueTwo);

  const update = () => {
    updateFunction(inputData, inputDataTwo, inputDataThree);
    setVisible(false);
  };

  const close = () => {
    setVisible(false);
    updateFunction(null);
  };

  return (
    <Overlay
      fullScreen={true}
      isVisible={isVisibleOverlay}
      overlayBackgroundColor="trasparent"
      overlayStyle={styles.overlayStyle}
    >
      <View style={styles.viewOverlay}>
        <Input
          onChangeText={text => setInputData(text)}
          containerStyle={styles.inputContainer}
          placeholder={placeholder}
          value={inputData}
          password={isPassword}
          secureTextEntry={isPassword}
        />
        <Input
          onChangeText={text => setInputDataTwo(text)}
          containerStyle={styles.inputContainer}
          placeholder={placeholderTwo}
          value={inputDataTwo}
          password={isPassword}
          secureTextEntry={isPassword}
        />
        <Input
          onChangeText={text => setInputDataThree(text)}
          containerStyle={styles.inputContainer}
          placeholder={placeholderThree}
          value={inputDataThree}
          password={isPassword}
          secureTextEntry={isPassword}
        />
        <Button
          buttonStyle={styles.buttonStyle}
          title="Cambiar Contraseña"
          onPress={() => update()}
        />
        <Icon
          containerStyle={styles.containerIconClose}
          type="material-community"
          name="close"
          size={25}
          onPress={() => close()}
        />
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewOverlay: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderColor: "#00a680",
    borderWidth: 2
  },
  inputContainer: {
    marginBottom: 20
  },
  buttonStyle: {
    backgroundColor: "#00a680"
  },
  containerIconClose: {
    position: "absolute",
    right: 4,
    top: 4
  }
});
