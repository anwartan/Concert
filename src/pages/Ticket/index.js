import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Gap } from "../../components/atoms";
import { Card, Header } from "../../components/molecules";

const index = () => (
  <View style={{ flex: 1 }}>
    <Header title="My Ticket" />
    <ScrollView>

      <View style={styles.wrapper}>
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={10} />
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={10} />
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={10} />

      </View>
    </ScrollView>
  </View>
);

export default index;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
});
