import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

//Components
import UserInfo from "./UserInfo";

//Firebase function
import { firebaseLogOut } from "../../../utils/FireBase";

export default function MyAccountUser() {
  return (
    <View style={styles.viewUserAccount}>
      <UserInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserAccount: {
    height: "100%",
    backgroundColor: "#f2f2f2"
  }
});
