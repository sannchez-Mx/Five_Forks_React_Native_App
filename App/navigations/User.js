import React from "react";
import { Icon } from "react-native-elements";

//Navegación
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

//Screens
import HomeScreen from "../screens/Home";
import TopFiveScreen from "../screens/TopFive";
import SearchScreen from "../screens/Search";
import MyAccountScreen from "../screens/MyAccount/MyAccount";
import RegisterScreen from "../screens/MyAccount/Register";
import LoginScreen from '../screens/MyAccount/Login';

//Stacks de navegación
const homeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home"
    })
  }
});

const topFiveScreenStack = createStackNavigator({
  TopFive: {
    screen: TopFiveScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Top 5"
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
    Home: {
      screen: homeScreenStack,
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
        tabBarLabel: "Top 5",
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
    initialRouteName: "MyAccount", // <-- Ruta principal
    order: ["Home", "TopFive", "Search", "MyAccount"], // <-- Orden para la navegación
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

//Contenedor de Navegación
export default createAppContainer(RootStack);
