import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from ".";

const Link = ({ text, size, onPress }) => (
  <TouchableOpacity onPress={onPress}>

    <Text styles={[styles.text, { fontSize: size }]} variant="500">
      {text}

    </Text>
  </TouchableOpacity>
);

export default Link;

const styles = StyleSheet.create({
  text: {
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
