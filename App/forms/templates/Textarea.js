import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Icon, Input } from "react-native-elements";

export default TextareaTemplate = locals => {
  const { placeholder } = locals.config;

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.viewContainer}>
        <Input
          placeholder={placeholder}
          multiline={true}
          onChangeText={text => locals.onChange(text)}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    margin: 12,
    height: 100,
    width: "100%"
  },
  inputContainerStyle: {
    position: "absolute",
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  }
});
