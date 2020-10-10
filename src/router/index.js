import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ICHome, ICPerson, ICTicket } from "../assets";
import {
  Account,
  Concert, Home, Login, Register, Ticket,
} from "../pages";
import { colors, fonts } from "../utils";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainApp = () => (
  <Tab.Navigator
    tabBarOptions={{
      tabStyle: { backgroundColor: "white" },
      labelStyle: {
        fontFamily: fonts.primary.Normal[900],
      },
      inactiveTintColor: colors.text.disable,
      activeTintColor: colors.header.primary,
    }}
    backBehavior="none"
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => (
          <ICHome fill={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Ticket"
      component={Ticket}
      options={{
        tabBarIcon: ({ color }) => (
          <ICTicket width={24} height={24} fill={color} />
        ),

      }}
    />
    <Tab.Screen
      name="Me"
      component={Account}
      options={{
        tabBarIcon: ({ color }) => (
          <ICPerson fill={color} />
        ),
      }}
    />

  </Tab.Navigator>
);

const Router = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Home">
    <Stack.Screen name="Home" component={MainApp} />
    <Stack.Screen name="Login" component={Login} />

  </Stack.Navigator>
);

export default Router;
