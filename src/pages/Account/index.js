import React from "react";
import {
  Alert, Image, StyleSheet, View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/firestore";
import { Gap, Text } from "../../components/atoms";
import Item from "../../components/molecules/Item";
import { colors, Typography, useStateValue } from "../../utils";
import { ILGambar } from "../../assets";

const index = ({ navigation }) => {
  const [{ user }, dispatch] = useStateValue();
  const signOut = () => {
    auth().signOut();
    dispatch({ type: "REMOVE_USER" });
  };
  const promotor = () => {
    db().collection("promotor").doc(user?.uid).get()
      .then((data) => {
        if (data.exists) {
          if (data.data().verified === false) {
            Alert.alert("Information", "Waiting verify from administrator");
          } else if (data.data().verified === true) {
            navigation.navigate("Promotor");
          }
        } else {
          navigation.navigate("VerifyPromotor");
        }
      });
  };
  return (
    <View>
      <View style={styles.header}>
        <Image style={styles.image} source={user?.gambar !== "" ? { uri: user?.gambar } : ILGambar} />
        <Gap width={20} />
        <View>
          <Text styles={styles.nama} variant="900">{user?.nama}</Text>
          <Gap height={10} />
          <Text styles={styles.email} variant="400">{user?.email}</Text>

        </View>
      </View>
      <View style={styles.wrapper}>
        <Item
          title="Edit Account"
          onPress={() => navigation.navigate("EditAccount")}
        />
        <Item
          title="Promotor Account"
          onPress={promotor}
        />
        <Item
          title="My History"
          onPress={() => navigation.navigate("MyHistory")}
        />
        <Item
          title="Sign Out"
          onPress={signOut}
        />

      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 140,
    padding: 20,
    backgroundColor: colors.header.primary,
    alignItems: "center",
  },

  image: {
    backgroundColor: "grey",
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  nama: {
    fontSize: Typography.h5,
    color: colors.text.secondary,

  },
  email: {
    fontSize: Typography.h8,
    color: colors.text.disable,
  },
});
