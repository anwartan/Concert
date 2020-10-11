import React from "react";
import {
  Image, StyleSheet, TouchableOpacity, View,
} from "react-native";
import { ILBackground } from "../../assets";
import { colors, Typography } from "../../utils";
import { Gap, Text } from "../atoms";

const ItemConcert = ({
  tanggal, nama, kode, harga, terjual, penonton, onPress, source,
}) => (
  <View>
    <View style={styles.header}>
      <Image source={source} style={styles.image} />
      <Image source={ILBackground} style={styles.image} />
    </View>
    <View style={styles.content}>
      <View style={styles.section}>
        <Text variant="500">{tanggal}</Text>
        <Text variant="500">{kode}</Text>

      </View>
      <View style={styles.section}>
        <Text styles={styles.point} variant="600">{nama}</Text>
        <Text styles={styles.point} variant="600">{harga}</Text>

      </View>
      <Gap height={10} />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

        <View>
          <Text variant="400">
            Terjual :
            {" "}
            {terjual}
          </Text>
          <Text variant="400">
            Penonton :
            {" "}
            {penonton}
          </Text>

        </View>
        <TouchableOpacity style={styles.edit} onPress={onPress}>
          <Text variant="500" styles={{ color: colors.text.secondary }}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>

  </View>
);

export default ItemConcert;

const styles = StyleSheet.create({
  header: {
    position: "relative",
    height: 100,
    backgroundColor: "blue",
  },
  content: {
    padding: 5,

    height: 100,
    backgroundColor: "white",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  point: {
    fontSize: Typography.h7,
  },
  edit: {
    width: 100,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.header.primary,
  },
});
