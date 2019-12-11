import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Card, Image, Rating } from "react-native-elements";

import { firebaseTopFive } from "../utils/FireBase";

export default function TopFive(props) {
  useEffect(() => {
    firebaseTopFive(setRestaurants);
    //setInterval(() => firebaseTopFive(), 60000)
  }, [setRestaurants]);

  const [restaurants, setRestaurants] = useState(null);

  const { navigate } = props.navigation;

  const renderRestaurants = restaurants => {
    
    if (restaurants) {
      return (
        <View>
          {restaurants.map((res, index) => {
            let restaurant = {
              item: {
                restaurant: res
              }
            };

            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigate("Restaurant", { restaurant })}
              >
                <Card>
                  <Image
                    style={styles.restaurantImage}
                    resizeMethod="cover"
                    source={{
                      uri: res.image
                    }}
                  />
                  <View style={styles.titleRating}>
                    <Text style={styles.title}>{res.name}</Text>
                    <Rating
                      imageSize={20}
                      startingValue={res.rating}
                      readonly
                      style={styles.rating}
                    />
                  </View>
                  <Text style={styles.description}>{res.description}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurantes...</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.viewBody}>
      {renderRestaurants(restaurants)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  restaurantImage: {
    width: "100%",
    height: 200
  },
  titleRating: {
    flexDirection: "row",
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  description: {
    color: "gray",
    marginTop: 10,
    textAlign: "justify"
  }
});
