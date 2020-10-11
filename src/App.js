/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import {
  StatusBar, StyleSheet,

  Text, View,
} from "react-native";
import { Login } from "./pages";
import Router from "./router";
import { StateProvider } from "./utils/useStateProvider";
import { initialState } from "./redux/reducer/AuthReducer";
import { AuthReducer } from "./redux/reducer";

const App = () => (
  <>
    <StateProvider initialState={initialState} reducer={AuthReducer}>

      <StatusBar barStyle="dark-content" />

      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </StateProvider>
  </>
);

export default App;
