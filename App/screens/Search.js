import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";

import { firebaseSearchRestaurant } from "../utils/FireBase";

export default function Search(props) {
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState(null);

  const { navigate } = props.navigation;

  const renderSearchList = restaurants => {
    if (restaurants) {
      return (
        <View>
          {restaurants.map((doc, index) => {
            let restaurant = {
              item: {
                restaurant: doc
              }
            };

            return (
              <ListItem
                key={index}
                title={doc.name}
                leftAvatar={{ source: { uri: doc.image } }}
                rightIcon={
                  <Icon type="material-community" name="chevron-right" />
                }
                onPress={() => navigate("Restaurant", { restaurant })}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <View style={styles.notfoundText}>
          <Text>Comienza tu búsqueda!</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.viewBody}>
      <SearchBar
        placeholder="Buscar restaurante"
        onChangeText={text => {
          setSearch(text);
          firebaseSearchRestaurant(text, setRestaurants);
        }}
        value={search}
        containerStyle={styles.searchBar}
        lightTheme={true}
      />
      {renderSearchList(restaurants)}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  searchBar: {
    marginBottom: 20
  },
  notfoundText: {
    textAlign: "center",
    alignItems: "center"
  }
});
