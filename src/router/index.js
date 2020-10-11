import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/firestore";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ICHome, ICPerson, ICTicket } from "../assets";
import {
  Account,
  Concert, EditAccount, Home, Login, Register, Ticket,
  History, Promotor, MyConcert, AddConcert, EditPromotor, Kategori, VerifyPromotor, VerifyAkun, Payment, TicketView,
} from "../pages";
import { colors, fonts } from "../utils";
import { useStateValue } from "../utils/useStateProvider";

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

const Router = () => {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        await db().collection("user").doc(currentUser.uid).get()
          .then((res) => {
            const temp = {
              ...res.data(),
            };
            dispatch({ type: "SET_USER", user: temp });
          });
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      {
        user === null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />

          </>
        ) : (
          <>
            {user.kategori === ""
            && <Stack.Screen name="Kategori" component={Kategori} />}

            <Stack.Screen name="Home" component={MainApp} />
            <Stack.Screen name="EditAccount" component={EditAccount} />
            <Stack.Screen name="MyHistory" component={History} />
            <Stack.Screen name="Concert" component={Concert} />
            <Stack.Screen name="Promotor" component={Promotor} />
            <Stack.Screen name="VerifyPromotor" component={VerifyPromotor} />

            <Stack.Screen name="MyConcert" component={MyConcert} />
            <Stack.Screen name="AddConcert" component={AddConcert} />
            <Stack.Screen name="EditPromotor" component={EditPromotor} />
            <Stack.Screen name="VerifyAkun" component={VerifyAkun} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="TicketView" component={TicketView} />
          </>
        )
      }
    </Stack.Navigator>
  );
};

export default Router;
