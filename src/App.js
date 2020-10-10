/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from "@react-navigation/native";

import React from 'react';
import {
  StatusBar, StyleSheet,


  Text, View
} from 'react-native';
import { Login } from "./pages";
import Router from "./router";



const App= () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
     
      <NavigationContainer>
       <Router></Router>
      </NavigationContainer>
    </>
  );
};



export default App;
