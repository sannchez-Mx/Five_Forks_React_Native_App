import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

//Navegación 
import UserNavigation from './App/navigations/User'

export default function App() {
  return (
    <View style={styles.container}>
      <UserNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});