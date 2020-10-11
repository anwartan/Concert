import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Gap } from "../../components/atoms";
import { Card, Header } from "../../components/molecules";

const index = ({ navigation }) => (
  <View>
    <Header
      title="My History"
      type="with-backButton"
      onBackPress={() => navigation.goBack()}
    />
    <ScrollView>

      <View style={styles.container}>
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={20} />
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={20} />
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={20} />
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={20} />
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={20} />
        <Card date="10/10/2020" nama="Konser Online" harga="Rp.20.000" type="secondary" />
        <Gap height={20} />
      </View>
    </ScrollView>
  </View>
);

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
