import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Gap, Text } from "../../components/atoms";
import { Header } from "../../components/molecules";
import Item from "../../components/molecules/Item";
import { colors, Typography, useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }] = useStateValue();
  return (
    <View>
      <Header
        title="Promoto Account"
        type="with-backButton"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: user?.gambar }} />
        <Gap width={20} />
        <View>
          <Text styles={styles.nama} variant="900">{user?.nama}</Text>
          <Gap height={10} />
          <Text styles={styles.email} variant="400">{user?.email}</Text>

        </View>
      </View>
      <View>
        <Item
          title="My Concert"
          onPress={() => navigation.navigate("MyConcert")}
        />
        <Item
          title="Add Concert"
          onPress={() => navigation.navigate("AddConcert")}
        />
        {/* <Item title="Edit Promotor" /> */}

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
