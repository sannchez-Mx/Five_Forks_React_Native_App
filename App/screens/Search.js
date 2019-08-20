import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Search() {
  return (
    <View style={styles.viewBody}>
      <Text>Search Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
