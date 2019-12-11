import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

//Overlays
import OverlayOneInput from "../../Elements/OverlayOneInput";
import OverlayTwoInput from "../../Elements/OverlayTwoInput";
import OverlayThreeInput from "../../Elements/OverlayThreeInput";

//Firebase Functions
import { firebaseUserStatus } from "../../../utils/FireBase";

export default function UpdateUserInfo({
  userInfo,
  updateUser,
  updateUserEmail,
  updateUserPassword
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
      onPress: () =>
        openOverlayThreeInputs(
          "Contraseña actual",
          "Nueva contraseña",
          "Repite nueva contraseña",
          updatePassword
        )
    }
  ]);

  const toast = useRef("");

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
    if (email != newEmail && password) {
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
        isPassword={true}
        updateFunction={updateFunction}
      />
    );
  };

  const updatePassword = async (
    currentPassword,
    newPassword,
    repeatNewPassword
  ) => {
    if (currentPassword && newPassword && repeatNewPassword) {
      if (newPassword === repeatNewPassword) {
        if (currentPassword === newPassword) {
          toast.current.show(
            "La nueva contraseña no puede ser igual a la actual",
            400
          );
        } else {
          updateUserPassword(currentPassword, newPassword);
        }
      } else {
        toast.current.show("Las contraseñas no coinciden", 400);
      }
    } else {
      toast.current.show("Todos los campos son requeridos", 400);
    }
    setOverlayComponent(null);
  };

  const openOverlayThreeInputs = (
    placeholder,
    placeholderTwo,
    placeholderThree,
    updateFunction
  ) => {
    setOverlayComponent(
      <OverlayThreeInput
        isVisibleOverlay={true}
        placeholder={placeholder}
        placeholderTwo={placeholderTwo}
        placeholderThree={placeholderThree}
        inputValueOne=""
        inputValueTwo=""
        inputValueThree=""
        isPassword={true}
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

      <Toast
        ref={toast}
        position="center"
        positionValue={260}
        fadeInDuration={850}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: "white" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
