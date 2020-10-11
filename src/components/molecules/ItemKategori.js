import React from "react";
import {
  Image,
  StyleSheet, TouchableOpacity, View,
} from "react-native";
import { ILBackground, ILFullBlack, ILGambar } from "../../assets";
import { colors, Typography } from "../../utils";
import { Text } from "../atoms";

const ItemKategori = ({
  active, title, onPress, source,
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image
      style={styles.Image}
      source={{ uri: source }}
    />
    <Image
      style={styles.Image}
      source={active === false ? ILFullBlack : ILBackground}
    />

    <Text variant="500" styles={styles.title}>{title}</Text>
  </TouchableOpacity>
);

export default ItemKategori;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: colors.header.primary,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
  },
  Image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    position: "absolute",
    bottom: 0,
    color: colors.text.secondary,
    fontSize: Typography.h8,
    marginBottom: 10,
  },

});
