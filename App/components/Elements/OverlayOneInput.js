import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay, Input, Button, Icon } from "react-native-elements";

export default function OverlayOneInput({
  isVisibleOverlay,
  placeholder,
  inputValue,
  updateFunction
}) {
  const [visible, setVisible] = useState(isVisibleOverlay);

  const [inputData, setInputData] = useState(inputValue);

  const update = () => {
    updateFunction(inputData);
    setVisible(false);
  };

  const close = () => {
    setVisible(false);
    updateFunction(null)
  };
    
  return (
    <Overlay
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
        />
        <Button
          buttonStyle={styles.buttonStyle}
          title="Actualizar"
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
