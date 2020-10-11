import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ICRight } from "../../assets";
import { colors } from "../../utils";
import { Text } from "../atoms";

const Item = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text>{title}</Text>
    <ICRight fill="#000" />
  </TouchableOpacity>
);

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomColor: colors.text.disable,
    borderBottomWidth: 1,
  },
});
