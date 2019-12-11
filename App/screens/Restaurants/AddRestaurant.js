import React, { useState, useRef } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import { Icon, Image, Button, Text, Overlay } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast, { DURATION } from "react-native-easy-toast";

// Firebase functions
import { UploadImage } from "../../utils/UploadImage";
import { firestore, firebaseLoadRestaurants } from "../../utils/FireBase";

import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddRestaurantStruct,
  AddRestaurantOptions
} from "../../forms/AddRestaurant";

export default function AddRestaurant(props) {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    description: "",
    rating: 0,
    rating_Total: 0,
    quantity_Voting: 0
  });

  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState(false);

  const addRestaurantForm = useRef("");
  const toast = useRef("");

  const {
    limitRestaurants,
    setRestaurants,
    setStartRestaurants
  } = props.navigation.state.params.parameters;
  const { navigation } = props;

  const isImageRestaurant = image => {
    if (image) {
      return (
        <Image source={{ uri: uri }} style={{ width: 500, height: 200 }} />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: 200, height: 200 }}
        />
      );
    }
  };

  const uploadImage = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (resultPermission.status === "denied") {
      toast.current.show(
        "Es necesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });

      if (result.cancelled) {
        toast.current.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        setUri(result.uri);
      }
    }
  };

  const addRestaurant = () => {
    const { name, city, address, description } = formData;

    if (uri && name && city && address && description) {
      setLoading(true);

      firestore
        .collection("restaurants")
        .add({ ...formData, image: "", createAt: new Date() })
        .then(res => {
          const restaurantId = res.id;

          UploadImage(uri, restaurantId, "restaurants")
            .then(res => {
              const restaurantRef = firestore
                .collection("restaurants")
                .doc(restaurantId);

              restaurantRef
                .update({ image: res })
                .then(() => {
                  setLoading(false);
                  toast.current.show(
                    "Restaurante creado correctamente",
                    200,
                    () => {
                      firebaseLoadRestaurants(
                        limitRestaurants,
                        setStartRestaurants,
                        setRestaurants
                      );
                      navigation.goBack();
                    }
                  );
                })
                .catch(() => {
                  setLoading(false);
                  toast.current.show(
                    "Error en el servidor intentelo mas tarde"
                  );
                });
            })
            .catch(() => {
              setLoading(false);
              toast.current.show("Error en el servidor intentelo mas tarde");
            });
        })
        .catch(() => {
          setLoading(false);
          toast.current.show("Error en el servidor intentelo mas tarde");
        });
    } else {
      toast.current.show("Todos los campos son necesarios");
    }
  };

  return (
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewPhoto}>{isImageRestaurant(uri)}</View>
      <View>
        <Form
          ref={addRestaurantForm}
          type={AddRestaurantStruct}
          options={AddRestaurantOptions}
          value={formData}
          onChange={text => setFormData(text)}
        />
      </View>
      <View>
        <Icon
          name="camera"
          type="material-community"
          color="#7A7A7A"
          iconStyle={styles.addPhotoIcon}
          onPress={() => uploadImage()}
        />
      </View>
      <View style={styles.viewBtnAddRestaurant}>
        <Button
          title="Crear Restaurante"
          onPress={() => addRestaurant()}
          buttonStyle={styles.btnAddRestaurant}
        />
      </View>

      <Overlay
        overlayStyle={styles.overlayLoading}
        isVisible={loading}
        width="auto"
        height="auto"
      >
        <View>
          <Text style={styles.loadingText}>Creando Restaurante</Text>
          <ActivityIndicator size="large" color="#00a680" />
        </View>
      </Overlay>

      <Toast
        ref={toast}
        position="bottom"
        positionValue={320}
        fadeInDuration={1000}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: "#fff" }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 17,
    paddingBottom: 14,
    margin: 0
  },
  viewBtnAddRestaurant: {
    flex: 1,
    justifyContent: "flex-end"
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20
  },
  overlayLoading: {
    padding: 20
  },
  loadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
});
