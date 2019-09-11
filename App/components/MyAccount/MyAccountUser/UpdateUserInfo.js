import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";

//Overlay
import OverlayOneInput from "../../Elements/OverlayOneInput";

//Firebase Functions
import { firebaseUserStatus } from "../../../utils/FireBase";

export default function UpdateUserInfo({ userInfo, updateUser }) {
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
      onPress: () => console.log("click")
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
