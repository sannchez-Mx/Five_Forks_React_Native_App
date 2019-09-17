import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-elements";

//Components
import UpdateUserInfo from "./UpdateUserInfo";

//Firebase Funtions
import * as firebase from "firebase";
import {
  firebaseUserStatus,
  firebaseLogOut,
  firebaseUpdateUser
} from "../../../utils/FireBase";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    firebaseUserStatus(setUserInfo);
  });

  const updateUser = async newName => {
    const update = {
      displayName: newName
    };
    await firebaseUpdateUser(update);
    setUserInfo({ userInfo });
  };

  const updateUserEmail = async (newEmail, password) => {
    console.log(newEmail);
    console.log(password);
  };

  const returnUserInfo = userInfo => {
    if (userInfo.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          updateUser={updateUser}
          userInfo={userInfo}
          updateUserEmail={updateUserEmail}
        />
      );
    }
  };

  const { displayName, email, photoURL } = userInfo;

  return (
    <View>
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="large"
          source={{
            uri: photoURL
              ? photoURL
              : "https://api.adorable.io/avatars/285/abott@.png"
          }}
          containerStyle={styles.userAvatar}
        />
        <View>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <Button title="Cerrar Sesión" onPress={() => firebaseLogOut()} />
      {returnUserInfo(userInfo)}
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#f2f2f2"
  },
  userAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});
