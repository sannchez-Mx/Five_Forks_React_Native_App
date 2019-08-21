import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";

export default function MyAccountGuest({ goToScreen }) {
  return (
    <View style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/image-my-account-guest-01.jpg")}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu perfil de Five Forks</Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y
        comenta como ha sido tu experiencia.
      </Text>
      <Button
        buttonStyle={styles.btnViewProfile}
        title="ver tu perfil"
        onPress={() => goToScreen("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 40
  },
  image: {
    height: 300,
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 40
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16
  },
  btnViewProfile: {
    width: "100%",
    backgroundColor: "#00a680"
  }
});
