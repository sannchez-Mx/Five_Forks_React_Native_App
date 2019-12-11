import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import "../../../utils/SolucionTimer";
import Toast, { DURATION } from "react-native-easy-toast";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

//Components
import UpdateUserInfo from "./UpdateUserInfo";

//Firebase Funtions
import {
  firebaseUserStatus,
  firebaseLogOut,
  firebaseUpdateUser,
  firebaseReauthenticate,
  firebaseUpdateUserEmail,
  firebaseUploadAvatar,
  firebaseDownloadAvatar,
  firebaseUpdateUserPassword
} from "../../../utils/FireBase";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({});

  const toast = useRef("");

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

  const updateUserPhoto = async photoUri => {
    const update = {
      photoURL: photoUri
    };
    await firebaseUpdateUser(update);
    setUserInfo({ userInfo });
  };

  const updateUserEmail = async (newEmail, password) => {
    firebaseReauthenticate(password)
      .then(() => {
        firebaseUpdateUserEmail(newEmail, toast);
      })
      .catch(() => toast.current.show("Contraseña Incorrecta", 400));
  };

  const changeAvatarUser = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (resultPermissions.status === "denied") {
      toast.current.show("Es necesario aceptar todos los permisos", 400);
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        toast.current.show("Cambio de Avatar cancelado", 400);
      } else {
        toast.current.show("Imagen seleccionada", 400, () => {
          const { uid } = userInfo;
          uploadImage(result.uri, uid);
        });
      }
    }
  };

  const uploadImage = async (uri, uid) => {
    const res = await fetch(uri);
    const blob = await res.blob();
    firebaseUploadAvatar(blob, uid).then(() => {
      toast.current.show("Avatar actualizado correctamente");
      firebaseDownloadAvatar(uid, toast, updateUserPhoto);
    });
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    firebaseReauthenticate(currentPassword)
      .then(() => {
        firebaseUpdateUserPassword(newPassword, toast);
      })
      .catch(() => toast.current.show("Contraseña Incorrecta", 400));
  };

  const returnUserInfo = userInfo => {
    if (userInfo.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          updateUser={updateUser}
          userInfo={userInfo}
          updateUserEmail={updateUserEmail}
          updateUserPassword={updateUserPassword}
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
          showEditButton
          onEditPress={() => changeAvatarUser()}
          containerStyle={styles.userAvatar}
        />
        <View>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      {returnUserInfo(userInfo)}
      <Button
        title="Cerrar Sesión"
        onPress={() => firebaseLogOut()}
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
      />
      <Toast
        ref={toast}
        position="bottom"
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
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: "green"
  }
});
