import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../atoms";

const PaymentDetail = ({ label, value }) => (
  <View style={styles.container}>
    <Text variant="600">
      {label}
      {" "}
      :
    </Text>
    <Text variant="600">{value}</Text>

  </View>
);

export default PaymentDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 30,
  },
});
