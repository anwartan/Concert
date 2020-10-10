import React from "react";
import {
  Image, StyleSheet, TouchableOpacity, View,
} from "react-native";
import { ILBackground } from "../../assets";
import { colors, Typography } from "../../utils";
import { Text } from "../atoms";

const Card = ({
  date, nama, harga, type, source, onPress,
}) => {
  if (type === "secondary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, styles.full]}
      >
        <Image source={source} style={styles.image} />
        <Image source={ILBackground} style={[styles.image]} />

        <View style={styles.wrapper}>
          <Text variant="500" styles={styles.date}>{date}</Text>
          <View style={styles.detail}>
            <Text
              variant="600"
              styles={styles.nama}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {nama}

            </Text>
            <Text
              variant="600"
              numberOfLines={1}
              ellipsizeMode="tail"
              styles={styles.harga}
            >
              {harga}

            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles.persegi]}
    >
      <Image source={source} style={styles.image} />
      <Image source={ILBackground} style={[styles.image]} />

      <View style={styles.wrapper}>
        <Text variant="500" styles={styles.date}>{date}</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          variant="600"
          styles={styles.nama}
        >
          {nama}

        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          variant="600"
          styles={styles.nama}
        >
          {harga}

        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 15,
    position: "relative",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  persegi: {
    width: 200,
  },
  full: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  wrapper: {
    margin: 15,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: Typography.h7,
    color: colors.text.secondary,
  },
  nama: {
    fontSize: Typography.h7,
    color: colors.text.secondary,
  },
  harga: {
    fontSize: Typography.h7,
    color: colors.text.secondary,
  },
});
