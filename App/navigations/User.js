import React from "react";
import { Icon } from "react-native-elements";

//Navegación
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

//Screens
import TopFiveScreen from "../screens/TopFive";
import SearchScreen from "../screens/Search";

//Screens My Account
import MyAccountScreen from "../screens/MyAccount/MyAccount";
import RegisterScreen from "../screens/MyAccount/Register";
import LoginScreen from "../screens/MyAccount/Login";

//Screens Restaurants
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurant from "../screens/Restaurants/AddRestaurant";
import RestaurantView from "../screens/Restaurants/RestaurantView";
import AddReviewRestaurant from "../screens/Restaurants/AddReviewRestaurant";

//Stacks de navegación
const restaurantsScreenStack = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home"
    })
  },
  AddRestaurant: {
    screen: AddRestaurant,
    navigationOptions: ({ navigation }) => ({
      title: "Nuevo Restaurante"
    })
  },
  Restaurant: {
    screen: RestaurantView,
    navigationOptions: ({ navigation }) => {
      const { name } = navigation.state.params.restaurant.item.restaurant;
      return {
        title: name
      };
    }
  },
  AddReview: {
    screen: AddReviewRestaurant,
    navigationOptions: ({ navigation }) => {
      const { name } = navigation.state.params;
      return {
        title: name
      };
    }
  }
});

const topFiveScreenStack = createStackNavigator({
  TopFive: {
    screen: TopFiveScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Top-Ten"
    })
  }
});

const searchScreenStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Buscar"
    })
  }
});

const myAccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mi cuenta"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Registro"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Log In"
    })
  }
});

//Root stack
const RootStack = createBottomTabNavigator(
  {
    Restaurants: {
      screen: restaurantsScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="compass-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    TopFive: {
      screen: topFiveScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Top 10",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="star-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: searchScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Buscador",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="magnify"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    MyAccount: {
      screen: myAccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Mi cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="home-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },
  //Configuraciones adicionales
  {
    initialRouteName: "Restaurants", // <-- Ruta principal
    order: ["Restaurants", "TopFive", "Search", "MyAccount"], // <-- Orden para la navegación
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

//Contenedor de Navegación
export default createAppContainer(RootStack);
