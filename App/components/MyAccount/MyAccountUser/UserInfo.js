import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-elements";

//Firebase Funtions
import { firebaseUserStatus, firebaseLogOut } from "../../../utils/FireBase";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    firebaseUserStatus(setUserInfo);
  }, []);

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        source={{
          uri: userInfo.photoURL
            ? userInfo.photoURL
            : "https://api.adorable.io/avatars/285/abott@.png"
        }}
        containerStyle={styles.userAvatar}
      />
      <Text>{userInfo.email}</Text>
      <Button title="Cerrar Sesión" onPress={() => firebaseLogOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30
  },
  userAvatar: {
    marginRight: 20
  }
});