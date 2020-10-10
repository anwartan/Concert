import React from "react";
import { StyleSheet, View } from "react-native";
import { ICBackButton } from "../../assets/icon";
import { colors, Typography } from "../../utils";
import { Button, Text } from "../atoms";

const index = ({
  type, title, iconRight, onIconRightPress, onBackPress,
}) => {
  if (type === "with-backButton") {
    return (
      <View style={styles.container}>
        <Button
          type="icon-only"
          icon={<ICBackButton fill="#fff" />}
          onPress={onBackPress}
        />
        <View style={[styles.wrapper, styles.withBack]}>

          <Text styles={styles.headerTitle} variant="900">{title}</Text>
        </View>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>

        <Text styles={styles.headerTitle} variant="900">{title}</Text>
      </View>

    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: colors.header.primary,
  },
  wrapper: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",

  },
  headerTitle: {
    fontSize: Typography.h6,
    color: colors.text.secondary,
    alignSelf: "center",

  },
  withBack: {
    marginLeft: -30,

  },

});
