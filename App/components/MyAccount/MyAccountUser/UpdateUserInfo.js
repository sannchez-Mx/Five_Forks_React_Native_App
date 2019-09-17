import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";

//Overlays
import OverlayOneInput from "../../Elements/OverlayOneInput";
import OverlayTwoInput from "../../Elements/OverlayTwoInput";

//Firebase Functions
import { firebaseUserStatus } from "../../../utils/FireBase";

export default function UpdateUserInfo({
  userInfo,
  updateUser,
  updateUserEmail
}) {
  const [menuItems, setMenuItems] = useState([
    {
      title: "Cambiar Nombre y Apellido",
      iconType: "material-community",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      onPress: () =>
        openOverlay(
          "Nombre y Apellido",
          updateUserDisplayName,
          userInfo.displayName
        )
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      onPress: () =>
        openOverlayTwoInputs(
          "Email",
          "Password",
          updateUserDisplayEmail,
          userInfo.email
        )
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      onPress: () => console.log("click")
    }
  ]);

  const [userInfoProp, setUserInfoProp] = useState(userInfo);

  const [overlayComponent, setOverlayComponent] = useState(null);

  const openOverlay = (placeholder, updateFunction, inputValue) => {
    setOverlayComponent(
      <OverlayOneInput
        isVisibleOverlay={true}
        placeholder={placeholder}
        updateFunction={updateFunction}
        inputValue={inputValue}
      />
    );
  };

  const updateUserDisplayName = async newName => {
    if (newName) {
      updateUser(newName);
    }
    setOverlayComponent(null);
  };

  const updateUserDisplayEmail = async (newEmail, password) => {
    const { email } = userInfo;
    if (email != newEmail) {
      updateUserEmail(newEmail, password);
    }
    setOverlayComponent(null);
  };

  const openOverlayTwoInputs = (
    placeholder,
    placeholderTwo,
    updateFunction,
    inputValueOne
  ) => {
    setOverlayComponent(
      <OverlayTwoInput
        isVisibleOverlay={true}
        placeholder={placeholder}
        placeholderTwo={placeholderTwo}
        inputValueOne={inputValueOne}
        inputValueTwo=""
        updateFunction={updateFunction}
      />
    );
  };

  return (
    <View>
      {menuItems.map((item, index) => (
        <ListItem
          key={index}
          title={item.title}
          leftIcon={{
            type: item.iconType,
            name: item.iconNameLeft,
            color: item.iconColorLeft
          }}
          rightIcon={{
            type: item.iconType,
            name: item.iconNameRight,
            color: item.iconColorRight
          }}
          onPress={item.onPress}
          containerStyle={styles.containerStyle}
        />
      ))}
      {overlayComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
