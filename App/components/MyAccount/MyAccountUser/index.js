import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

//Components
import UserInfo from "./UserInfo";

//Firebase function
import { firebaseLogOut } from "../../../utils/FireBase";

export default function MyAccountUser() {
  return (
    <View>
      <UserInfo />
    </View>
  );
}

const styles = StyleSheet.create({});
