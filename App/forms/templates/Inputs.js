import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { Icon, Input } from "react-native-elements";

export default (InputTemplate = locals => {
  const {
    label,
    placeholder,
    error,
    password,
    secureTextEntry,
    type,
    name,
  } = locals.config;
  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.viewContainer}>
        <Input
          placeholder={placeholder}
          label={label}
          password={password}
          secureTextEntry={secureTextEntry}
          error={error}
          onChangeText={text => locals.onChange(text)}
          rightIcon={<Icon type={type} name={name} size={26} color="black" />}
        />
      </View>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 12,
    marginBottom: 12
  }
});
