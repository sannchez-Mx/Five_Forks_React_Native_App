import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native-elements";

import ActionButton from "react-native-action-button";

//Firbase Functions
import {
  firebaseAuthState,
  firebaseLoadRestaurants,
  firebaseReloadRestaurants
} from "../../utils/FireBase";

export default function RestaurantScreen(props) {
  useEffect(() => {
    firebaseAuthState(setIsLogin);
    firebaseLoadRestaurants(
      limitRestaurants,
      setStartRestaurants,
      setRestaurants
    );
  }, [setIsLogin, limitRestaurants, setStartRestaurants, setRestaurants]);

  const [login, setIsLogin] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [limitRestaurants, setLimitRestaurants] = useState(8);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [loading, setLoading] = useState(true);

  const { navigate } = props.navigation;

  const loadActionButton = () => {
    if (login) {
      return (
        <ActionButton
          buttonColor="#00a680"
          onPress={() =>
            navigate("AddRestaurant", {
              parameters: {
                limitRestaurants,
                setStartRestaurants,
                setRestaurants
              }
            })
          }
        />
      );
    }
    return null;
  };

  const renderRow = restaurant => {
    const {
      name,
      city,
      description,
      image,
      address
    } = restaurant.item.restaurant;

    return (
      <TouchableOpacity onPress={() => clickRestaurant(restaurant)}>
        <View style={styles.viewRestaurant}>
          <View style={styles.viewRestaurantImage}>
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={styles.imageRestaurant}
            />
          </View>
          <View>
            <Text style={styles.flatListRestaurantName}>{name}</Text>
            <Text style={styles.flatListRestaurantAddress}>
              {city}, {address}
            </Text>
            <Text style={styles.flatListRestaurantDescription}>
              {description.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLoadMore = async () => {
    await firebaseReloadRestaurants(
      startRestaurants,
      limitRestaurants,
      setStartRestaurants,
      setLoading,
      setRestaurants,
      restaurants
    );
  };

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" style={styles.loader} />
        </View>
      );
    } else {
      return (
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>No hay más restaurantes</Text>
        </View>
      );
    }
  };

  const renderFlatList = restaurants => {
    if (restaurants) {
      return (
        <FlatList
          data={restaurants}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      );
    } else {
      return (
        <View style={styles.starLoadRestaurant}>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurantes...</Text>
        </View>
      );
    }
  };

  const clickRestaurant = restaurant => {
    navigate("Restaurant", { restaurant });
  };

  return (
    <View style={styles.viewBody}>
      {renderFlatList(restaurants)}
      {loadActionButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  starLoadRestaurant: {
    marginTop: 20,
    alignItems: "center"
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10
  },
  imageRestaurant: {
    width: 80,
    height: 80
  },
  viewRestaurantImage: {
    marginRight: 15
  },
  flatListRestaurantName: {
    fontWeight: "bold"
  },
  flatListRestaurantAddress: {
    paddingTop: 2,
    color: "gray",
    width: "98%"
  },
  flatListRestaurantDescription: {
    paddingTop: 2,
    color: "gray",
    width: 300
  },
  loaderRestaurants: {
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15
  },
  loader: {
    marginRight: 75
  },
  notFound: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center"
  },
  notFoundText: {
    marginRight: 75
  }
});
