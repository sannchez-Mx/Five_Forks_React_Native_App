import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

//Components
import UserInfo from "./UserInfo";

//Firebase function
import { firebaseLogOut } from "../../../utils/FireBase";

export default function MyAccountUser() {
    return (
      <View style={styles.viewBody}>
          <UserInfo/>
      </View>
    );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  }
});